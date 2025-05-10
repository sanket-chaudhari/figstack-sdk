import { getFile } from '../../core/figma-api/figma-api.js';
import { getPagesInFile, getTopLevelFramesInPage } from '../../core/traversal/traversal.js';
import fs from 'fs-extra';
import path from 'path';
import 'dotenv/config';

const FILE_KEY = process.env.TEST_FILE_KEY;
const TEAM_ID = process.env.TEST_TEAM_ID || '[unknown]';

(async () => {
  if (!FILE_KEY) {
    console.error('❌ TEST_FILE_KEY missing in .env');
    process.exit(1);
  }

  const file = await getFile(FILE_KEY);
  const componentsById = file.components || {};
  const pages = getPagesInFile(file);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const safeFileName = file.name.replace(/[^a-zA-Z0-9_-]/g, '-');
  const filename = `report--${safeFileName}--${timestamp}.txt`;
  const outputPath = path.join('plugins', 'demo-mint-component-audit', 'reports', filename);

  const componentDefs = new Map();
  const variantIdToParentName = new Map();

  const canvases = file.document.children.filter(n => n.type === 'CANVAS');
  for (const canvas of canvases) {
    for (const node of canvas.children || []) {
      if (node.type === 'COMPONENT_SET') {
        const parentName = node.name;
        for (const variant of node.children || []) {
          variantIdToParentName.set(variant.id, parentName);
        }
        componentDefs.set(node.id, node);
      } else if (node.type === 'COMPONENT') {
        componentDefs.set(node.id, node);
      }
    }
  }

  const usageMap = new Map();
  const allFrameNames = new Set();
  const allComponentNames = new Set();

  for (const page of pages) {
    const frames = getTopLevelFramesInPage(page);
    for (const frame of frames) {
      const walk = (node) => {
        if (node.type === 'INSTANCE') {
          const componentId = node.componentId;
          const componentName = variantIdToParentName.get(componentId) || componentsById[componentId]?.name || '[Unknown]';
          const variantName = componentsById[componentId]?.name || '[Unknown Variant]';
          const frameLabel = `${page.name} / ${frame.name}`;

          allFrameNames.add(frameLabel);
          allComponentNames.add(componentName);

          const key = `${componentName}::${variantName}`;
          if (!usageMap.has(key)) usageMap.set(key, []);

          const rawOverrides = node.overrides || [];
          const overrideBlock = rawOverrides.length
            ? rawOverrides.map(o => `      • override id: ${o.id}\n        ${JSON.stringify(o, null, 2)}`).join('\n')
            : '      • (no overrides)';

          usageMap.get(key).push({
            frame: frameLabel,
            overrides: overrideBlock
          });
        }
        (node.children || []).forEach(walk);
      };
      walk(frame);
    }
  }

  let report = '';
  report += '📘 Figma System Usage Report\n';
  report += '============================\n\n';

  report += '📌 File Metadata:\n';
  report += '----------------\n';
  report += `• File Name: ${file.name}\n`;
  report += `• File Key: (hidden)\n`;
  report += `• Team ID: (hidden)\n`;
  report += `• Generated: ${new Date().toLocaleString()}\n\n`;

  report += '------------------------------------------------------------\n';
  report += '🔍 Component Usage by Set & Variant\n';
  report += '------------------------------------------------------------\n\n';

  for (const [key, entries] of usageMap.entries()) {
    const [set, variant] = key.split('::');
    report += `Component: ${set}\n  ↳ Variant: ${variant}\n`;
    for (const usage of entries) {
      report += `  ↳ Used in: ${usage.frame}\n${usage.overrides}\n`;
    }
    report += '\n';
  }

  report += '------------------------------------------------------------\n';
  report += '📊 Insights\n';
  report += '------------------------------------------------------------\n\n';

  report += `• Total components used: ${allComponentNames.size}\n`;
  report += `• Total frames analyzed: ${allFrameNames.size}\n`;
  report += `• Total variant usages: ${usageMap.size}\n`;

  const usedPairs = new Set();
  for (const [, entries] of usageMap.entries()) {
    for (const entry of entries) {
      usedPairs.add(`${entry.frame}::${entry.component}`);
    }
  }

  report += '\n✅ Component Adoption Table\n';
  report += '-----------------------------\n';
  const sortedFrames = Array.from(allFrameNames).sort();
  const sortedComps = Array.from(allComponentNames).sort();

  const headerRow = [''.padEnd(20)].concat(sortedFrames.map(f => f.padEnd(25))).join('');
  report += headerRow + '\n';
  for (const comp of sortedComps) {
    let row = comp.padEnd(20);
    for (const frame of sortedFrames) {
      const found = [...usageMap.entries()].some(([key, entries]) => {
        return key.startsWith(comp + '::') && entries.some(e => e.frame === frame);
      });
      row += (found ? '🧩'.padEnd(25) : '❌'.padEnd(25));
    }
    report += row + '\n';
  }

  await fs.ensureDir(path.dirname(outputPath));
  await fs.writeFile(outputPath, report);
  console.log(`\n✅ Snapshot Report written to: ${outputPath}\n`);
})();
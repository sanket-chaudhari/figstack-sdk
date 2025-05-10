import { getFile } from '../../core/figma-api/figma-api.js';
import { getPagesInFile, getTopLevelFramesInPage } from '../../core/traversal/traversal.js';
import fs from 'fs-extra';
import path from 'path';
import 'dotenv/config';

const FILE_KEY = process.env.TEST_FILE_KEY;
const OUTPUT_PATH = path.join('plugins', 'demo-mint-component-audit', 'reports', 'report.txt');

(async () => {
  if (!FILE_KEY) {
    console.error('❌ TEST_FILE_KEY missing in .env');
    process.exit(1);
  }

  const file = await getFile(FILE_KEY);
  const componentsById = file.components || {};
  const pages = getPagesInFile(file);

  const componentDefs = new Map();
  const variantUsage = new Map();
  const instanceUsage: string[] = [];

  // 1. Scan component definitions from file.document
  const componentPages = file.document.children.filter(n => n.type === 'CANVAS');
  for (const page of componentPages) {
    for (const node of page.children || []) {
      if (node.type === 'COMPONENT_SET' || node.type === 'COMPONENT') {
        componentDefs.set(node.id, node);
      }
    }
  }

  // 2. Traverse all frames for instances
  for (const page of pages) {
    const frames = getTopLevelFramesInPage(page);
    for (const frame of frames) {
      const walk = (node, pathLabel) => {
        if (node.type === 'INSTANCE') {
          const componentId = node.componentId;
          const resolvedName = componentsById[componentId]?.name || '[Unknown]';
          const variants = node.componentProperties || {};
          const variantString = Object.entries(variants)
            .map(([key, val]) => `${key}=${val.value}`)
            .join(', ');

          instanceUsage.push(`📄 ${page.name} / 🖼 ${frame.name} → ${resolvedName} [${variantString}]`);

          for (const [k, v] of Object.entries(variants)) {
            const key = `${resolvedName}::${k}=${v.value}`;
            variantUsage.set(key, (variantUsage.get(key) || 0) + 1);
          }
        }
        (node.children || []).forEach(child => walk(child, pathLabel));
      };
      walk(frame, `${page.name} / ${frame.name}`);
    }
  }

  // 3. Format report
  let report = '';
  report += '📘 Figma System Usage Report\n';
  report += '============================\n\n';

  report += '📦 Components Defined in File:\n';
  report += '------------------------------\n';
  if (componentDefs.size === 0) report += '(none found)\n';
  else {
    for (const [id, node] of componentDefs) {
      report += `- ${node.name} (type: ${node.type})\n`;
    }
  }

  report += '\n🔍 Instance Usage:\n';
  report += '------------------\n';
  if (instanceUsage.length === 0) report += '(no component instances found)\n';
  else report += instanceUsage.join('\n') + '\n';

  report += '\n🧬 Variant Usage Summary:\n';
  report += '--------------------------\n';
  if (variantUsage.size === 0) report += '(no variant data found)\n';
  else {
    for (const [key, count] of variantUsage) {
      report += `- ${key} → ${count} use(s)\n`;
    }
  }

  // 4. Write to file
  await fs.ensureDir(path.dirname(OUTPUT_PATH));
  await fs.writeFile(OUTPUT_PATH, report);
  console.log(`\n✅ Report written to: ${OUTPUT_PATH}\n`);
})();
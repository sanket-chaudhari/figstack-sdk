import { classifyResolvedName } from './helpers.js';

export function logAllComponentInstancesInFrame(frameNode, componentsById) {
  function walk(node) {
    if (node.type === 'INSTANCE') {
      const componentId = node.componentId;
      const resolved = componentsById?.[componentId]?.name || '[Unknown]';
      const classification = classifyResolvedName(resolved);

      console.log(`    • Instance ID: ${node.id}`);
      console.log(`      ↳ Component ID: ${componentId}`);
      console.log(`      ↳ Resolved Name: ${resolved}`);
      console.log(`      ↳ Classification: ${classification}\n`);
    }

    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(walk);
    }
  }

  walk(frameNode);
}
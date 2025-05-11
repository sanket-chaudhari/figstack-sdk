export function logFileDefinedComponents(componentsById) {
  const entries = Object.entries(componentsById);
  if (entries.length === 0) {
    console.log('  (none found)');
    return;
  }

  for (const [id, def] of entries) {
    console.log(`  - ${def.name} (id: ${id})`);
  }
}

export function logInstanceUsageAcrossFrames(frameNode, componentsById) {
  function walk(node) {
    if (node.type === 'INSTANCE') {
      const resolved = componentsById?.[node.componentId]?.name || '[Unknown]';
      console.log(`    • Uses: ${resolved} (componentId: ${node.componentId})`);
    }
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(walk);
    }
  }

  walk(frameNode);
}
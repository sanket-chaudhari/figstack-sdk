import { isMintInstance } from './helpers.js';

export function scanMintInstancesInFrame(frameNode) {
  const results = [];

  function walk(node) {
    if (isMintInstance(node)) {
      results.push({
        id: node.id,
        name: node.name,
        componentName: node.componentName || '[Unnamed]'
      });
    }

    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(walk);
    }
  }

  walk(frameNode);
  return results;
}
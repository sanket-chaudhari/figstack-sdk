import { classifyInstance } from './helpers.js';

export function analyzeFrameComponentUsage(frameNode) {
  const counts = {
    mintCount: 0,
    localCount: 0,
    otherCount: 0,
  };

  function walk(node) {
    if (node.type === 'INSTANCE') {
      const category = classifyInstance(node);
      if (category === 'mint') counts.mintCount++;
      else if (category === 'local') counts.localCount++;
      else counts.otherCount++;
    }

    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(walk);
    }
  }

  walk(frameNode);
  return counts;
}
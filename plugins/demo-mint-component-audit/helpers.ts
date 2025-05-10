export function classifyInstance(node) {
  const name = node.componentName?.toLowerCase() || '';
  if (name.includes('mint')) return 'mint';
  if (name.includes('_local')) return 'local';
  return 'other';
}
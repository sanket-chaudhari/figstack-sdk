export function isMintInstance(node) {
  return (
    node.type === 'INSTANCE' &&
    typeof node.componentName === 'string' &&
    node.componentName.toLowerCase().includes('mint')
  );
}
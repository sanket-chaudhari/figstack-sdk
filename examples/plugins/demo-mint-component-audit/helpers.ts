export function classifyResolvedName(name) {
  const lower = name.toLowerCase();
  if (lower.includes('mint')) return 'mint';
  if (lower.includes('_local')) return 'local';
  return 'other';
}
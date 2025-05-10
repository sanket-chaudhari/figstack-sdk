const ALLOWED_PREFIXES = ['/file/', '/design/', '/proto/', '/embed/', '/present/', '/draft/'];

export function parseFigmaUrl(url: string) {
  const result = {
    fileKey: null,
    nodeId: undefined,
    pageId: undefined,
    branchId: undefined,
    isValid: false,
    error: undefined
  };

  try {
    const urlObj = new URL(url);
    const [,, prefix, fileKey] = urlObj.pathname.split('/');

    const reconstructed = '/' + prefix + '/';

    if (!ALLOWED_PREFIXES.includes(reconstructed)) {
      result.error = `Unsupported Figma link pattern: ${reconstructed}\n\nWe currently support the following patterns:\n  ${ALLOWED_PREFIXES.join(', ')}\n\nIf you believe this pattern should be supported, feel free to explore our contribution guidelines —\nor reach out to the system maintainer to discuss support for this use case.`;
      return result;
    }

    if (!fileKey) {
      result.error = 'Missing fileKey from path';
      return result;
    }

    result.fileKey = fileKey;
    result.nodeId = urlObj.searchParams.get('node-id') || undefined;
    result.pageId = urlObj.searchParams.get('page-id') || undefined;
    result.branchId = urlObj.searchParams.get('branch-id') || undefined;
    result.isValid = true;
    return result;

  } catch (err) {
    result.error = 'Malformed or unsupported URL structure';
    return result;
  }
}
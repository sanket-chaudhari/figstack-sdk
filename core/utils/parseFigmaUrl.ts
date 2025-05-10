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
    const figmaBase = 'https://www.figma.com/file/';
    if (!url.startsWith(figmaBase)) {
      result.error = 'Not a valid Figma file URL';
      return result;
    }

    const urlObj = new URL(url);
    const [, , , fileKey] = urlObj.pathname.split('/');
    if (!fileKey) {
      result.error = 'Missing file key';
      return result;
    }

    result.fileKey = fileKey;
    result.nodeId = urlObj.searchParams.get('node-id') || undefined;
    result.pageId = urlObj.searchParams.get('page-id') || undefined;
    result.branchId = urlObj.searchParams.get('branch-id') || undefined;
    result.isValid = true;
    return result;
  } catch (err) {
    result.error = 'Malformed URL';
    return result;
  }
}
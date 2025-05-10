import { getFile } from '../figma-api/figma-api.js';

export async function resolveScope({ fileKey, pageName, nodeId }) {
  try {
    const file = await getFile(fileKey, nodeId);

    const result = {
      fileKey,
      fileName: file.name,
      valid: true,
      diagnostics: {
        pageFound: false,
        nodeResolved: false,
        nodeName: null,
        nodeType: null
      }
    };

    if (pageName) {
      const matchingPages = file.document?.children?.filter(p => p.name === pageName);
      if (matchingPages?.length) {
        result.diagnostics.pageFound = true;
      } else {
        result.valid = false;
        result.error = `Page "${pageName}" not found in file "${file.name}". Available pages: ` +
          file.document?.children?.map(p => `"${p.name}"`).join(', ');
        return result;
      }
    }

    if (nodeId) {
      const nodeEntry = file.nodes?.[nodeId]?.document;
      if (nodeEntry) {
        result.diagnostics.nodeResolved = true;
        result.diagnostics.nodeName = nodeEntry.name;
        result.diagnostics.nodeType = nodeEntry.type;
      } else {
        result.valid = false;
        result.error = `Node ID "${nodeId}" not found in file.`;
        return result;
      }
    }

    return result;
  } catch (err) {
    return {
      fileKey,
      fileName: null,
      valid: false,
      error: err.message || 'Unknown error during scope resolution'
    };
  }
}
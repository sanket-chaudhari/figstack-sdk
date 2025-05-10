import { getFile } from '../../core/figma-api/figma-api.js';

export async function getSnapshot(scope) {
  if (!scope || typeof scope !== 'object') {
    throw new Error('[snapshot-service] Missing scope. You must provide a scope object when requesting a snapshot.');
  }

  const { fileKey, pageName, teamId, projectId, frameIds, nodeId } = scope;

  if (!fileKey && !teamId && !projectId) {
    throw new Error('[snapshot-service] Invalid scope: You must provide at least a fileKey, teamId, or projectId.');
  }

  if (!fileKey) {
    throw new Error('[snapshot-service] Snapshot fetching for non-file scopes (like team/project) is not yet implemented.');
  }

  const file = await getFile(fileKey, nodeId);

  if (pageName) {
    const matchingPages = file.document.children.filter(p => p.name === pageName);
    if (matchingPages.length === 0) {
      const available = file.document.children.map(p => `"${p.name}"`).join(', ');
      throw new Error(`[snapshot-service] Page "${pageName}" not found in file: ${file.name}. Available: ${available}`);
    }
    file.document.children = matchingPages;
  }

  if (frameIds?.length) {
    for (const page of file.document.children) {
      page.children = (page.children || []).filter(c => frameIds.includes(c.id));
    }
  }

  file.__meta = {
    snapshotGeneratedAt: new Date().toISOString(),
    scope,
    figmaApiVersion: 'unknown'
  };

  return file;
}
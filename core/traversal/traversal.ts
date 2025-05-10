import { getTeamProjects, getProjectFiles, getFile } from '../figma-api/figma-api.js';

export async function getAllFilesInTeam(teamId) {
  const projectsResponse = await getTeamProjects(teamId);
  const projects = projectsResponse.projects ?? [];
  const allFiles = [];

  for (const project of projects) {
    const filesResponse = await getProjectFiles(project.id);
    const files = filesResponse.files ?? [];
    for (const file of files) {
      allFiles.push({ name: file.name, key: file.key, projectId: project.id });
    }
  }

  return allFiles;
}

/**
 * Extract all top-level pages from a given Figma file response
 */
export function getPagesInFile(file) {
  return file.document?.children ?? [];
}

/**
 * Given a page node, return all top-level FRAME nodes inside it
 */
export function getTopLevelFramesInPage(pageNode) {
  return (pageNode.children ?? []).filter(node => node.type === 'FRAME');
}
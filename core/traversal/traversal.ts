import { getTeamProjects, getProjectFiles } from '../figma-api/figma-api.js';

/**
 * Fetch all files across all projects within a given Figma team.
 */
export async function getAllFilesInTeam(teamId) {
  const projectsResponse = await getTeamProjects(teamId);
  const projects = projectsResponse.projects ?? [];

  const allFiles = [];

  for (const project of projects) {
    const filesResponse = await getProjectFiles(project.id);
    const files = filesResponse.files ?? [];

    for (const file of files) {
      allFiles.push({
        name: file.name,
        key: file.key,
        projectId: project.id
      });
    }
  }

  return allFiles;
}
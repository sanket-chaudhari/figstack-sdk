import { getAuthHeaders } from '../auth/auth.js';

const BASE_URL = 'https://api.figma.com/v1';

export async function getTeamProjects(teamId) {
  const res = await fetch(`${BASE_URL}/teams/${teamId}/projects`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error(`Failed to fetch team projects: ${res.status}`);
  return res.json();
}

export async function getProjectFiles(projectId) {
  const res = await fetch(`${BASE_URL}/projects/${projectId}/files`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error(`Failed to fetch project files: ${res.status}`);
  return res.json();
}

export async function getFile(fileKey) {
  const res = await fetch(`${BASE_URL}/files/${fileKey}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error(`Failed to fetch file data: ${res.status}`);
  return res.json();
}
import 'dotenv/config';

export async function getFile(fileKey: string, nodeId?: string) {
  const FIGMA_TOKEN = process.env.FIGMA_PERSONAL_ACCESS_TOKEN;
  if (!FIGMA_TOKEN) throw new Error('[figma-api] Missing FIGMA_PERSONAL_ACCESS_TOKEN');

  const url = nodeId
    ? `https://api.figma.com/v1/files/${fileKey}?ids=${encodeURIComponent(nodeId)}`
    : `https://api.figma.com/v1/files/${fileKey}`;

  const res = await fetch(url, {
    headers: {
      'X-Figma-Token': FIGMA_TOKEN,
    },
  });

  if (!res.ok) {
    throw new Error(`[figma-api] Failed to fetch file data: ${res.status}`);
  }

  return await res.json();
}
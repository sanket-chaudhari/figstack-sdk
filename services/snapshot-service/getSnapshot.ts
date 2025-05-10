import { getFile } from '../../core/figma-api/figma-api.js';

/**
 * Returns the full raw Figma file JSON response for a given fileKey
 */
export async function getSnapshot({ fileKey }) {
  if (!fileKey || typeof fileKey !== 'string') {
    throw new Error('fileKey is required to getSnapshot');
  }

  const file = await getFile(fileKey);
  return file;
}
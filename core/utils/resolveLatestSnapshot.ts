import fs from 'fs-extra';
import path from 'path';

/**
 * Resolves the most recent snapshot file in a given folder.
 * Expects snapshot files to follow this format:
 *    snapshot--<context>--<timestamp>.json
 */
export async function resolveLatestSnapshot(folderPath: string): Promise<string> {
  const files = await fs.readdir(folderPath);
  const snapshotFiles = files.filter(f => f.startsWith('snapshot--') && f.endsWith('.json'));

  if (snapshotFiles.length === 0) {
    throw new Error(`No snapshot files found in: ${folderPath}`);
  }

  const sorted = snapshotFiles.sort((a, b) => {
    const aTime = extractTimestamp(a);
    const bTime = extractTimestamp(b);
    return bTime.localeCompare(aTime); // descending
  });

  return path.join(folderPath, sorted[0]);
}

function extractTimestamp(filename: string): string {
  const match = filename.match(/--(\d{4}-\d{2}-\d{2}[^.]+)\.json$/);
  if (!match) return '';
  return match[1];
}
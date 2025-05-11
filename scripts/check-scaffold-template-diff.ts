import fs from 'fs-extra';
import crypto from 'crypto';
import path from 'path';

const scaffoldPath = path.resolve('scaffold-templates/plugin@1.0.0');
const hashFile = path.resolve('scaffold-templates/plugin@1.0.0/.template-hash.json');

// Recursively hash all files in a directory
function computeDirectoryHash(dirPath: string): string {
  const files = fs.readdirSync(dirPath).sort();
  const hash = crypto.createHash('sha256');

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      hash.update(computeDirectoryHash(fullPath));
    } else {
      const content = fs.readFileSync(fullPath);
      hash.update(file + ':' + content);
    }
  }

  return hash.digest('hex');
}

// Main logic
function main() {
  if (!fs.existsSync(scaffoldPath)) {
    console.error('[Error] Scaffold template not found.');
    process.exit(1);
  }

  const currentHash = computeDirectoryHash(scaffoldPath);

  if (fs.existsSync(hashFile)) {
    const previous = fs.readJsonSync(hashFile);
    if (previous.hash !== currentHash) {
      console.warn('[⚠️ Scaffold Drift Detected]');
      console.warn('- Scaffold template has changed since last snapshot.');
      console.warn('- Please review changes and update scaffold-changelog.md if needed.');
      console.warn('- Then run this script with --update to refresh the stored hash.');
    } else {
      console.log('[✓] Scaffold template matches last known state.');
    }
  } else {
    console.warn('[ℹ️] No previous scaffold hash found. Run with --update to initialize.');
  }

  if (process.argv.includes('--update')) {
    fs.writeJsonSync(hashFile, { hash: currentHash });
    console.log('[✓] Scaffold hash updated.');
  }
}

main();

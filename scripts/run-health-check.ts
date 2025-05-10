import '../scripts/.env.loader.js';

import { getSnapshot } from '../services/snapshot-service/getSnapshot.js';
import { compareSnapshotShapes } from '../core/utils/compareSnapshotShapes.js';
import { resolveLatestSnapshot } from '../core/utils/resolveLatestSnapshot.js';
import fs from 'fs-extra';
import path from 'path';

const delay = (ms) => new Promise(res => setTimeout(res, ms));
const FILE_KEY = process.env.TEST_FILE_KEY;
const PAGE_NAME = process.env.TEST_PAGE_NAME || 'Master';
const NODE_ID = process.env.TEST_NODE_ID;
const snapshotDir = path.join('plugins', 'demo-mint-component-audit', 'snapshots');

(async () => {
  console.log('🩺 Running Design Infra Health Check...');

  const freshPath = await loadingStep('🔍 Fetching fresh snapshot', async () => {
    const fresh = await getSnapshot({ fileKey: FILE_KEY, pageName: PAGE_NAME, nodeId: NODE_ID });
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const safeName = fresh.name.replace(/[^a-zA-Z0-9_-]/g, '-');
    const tempPath = path.join(snapshotDir, `__temp__snapshot--${safeName}--${timestamp}.json`);
    await fs.ensureDir(snapshotDir);
    await fs.writeJson(tempPath, fresh, { spaces: 2 });
    return tempPath;
  });

  let lastPath = null;
  let usedFallback = false;

  try {
    lastPath = await resolveLatestSnapshot(snapshotDir);
  } catch {
    usedFallback = true;
  }

  if (usedFallback) {
    console.log('\n🔰 First-time snapshot. No previous schema to compare. Baseline established.');
  } else {
    console.log('\n🔎 Comparing schema with previous snapshot...');
    await compareSnapshotShapes(lastPath, freshPath);
  }

  await fs.remove(freshPath);

  console.log('\n📁 File Key:', FILE_KEY);
  console.log('📄 Page Name:', PAGE_NAME);
  console.log('🔖 Node ID:', NODE_ID || '(not scoped)');
  console.log('📅 Time:', new Date().toLocaleString());
  console.log('\n✅ Health check complete.\n');
})();

async function loadingStep(label, task) {
  process.stdout.write(label);
  for (let i = 0; i < 3; i++) {
    await delay(200);
    process.stdout.write('.');
  }
  const result = await task();
  console.log(' done!');
  return result;
}

async function findLatestTempFile(folder) {
  const files = await fs.readdir(folder);
  const temps = files.filter(f => f.startsWith('__temp__snapshot') && f.endsWith('.json'));
  if (temps.length === 0) throw new Error('No temp snapshot found');
  return path.join(folder, temps.sort().reverse()[0]);
}
import { getSnapshot } from '../services/snapshot-service/getSnapshot.js';
import { compareSnapshotShapes } from '../core/utils/compareSnapshotShapes.js';
import { resolveLatestSnapshot } from '../core/utils/resolveLatestSnapshot.js';
import fs from 'fs-extra';
import path from 'path';
import 'dotenv/config';

const delay = (ms) => new Promise(res => setTimeout(res, ms));
const FILE_KEY = process.env.TEST_FILE_KEY;
const PAGE_NAME = process.env.TEST_PAGE_NAME || 'Master';
const snapshotDir = path.join('plugins', 'demo-mint-component-audit', 'snapshots');

(async () => {
  console.log('🩺 Running Design Infra Health Check...');

  // Step 1: Fetch fresh snapshot
  await loadingStep('🔍 Fetching fresh snapshot', async () => {
    const fresh = await getSnapshot({ fileKey: FILE_KEY, pageName: PAGE_NAME });
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const safeName = fresh.name.replace(/[^a-zA-Z0-9_-]/g, '-');
    const freshPath = path.join(snapshotDir, `__temp__snapshot--${safeName}--${timestamp}.json`);
    await fs.ensureDir(snapshotDir);
    await fs.writeJson(freshPath, fresh, { spaces: 2 });
    return freshPath;
  });

  // Step 2: Compare with last snapshot
  const freshPath = await findLatestTempFile(snapshotDir);
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

  // Step 3: Clean up
  await fs.remove(freshPath);

  // Final Report
  console.log('\n📁 File:', FILE_KEY);
  console.log('📄 Page:', PAGE_NAME);
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
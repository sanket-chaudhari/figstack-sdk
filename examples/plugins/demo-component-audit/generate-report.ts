import fs from 'fs-extra';
import path from 'path';
import { resolveLatestSnapshot } from '../../core/utils/resolveLatestSnapshot.js';
import 'dotenv/config';

(async () => {
  const snapshotDir = path.join('plugins', 'demo-mint-component-audit', 'snapshots');
  const snapshotPath = await resolveLatestSnapshot(snapshotDir);
  const file = await fs.readJson(snapshotPath);

  // From here on, you can analyze `file` like before
  console.log(`✅ Using latest snapshot: ${snapshotPath}`);

  // Example minimal output
  console.log(`File contains ${file.document.children?.length || 0} top-level canvas nodes.`);
  // Replace this block with your actual report generator
})();
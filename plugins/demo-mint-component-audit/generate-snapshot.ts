import { getSnapshot } from '../../services/snapshot-service/getSnapshot.js';
import fs from 'fs-extra';
import path from 'path';
import 'dotenv/config';

const FILE_KEY = process.env.TEST_FILE_KEY;

(async () => {
  if (!FILE_KEY) {
    console.error('❌ TEST_FILE_KEY not set in .env');
    process.exit(1);
  }

  try {
    const fileData = await getSnapshot({ fileKey: FILE_KEY });

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const safeFileName = fileData.name.replace(/[^a-zA-Z0-9_-]/g, '-');
    const filename = `snapshot--${safeFileName}--${timestamp}.json`;
    const outputPath = path.join('plugins', 'demo-mint-component-audit', 'snapshots', filename);

    await fs.ensureDir(path.dirname(outputPath));
    await fs.writeJson(outputPath, fileData, { spaces: 2 });

    console.log(`✅ Snapshot saved to: ${outputPath}`);
  } catch (err) {
    console.error('❌ Failed to generate snapshot:', err);
  }
})();
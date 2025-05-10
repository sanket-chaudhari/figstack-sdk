import { getFile } from '../../core/figma-api/figma-api.js';
import { getPagesInFile, getTopLevelFramesInPage } from '../../core/traversal/traversal.js';
import { analyzeFrameComponentUsage } from './analyze.js';
import 'dotenv/config';

const FILE_KEY = process.env.TEST_FILE_KEY;

(async () => {
  if (!FILE_KEY) {
    console.error('❌ TEST_FILE_KEY missing in .env');
    process.exit(1);
  }

  try {
    const file = await getFile(FILE_KEY);
    const pages = getPagesInFile(file);
    console.log(`✅ Analyzing ${pages.length} page(s)...\n`);

    for (const page of pages) {
      const frames = getTopLevelFramesInPage(page);
      console.log(`📄 Page: ${page.name} → ${frames.length} frame(s)`);

      for (const frame of frames) {
        const report = analyzeFrameComponentUsage(frame);
        console.log(`  🖼 Frame: ${frame.name}`);

        console.log(`    ✅ Mint components: ${report.mintCount}`);
        console.log(`    🧩 Local components: ${report.localCount}`);
        console.log(`    ⛔ Other component instances: ${report.otherCount}`);
      }
    }
  } catch (err) {
    console.error('❌ Error in plugin:', err);
  }
})();
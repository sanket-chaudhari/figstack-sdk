import { getFile } from '../../core/figma-api/figma-api.js';
import { getPagesInFile, getTopLevelFramesInPage } from '../../core/traversal/traversal.js';
import { scanMintInstancesInFrame } from './analyze.js';
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
        const report = scanMintInstancesInFrame(frame);
        console.log(`  🖼 Frame: ${frame.name}`);

        if (report.length === 0) {
          console.log('    ⚠️  No Mint components found.');
        } else {
          const summary = report.reduce((acc, item) => {
            acc[item.componentName] = (acc[item.componentName] || 0) + 1;
            return acc;
          }, {});

          for (const [name, count] of Object.entries(summary)) {
            console.log(`    ✅ ${name} × ${count}`);
          }
        }
      }
    }
  } catch (err) {
    console.error('❌ Error in plugin:', err);
  }
})();
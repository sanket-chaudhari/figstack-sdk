import { getFile } from '../core/figma-api/figma-api.js';
import { getPagesInFile, getTopLevelFramesInPage } from '../core/traversal/traversal.js';
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

    console.log(`✅ File has ${pages.length} page(s):`);
    pages.forEach((page, i) => {
      const frames = getTopLevelFramesInPage(page);
      console.log(`- Page ${i + 1}: ${page.name} → ${frames.length} top-level frames`);
      frames.forEach(frame => console.log(`  • ${frame.name} (${frame.id})`));
    });
  } catch (err) {
    console.error('❌ Error traversing pages and frames:', err);
  }
})();
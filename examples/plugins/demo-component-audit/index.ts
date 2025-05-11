import { getFile } from '../../core/figma-api/figma-api.js';
import { getPagesInFile, getTopLevelFramesInPage } from '../../core/traversal/traversal.js';
import { logFileDefinedComponents, logInstanceUsageAcrossFrames } from './analyze.js';
import 'dotenv/config';

const FILE_KEY = process.env.TEST_FILE_KEY;

(async () => {
  if (!FILE_KEY) {
    console.error('❌ TEST_FILE_KEY missing in .env');
    process.exit(1);
  }

  try {
    const file = await getFile(FILE_KEY);
    const componentsById = file.components || {};
    const pages = getPagesInFile(file);

    console.log('📦 Components Defined in File:');
    logFileDefinedComponents(componentsById);

    console.log('\n🔍 Component Usage Across Pages and Frames:\n');
    for (const page of pages) {
      const frames = getTopLevelFramesInPage(page);
      console.log(`📄 Page: ${page.name} → ${frames.length} frame(s)`);
      for (const frame of frames) {
        console.log(`  🖼 Frame: ${frame.name}`);
        logInstanceUsageAcrossFrames(frame, componentsById);
      }
    }
  } catch (err) {
    console.error('❌ Error in plugin:', err);
  }
})();
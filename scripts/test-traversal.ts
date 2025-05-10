import { getAllFilesInTeam } from '../core/traversal/traversal.js';
import 'dotenv/config';

const TEAM_ID = process.env.TEST_TEAM_ID;

(async () => {
  if (!TEAM_ID) {
    console.error('❌ TEST_TEAM_ID is missing in .env');
    process.exit(1);
  }

  try {
    const files = await getAllFilesInTeam(TEAM_ID);
    console.log(`✅ Found ${files.length} files:`);
    files.forEach(file => {
      console.log(`- ${file.name} (${file.key})`);
    });
  } catch (err) {
    console.error('❌ Error during traversal:', err);
  }
})();
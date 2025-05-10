import { getTeamProjects, getProjectFiles, getFile } from '../core/figma-api/figma-api.js';
import 'dotenv/config';

const TEAM_ID = process.env.TEST_TEAM_ID;
const PROJECT_ID = process.env.TEST_PROJECT_ID;
const FILE_KEY = process.env.TEST_FILE_KEY;

(async () => {
  try {
    if (TEAM_ID) {
      const projects = await getTeamProjects(TEAM_ID);
      console.log('✅ Team Projects:', projects);
    }

    if (PROJECT_ID) {
      const files = await getProjectFiles(PROJECT_ID);
      console.log('✅ Project Files:', files);
    }

    if (FILE_KEY) {
      const file = await getFile(FILE_KEY);
      console.log('✅ File Data:', file.name, '-', file.document.children?.length, 'pages');
    }
  } catch (err) {
    console.error('❌ API Error:', err);
  }
})();
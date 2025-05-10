import { getFile } from '../core/figma-api/figma-api.js';
import 'dotenv/config';

const FILE_KEY = process.env.TEST_FILE_KEY;

(async () => {
  if (!FILE_KEY) {
    console.error('❌ TEST_FILE_KEY missing in .env');
    process.exit(1);
  }

  try {
    const file = await getFile(FILE_KEY);

    console.dir(file.document, { depth: null, maxArrayLength: null });
  } catch (err) {
    console.error('❌ Error dumping file document:', err);
  }
})();
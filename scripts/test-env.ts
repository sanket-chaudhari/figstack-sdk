import '../scripts/.env.loader.js';
import { runDiagnostic } from '../core/utils/diagnostics.js';
import path from 'path';

const fileKey = process.env.TEST_FILE_KEY;
const pageName = process.env.TEST_PAGE_NAME;
const nodeId = process.env.TEST_NODE_ID;

(async () => {
  console.log('\n🧪 Running Diagnostic Check...');

  const projectFolder = path.resolve('.');
  const result = await runDiagnostic({ fileKey, pageName, nodeId }, projectFolder);

  if (result.success) {
    console.log('✅ All checks passed.');
  } else {
    console.log('⚠️  Some checks failed. See log for details.');
  }

  console.log(`📄 Log written to: ${result.filePath}\n`);
})();
import '../scripts/.env.loader.js';
import { resolveScope } from '../core/scope/resolveScope.js';

console.log('🧪 Environment Diagnostic');
console.log('==========================');

const token = process.env.FIGMA_PERSONAL_ACCESS_TOKEN;
const fileKey = process.env.TEST_FILE_KEY;
const pageName = process.env.TEST_PAGE_NAME;
const nodeId = process.env.TEST_NODE_ID;

console.log('🔐 FIGMA_PERSONAL_ACCESS_TOKEN:', token ? '✅ Present' : '❌ Missing');

(async () => {
  if (!fileKey) {
    console.log('📁 TEST_FILE_KEY: ❌ Missing');
    return;
  }

  const scopeResult = await resolveScope({ fileKey, pageName, nodeId });

  if (!scopeResult.valid) {
    console.log(`📂 File Key: ❌ Invalid → ${scopeResult.error}`);
    return;
  }

  console.log(`📂 File: ✅ “${scopeResult.fileName}”`);

  if (pageName) {
    console.log(`📄 Page: ${scopeResult.diagnostics.pageFound ? '✅ Found' : '❌ Not found'}`);
  }

  if (nodeId) {
    if (scopeResult.diagnostics.nodeResolved) {
      console.log(`🔖 Node: ✅ “${scopeResult.diagnostics.nodeName}” [${scopeResult.diagnostics.nodeType}]`);
    } else {
      console.log(`🔖 Node: ❌ Could not resolve node ID.`);
    }
  }
})();
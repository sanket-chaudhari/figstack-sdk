import '../scripts/.env.loader.js';

console.log('🧪 Environment Diagnostic');
console.log('==========================');
console.log('FIGMA_PERSONAL_ACCESS_TOKEN:', process.env.FIGMA_PERSONAL_ACCESS_TOKEN ? '✅ Present' : '❌ MISSING');
console.log('TEST_FILE_KEY:', process.env.TEST_FILE_KEY || '❌ MISSING');
console.log('TEST_PAGE_NAME:', process.env.TEST_PAGE_NAME || '❌ MISSING');
console.log('TEST_NODE_ID:', process.env.TEST_NODE_ID || '(not set)');
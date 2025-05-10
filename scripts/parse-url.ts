import '../scripts/.env.loader.js';
import { parseFigmaUrl } from '../core/utils/parseFigmaUrl.js';
import { resolveScope } from '../core/scope/resolveScope.js';

const inputUrl = process.argv[2];
const shouldResolve = process.argv.includes('--resolve');
const asJson = process.argv.includes('--json');

if (!inputUrl) {
  console.error('❌ Please provide a Figma URL as an argument.');
  process.exit(1);
}

const parsed = parseFigmaUrl(inputUrl);

if (asJson) {
  console.log(JSON.stringify(parsed, null, 2));
  process.exit(0);
}

console.log('📦 Parsed URL:');

if (!parsed.isValid) {
  console.error(`❌ Invalid Figma URL → ${parsed.error}`);
  process.exit(1);
}

console.log(`• fileKey: ${parsed.fileKey}`);
if (parsed.nodeId) console.log(`• nodeId: ${parsed.nodeId}`);
if (parsed.pageId) console.log(`• pageId: ${parsed.pageId}`);
if (parsed.branchId) console.log(`• branchId: ${parsed.branchId}`);

if (shouldResolve) {
  console.log('\n🔍 Resolving from Figma...');

  resolveScope({ fileKey: parsed.fileKey, nodeId: parsed.nodeId })
    .then(res => {
      if (!res.valid) {
        console.log(`❌ Resolution failed: ${res.error}`);
      } else {
        console.log(`• File name: “${res.fileName}”`);
        if (res.diagnostics.nodeResolved) {
          console.log(`• Node: “${res.diagnostics.nodeName}” [${res.diagnostics.nodeType}]`);
        }
      }
    })
    .catch(err => console.error('❌ Error during resolution:', err.message));
}
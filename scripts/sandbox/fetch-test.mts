// scripts/sandbox/fetch-test.mts
import * as dotenv from 'dotenv';
dotenv.config();

const fileKey = process.env.TEST_FILE_KEY!;
const token = process.env.FIGMA_PERSONAL_ACCESS_TOKEN!;

console.log('✅ Loaded .env values');
console.log('🔐 Token:', token.slice(0, 10) + '...'); // partial for sanity
console.log('🗂️ FileKey:', fileKey);

const url = `https://api.figma.com/v1/files/${fileKey}`;

try {
  const res = await fetch(url, {
    headers: { 'X-Figma-Token': token },
  });

  if (!res.ok) throw new Error(`[fetch-test] Failed: ${res.status}`);

  const json = await res.json();
  console.log('✅ File name:', json.name);
} catch (err) {
  console.error('❌ Error during fetch:', err);
}

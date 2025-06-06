// Sandbox-only: dumps the full Figma file JSON to figma-file-dump.json
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const token = process.env.FIGMA_PERSONAL_ACCESS_TOKEN!;
const fileKey = process.env.TEST_FILE_KEY!;

if (!token || !fileKey) {
  console.error('❌  Missing FIGMA_PERSONAL_ACCESS_TOKEN or TEST_FILE_KEY in .env');
  process.exit(1);
}

async function dump() {
  const url = `https://api.figma.com/v1/files/${fileKey}`;
  console.log('📡  Fetching:', url);

  const res = await fetch(url, {
    headers: { 'X-Figma-Token': token },
  });

  if (!res.ok) {
    console.error(`❌  Figma API responded ${res.status}`);
    process.exit(1);
  }

  const json = await res.json();
  const outFile = path.resolve('figma-file-dump.json');
  fs.writeFileSync(outFile, JSON.stringify(json, null, 2), 'utf8');
  console.log('✅  Full JSON saved to', outFile);
}

dump().catch(err => console.error('❌  Unexpected error:', err));

import { FigmaAPI } from '../../core/figma-api/figma-api';
import * as dotenv from 'dotenv';

dotenv.config();

const run = async () => {
  const fileKey = process.env.TEST_FILE_KEY;
  const token = process.env.FIGMA_PERSONAL_ACCESS_TOKEN;

  console.log('[Runner] Token exists?', !!token);
  console.log('[Runner] FileKey:', fileKey);

  if (!fileKey || !token) {
    console.error('❌ Missing required env variables: TEST_FILE_KEY or FIGMA_PERSONAL_ACCESS_TOKEN.');
    process.exit(1);
  }

  const figma = new FigmaAPI({ personalAccessToken: token });

  try {
    const file = await figma.getFile(fileKey);
    console.log(`✅ Successfully fetched file: ${file.name}`);
    const pages = file.document.children;

    console.log(`[Runner] Total pages found: ${pages.length}`);

    for (const page of pages) {
      console.log(`📄 Page: ${page.name}`);
      const frames = page.children?.filter((n: any) => n.type === 'FRAME');
      for (const frame of frames ?? []) {
        console.log(`  🖼️ Frame: ${frame.name} (ID: ${frame.id})`);
      }
    }
  } catch (err) {
    console.error('❌ Error fetching file from Figma:', err);
  }
};

run();

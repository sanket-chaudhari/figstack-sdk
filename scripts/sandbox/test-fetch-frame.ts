// Simple test script to fetch a frame node from a Figma file
import { FigmaAPI } from '../../core/api/figma-api';
import * as dotenv from 'dotenv';

dotenv.config();

const run = async () => {
  const fileKey = 'YOUR_FILE_KEY'; // Replace with actual file key
  const nodeId = 'YOUR_NODE_ID';   // Replace with actual node ID (e.g., '0:1')

  const figma = new FigmaAPI({
    personalAccessToken: process.env.FIGMA_PERSONAL_ACCESS_TOKEN!,
  });

  try {
    const response = await figma.getFileNodes(fileKey, [nodeId]);
    const node = response.nodes?.[nodeId]?.document;

    if (node) {
      console.log('✅ Successfully fetched frame node:');
      console.dir(node, { depth: null });
    } else {
      console.error('❌ Frame node not found.');
    }
  } catch (err) {
    console.error('❌ Error fetching node from Figma:', err);
  }
};

run();
import dotenv from 'dotenv';
dotenv.config();

export function getAuthHeaders(): Record<string, string> {
  const token = process.env.FIGMA_PERSONAL_ACCESS_TOKEN;

  if (!token || token.trim() === '') {
    throw new Error('FIGMA_PERSONAL_ACCESS_TOKEN not found in .env');
  }

  return {
    'X-Figma-Token': token,
  };
}
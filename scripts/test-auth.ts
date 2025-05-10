import { getAuthHeaders } from '../core/auth/auth.js';

try {
  const headers = getAuthHeaders();
  console.log('✅ Auth headers generated successfully:', headers);
} catch (err) {
  console.error('❌ Error generating auth headers:', (err as Error).message);
}

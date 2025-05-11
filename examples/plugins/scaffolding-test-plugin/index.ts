import { resolveScope } from '@/core/scope/resolveScope';

async function main() {
  const scope = await resolveScope();
  if (!scope.valid) {
    console.error('[Scaffold Plugin] Invalid scope:', scope.error);
    return;
  }

  console.log(`[Scaffold Plugin] Scope resolved for file: ${scope.fileName}`);
  // TODO: Add your plugin logic here.
}

main();
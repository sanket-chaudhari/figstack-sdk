import fs from 'fs-extra';

function getShape(obj, prefix = '') {
  const shape = {};
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(shape, getShape(obj[key], fullKey));
    } else {
      shape[fullKey] = typeof obj[key];
    }
  }
  return shape;
}

export async function compareSnapshotShapes(pathA, pathB) {
  const a = await fs.readJson(pathA);
  const b = await fs.readJson(pathB);
  const shapeA = getShape(a);
  const shapeB = getShape(b);

  const keysA = Object.keys(shapeA);
  const keysB = Object.keys(shapeB);

  const added = keysB.filter(k => !keysA.includes(k));
  const removed = keysA.filter(k => !keysB.includes(k));
  const changed = keysA.filter(k => keysB.includes(k) && shapeA[k] !== shapeB[k]);

  console.log('🧠 Snapshot Shape Diff Report');
  console.log('=============================');
  if (added.length) console.log('\n➕ Keys Added:', added);
  if (removed.length) console.log('\n➖ Keys Removed:', removed);
  if (changed.length) console.log('\n🔄 Type Changes:', changed);
  if (!added.length && !removed.length && !changed.length) {
    console.log('✅ No schema drift detected.');
  }
}
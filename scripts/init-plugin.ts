import fs from 'fs-extra';
import path from 'path';

const args = process.argv.slice(2);
const pluginName = args[0];
const version = '1.0.0';

if (!pluginName) {
  console.error('[Error] Please provide a plugin name. Usage: npx tsx scripts/init-plugin.ts <plugin-name>');
  process.exit(1);
}

const sourcePath = path.resolve('scaffold-templates/plugin@1.0.0');
const targetPath = path.resolve(`examples/plugins/${pluginName}`);

if (fs.existsSync(targetPath)) {
  console.error(`[Error] Plugin folder already exists: ${targetPath}`);
  process.exit(1);
}

fs.copySync(sourcePath, targetPath);

const scaffoldJson = {
  scaffoldType: 'plugin',
  version: version,
  source: 'figma-tooling'
};
fs.writeJsonSync(path.join(targetPath, 'scaffold.json'), scaffoldJson, { spaces: 2 });

// Patch the README with the plugin name
const readmePath = path.join(targetPath, 'README.md');
if (fs.existsSync(readmePath)) {
  let readme = fs.readFileSync(readmePath, 'utf-8');
  readme = readme.replace(/<your-plugin-name>/g, pluginName);
  fs.writeFileSync(readmePath, readme);
}

console.log(`[Scaffold] Plugin scaffolded at examples/plugins/${pluginName} using plugin@${version}`);

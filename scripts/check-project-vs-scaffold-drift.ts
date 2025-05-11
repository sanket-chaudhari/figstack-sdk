import fs from 'fs-extra';
import path from 'path';
import crypto from 'crypto';

const pluginRoot = path.resolve('examples/plugins');
const scaffoldRoot = path.resolve('scaffold-templates');

function hashFile(filePath: string): string {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

function compareDirs(templatePath: string, projectPath: string) {
  const diffs: string[] = [];
  const templateFiles = fs.readdirSync(templatePath).filter(f => f !== 'scaffold.json');
  const projectFiles = fs.readdirSync(projectPath).filter(f => f !== 'scaffold.json');

  const allFiles = new Set([...templateFiles, ...projectFiles]);
  for (const file of allFiles) {
    const templateFile = path.join(templatePath, file);
    const projectFile = path.join(projectPath, file);

    const templateExists = fs.existsSync(templateFile);
    const projectExists = fs.existsSync(projectFile);

    if (!templateExists) {
      diffs.push(`+ ${file} (extra in project)`);
    } else if (!projectExists) {
      diffs.push(`- ${file} (missing from project)`);
    } else {
      const hashA = hashFile(templateFile);
      const hashB = hashFile(projectFile);
      if (hashA !== hashB) {
        diffs.push(`~ ${file} (modified)`);
      }
    }
  }
  return diffs;
}

function main() {
  const plugins = fs.readdirSync(pluginRoot);
  for (const plugin of plugins) {
    const pluginPath = path.join(pluginRoot, plugin);
    const scaffoldJsonPath = path.join(pluginPath, 'scaffold.json');
    if (!fs.existsSync(scaffoldJsonPath)) {
      console.warn(`[WARN] ${plugin}/ is missing scaffold.json`);
      continue;
    }

    const { scaffoldType, version } = fs.readJsonSync(scaffoldJsonPath);
    const templatePath = path.join(scaffoldRoot, `${scaffoldType}@${version}`);
    if (!fs.existsSync(templatePath)) {
      console.warn(`[WARN] ${plugin}/ references unknown scaffold: ${scaffoldType}@${version}`);
      continue;
    }

    const diffs = compareDirs(templatePath, pluginPath);
    if (diffs.length) {
      console.warn(`
[DRIFT] ${plugin}/ differs from ${scaffoldType}@${version}:`);
      for (const d of diffs) {
        console.warn(`  - ${d}`);
      }
    } else {
      console.log(`[✓] ${plugin}/ matches template ${scaffoldType}@${version}`);
    }
  }
}

main();

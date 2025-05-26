const fs = require('fs-extra');
const path = require('path');

const INPUT_FILE = process.argv[2]; // 👈 accepts input via CLI argument

if (!INPUT_FILE) {
  console.error('❌ No input file path provided. Usage: node mcp-agent.js path/to/input.json');
  process.exit(1);
}

async function run() {
  const raw = await fs.readFile(INPUT_FILE, 'utf-8');
  const instructions = JSON.parse(raw);

  if (!Array.isArray(instructions.files)) {
    throw new Error('🛑 Invalid MCP format: "files" must be an array');
  }

  for (const file of instructions.files) {
    if (!file.path || !file.content) {
      throw new Error(`🛑 Missing "path" or "content" in one of the files`);
    }

    const fullPath = path.join('..', file.path); // Relative to project root
    await fs.ensureDir(path.dirname(fullPath));
    await fs.writeFile(fullPath, file.content, 'utf-8');
    console.log(`✅ Written: ${file.path}`);
  }

  if (instructions.commitMessage) {
    console.log('\n🟡 Run the following git commands:');
    console.log('cd ..');
    console.log('git add .');
    console.log(`git commit -m "${instructions.commitMessage}"`);
  }

  console.log('\n🎉 Done.');
}

run().catch(console.error);

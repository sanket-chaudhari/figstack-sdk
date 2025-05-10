// mcp-agent.js
const fs = require('fs-extra');
const path = require('path');

const INPUT_FILE = 'input.json'; // You copy-paste GPT’s intent here

async function run() {
  const raw = await fs.readFile(INPUT_FILE, 'utf-8');
  const instructions = JSON.parse(raw);

  for (const file of instructions.files) {
    const fullPath = path.join('..', file.path); // parent folder = project root
    await fs.ensureDir(path.dirname(fullPath));
    await fs.writeFile(fullPath, file.content, 'utf-8');
    console.log(`✅ Written: ${file.path}`);
  }

  if (instructions.commitMessage) {
    console.log('\n💡 Run the following git commands:');
    console.log(`cd ..`);
    console.log(`git add .`);
    console.log(`git commit -m "${instructions.commitMessage}"`);
  }

  console.log('\n🎉 Done.');
}

run().catch(console.error);



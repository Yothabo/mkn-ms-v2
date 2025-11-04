import fs from 'fs';
import path from 'path';

const MAX_LINES = 150;

function walkDir(dir) {
  const results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  list.forEach(file => {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      results.push(...walkDir(fullPath));
    } else if (file.isFile() && /\.(ts|tsx|js|jsx|css|scss)$/.test(file.name)) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walkDir('src');

console.log('Files over', MAX_LINES, 'lines:\n');

files.forEach(file => {
  const lines = fs.readFileSync(file, 'utf-8').split('\n').length;
  if (lines > MAX_LINES) {
    console.log(`${file} — ${lines} lines`);
  }
});

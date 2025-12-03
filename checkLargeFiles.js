import fs from 'fs';
import path from 'path';

const MAX_LINES = 150;

// Files that are allowed to be over the line limit (data files, test data, etc.)
const DATA_FILES = [
  'verificationMembers.data.ts',
  'mockMembers.data.ts',
  'testData.ts',
  'sampleData.ts',
  'fixtures.ts'
];

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

console.log('File Line Count Analysis (Threshold: ' + MAX_LINES + ' lines):\n');

let hasLargeCodeFiles = false;
const largeDataFiles = [];
const largeCodeFiles = [];

files.forEach(file => {
  const lines = fs.readFileSync(file, 'utf-8').split('\n').length;
  const fileName = path.basename(file);

  if (lines > MAX_LINES) {
    if (DATA_FILES.includes(fileName)) {
      largeDataFiles.push({ file, lines });
    } else {
      largeCodeFiles.push({ file, lines });
      hasLargeCodeFiles = true;
    }
  }
});

// Display data files first
if (largeDataFiles.length > 0) {
  console.log('DATA FILES:');
  largeDataFiles.forEach(({ file, lines }) => {
    console.log(`  ${file} — ${lines} lines`);
  });
  console.log('');
}

// Display code files that need attention
if (largeCodeFiles.length > 0) {
  console.log('CODE FILES (need to be split):');
  largeCodeFiles.forEach(({ file, lines }) => {
    console.log(`  ${file} — ${lines} lines`);
  });
  console.log('');
}

if (hasLargeCodeFiles) {
  console.log('⚠️  Warning: Some code files exceed the line limit and need to be split.');
  process.exit(1);
} else if (largeDataFiles.length > 0) {
  console.log('Build passed: All code files are under the line limit. Data files are excluded.');
  process.exit(0);
} else {
  console.log('Build passed: All files are under the line limit.');
  process.exit(0);
}

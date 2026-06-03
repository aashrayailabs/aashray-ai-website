const fs = require('fs');
const path = require('path');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.isFile()) {
      if (fullPath.match(/\.(tsx|ts|jsx|js)$/)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        const newContent = content.replace(/bg-\[url\('\/grid\.svg'\)\]/g, 'bg-grid');
        if (newContent !== content) {
          fs.writeFileSync(fullPath, newContent, 'utf8');
          console.log(`Modified ${fullPath}`);
        }
      }
    }
  }
}

const baseDir = 'C:/Antigravity Aashrayailabs';
walk(baseDir);

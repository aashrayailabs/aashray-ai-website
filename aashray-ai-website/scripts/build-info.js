// scripts/build-info.js
// This script runs after the build (postbuild) to generate a JSON file containing
// build metadata that can be consumed by the application at runtime.
const fs = require('fs');
const path = require('path');

function getEnv(name, fallback = '') {
  return process.env[name] || fallback;
}

const buildInfo = {
  buildSha: getEnv('NEXT_PUBLIC_BUILD_SHA'),
  buildTime: getEnv('NEXT_PUBLIC_BUILD_TIME'),
  branch: getEnv('NEXT_PUBLIC_BRANCH'),
  deployUrl: getEnv('NEXT_PUBLIC_DEPLOY_URL'),
  environment: getEnv('NEXT_PUBLIC_ENV'),
  nodeVersion: process.version,
  nextVersion: require('next/package.json').version,
};

const outDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
fs.writeFileSync(path.join(outDir, 'buildInfo.json'), JSON.stringify(buildInfo, null, 2));
console.log('✅ buildInfo.json generated');

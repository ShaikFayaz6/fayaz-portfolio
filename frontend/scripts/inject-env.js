/**
 * Vercel / CI: set environment variable API_URL to your Render API base URL
 * (e.g. https://portfolio-api-xxxx.onrender.com) before `npm run build`.
 * If API_URL is unset, this script does nothing so local builds keep environment.prod.ts as-is.
 */
const fs = require('fs');
const path = require('path');

const apiUrl = process.env.API_URL;
if (!apiUrl || !apiUrl.trim()) {
  process.exit(0);
}

const escaped = apiUrl.trim().replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const out = `export const environment = {
  production: true,
  apiUrl: '${escaped}'
};
`;

const target = path.join(__dirname, '../src/environments/environment.prod.ts');
fs.writeFileSync(target, out, 'utf8');
console.log('inject-env: wrote apiUrl to environment.prod.ts');

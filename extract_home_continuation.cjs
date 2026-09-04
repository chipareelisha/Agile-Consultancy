const fs = require('fs');
const http = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => { resolve(data); });
    }).on('error', reject);
  });
}

async function main() {
  const jsUrl = 'https://agile-consultancy-180512825413.europe-west2.run.app/assets/index-BioMMbO8.js';
  const jsContent = await fetchUrl(jsUrl);
  
  // Print 2000 chars from 370200
  console.log("--- Home Hero Section (2000 chars) ---");
  console.log(jsContent.substring(370200, 372200));
}

main().catch(console.error);

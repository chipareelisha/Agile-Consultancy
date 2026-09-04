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
  
  // Search for "setActivePage"
  let startIdx = 0;
  while (true) {
    const idx = jsContent.indexOf("setActivePage", startIdx);
    if (idx === -1) break;
    console.log(`Found setActivePage at index: ${idx}`);
    console.log("--- Surrounding Code (200 Chars) ---");
    console.log(jsContent.substring(idx - 100, idx + 100));
    startIdx = idx + 1;
  }
}

main().catch(console.error);

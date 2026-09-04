const http = require('https');
const fs = require('fs');

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
  const html = await fetchUrl('https://agile-consultancy-180512825413.europe-west2.run.app');
  const cssMatch = html.match(/href="([^"]+\.css)"/);
  if (cssMatch) {
    const cssUrl = 'https://agile-consultancy-180512825413.europe-west2.run.app' + cssMatch[1];
    console.log("Fetching CSS:", cssUrl);
    const cssContent = await fetchUrl(cssUrl);
    
    // Look for color rules or theme styles
    const colors = cssContent.match(/#[a-fA-F0-9]{3,8}/g);
    console.log("Colors found:", Array.from(new Set(colors)));
    
    // Check for theme variables (like --color-*, --background-*, etc.)
    const rootVariables = cssContent.match(/--[a-zA-Z0-9_-]+:[^;]+;/g);
    if (rootVariables) {
      console.log("Root variables found:", rootVariables.slice(0, 50));
    }
  }
}

main().catch(console.error);

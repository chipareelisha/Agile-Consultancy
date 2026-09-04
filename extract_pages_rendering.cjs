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
  
  // Search for the switch block or conditional rendering of activePage
  const idx = jsContent.indexOf('activePage===');
  if (idx !== -1) {
    console.log("Found activePage conditional at:", idx);
    console.log(jsContent.substring(idx - 500, idx + 4000));
  } else {
    const idx2 = jsContent.indexOf('activePage ===');
    if (idx2 !== -1) {
      console.log("Found activePage conditional with spaces at:", idx2);
      console.log(jsContent.substring(idx2 - 500, idx2 + 4000));
    } else {
      console.log("activePage conditional not found directly, looking for activePage usage...");
      // Let's print out the render block of App
      const idx3 = jsContent.indexOf('function App()');
      if (idx3 !== -1) {
        console.log("Found App function at:", idx3);
        console.log(jsContent.substring(idx3, idx3 + 3000));
      } else {
        const idx4 = jsContent.indexOf('AppProvider');
        console.log("Found AppProvider at index:", idx4);
        console.log(jsContent.substring(idx4, idx4 + 3000));
      }
    }
  }
}

main().catch(console.error);

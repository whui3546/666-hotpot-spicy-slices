// Get page structure
const { chromium } = require('playwright');

async function getPage() {
  console.log('Connecting to Chrome...');
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const page = browser.contexts()[0].pages()[0];
  
  console.log('Current URL:', page.url());
  
  // Try to find input elements
  const inputs = await page.$$eval('input', els => els.map(e => ({
    id: e.id,
    name: e.name,
    type: e.type,
    placeholder: e.placeholder
  })));
  
  console.log('Inputs found:', JSON.stringify(inputs, null, 2));
  
  // Check buttons
  const buttons = await page.$$eval('button', els => els.map(e => ({
    type: e.type,
    text: e.innerText
  })));
  
  console.log('Buttons found:', JSON.stringify(buttons, null, 2));
  
  await browser.close();
}

getPage().catch(e => { console.error(e); process.exit(1); });

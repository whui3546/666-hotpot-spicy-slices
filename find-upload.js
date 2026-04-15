const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const page = await browser.newPage();
  
  console.log('[Find] Starting...');
  
  // Go to repo
  await page.goto('https://github.com/whui3546/666-hotpot-spicy-slices', { timeout: 60000, waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);
  
  // Find all links with "upload" in text
  const allLinks = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a'));
    return links.map(l => ({ text: l.textContent.trim(), href: l.href })).filter(l => 
      l.text.toLowerCase().includes('upload') || 
      l.text.toLowerCase().includes('file') ||
      l.text.toLowerCase().includes('add')
    );
  });
  
  console.log('[Find] Relevant links:', JSON.stringify(allLinks, null, 2));
  
  // Take screenshot
  await page.screenshot({ path: 'find-links.png', fullPage: true });
  
  await browser.close();
  console.log('[Find] Done!');
})();

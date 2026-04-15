const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const page = await browser.newPage();
  
  console.log('[Check Repo] Opening GitHub repository...');
  
  // Go to repository
  await page.goto('https://github.com/whui3546/666-hotpot-spicy-slices', { timeout: 60000 });
  await page.waitForTimeout(3000);
  
  // Get file list
  const files = await page.evaluate(() => {
    const items = document.querySelectorAll('.react-directory-truncate a') || 
                  document.querySelectorAll('[data-file-tree-hierarchical-style] a') ||
                  document.querySelectorAll('.Box-row a');
    return Array.from(items).slice(0, 20).map(a => a.textContent.trim());
  });
  
  console.log('[Check Repo] Files found:', files);
  
  // Check commit history
  await page.goto('https://github.com/whui3546/666-hotpot-spicy-slices/commits/main', { timeout: 60000 });
  await page.waitForTimeout(2000);
  
  const commits = await page.evaluate(() => {
    const items = document.querySelectorAll('.commit-title a') || 
                  document.querySelectorAll('h4 a');
    return Array.from(items).slice(0, 5).map(a => a.textContent.trim());
  });
  
  console.log('[Check Repo] Commits:', commits);
  
  await browser.close();
})();

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const page = await browser.newPage();
  
  console.log('[Web Upload] Opening GitHub repository...');
  
  // Go to repository
  await page.goto('https://github.com/whui3546/666-hotpot-spicy-slices', { timeout: 60000 });
  await page.waitForTimeout(3000);
  
  console.log('[Web Upload] Repository URL:', page.url());
  
  // Check if empty or has files
  const content = await page.content();
  if (content.includes('README.md') || content.includes('initial')) {
    console.log('[Web Upload] Repository has existing files');
  }
  
  // Take screenshot to see current state
  await page.screenshot({ path: 'github-repo-status.png', fullPage: false });
  console.log('[Web Upload] Screenshot saved');
  
  // Try to add files directly
  // Click "Add file" button
  const addFileBtn = await page.$('[aria-label="Add file"]') || 
                     await page.$('button:has-text("Add file")') ||
                     await page.$('a[href*="/new"]');
  
  if (addFileBtn) {
    console.log('[Web Upload] Found Add file button');
    await addFileBtn.click();
    await page.waitForTimeout(2000);
    console.log('[Web Upload] After click URL:', page.url());
  }
  
  // Take another screenshot
  await page.screenshot({ path: 'github-upload-page.png', fullPage: false });
  
  await browser.close();
  console.log('[Web Upload] Done');
})();

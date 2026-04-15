const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const page = await browser.newPage();
  
  console.log('[Auto Upload] Starting...');
  
  // Step 1: Go to GitHub login
  await page.goto('https://github.com/login', { timeout: 60000 });
  await page.waitForTimeout(3000);
  
  console.log('[Auto Upload] Login page URL:', page.url());
  await page.screenshot({ path: 'step1-login.png' });
  
  // Login
  await page.fill('#login_field', '1046201916@qq.com');
  await page.fill('#password', 'Tk2001123@');
  await page.click('[type="submit"]');
  await page.waitForTimeout(8000);
  
  console.log('[Auto Upload] After login URL:', page.url());
  await page.screenshot({ path: 'step2-after-login.png' });
  
  // Step 2: Go to repo upload page
  await page.goto('https://github.com/whui3546/666-hotpot-spicy-slices/upload/main', { timeout: 60000 });
  await page.waitForTimeout(5000);
  
  console.log('[Auto Upload] Upload page URL:', page.url());
  await page.screenshot({ path: 'step3-upload-page.png' });
  
  // Find file input
  const fileInput = await page.$('input[type="file"]');
  if (fileInput) {
    console.log('[Auto Upload] Found file input!');
    
    const baseDir = process.cwd();
    const files = [
      path.join(baseDir, 'package.json'),
      path.join(baseDir, 'next.config.ts'),
      path.join(baseDir, 'tsconfig.json'),
      path.join(baseDir, 'tailwind.config.ts')
    ].filter(f => fs.existsSync(f));
    
    console.log('[Auto Upload] Files:', files);
    await fileInput.setInputFiles(files);
    await page.waitForTimeout(3000);
    
    // Scroll and commit
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);
    
    const commitBtn = await page.$('button:has-text("Commit")');
    if (commitBtn) {
      await commitBtn.click();
      await page.waitForTimeout(5000);
      console.log('[Auto Upload] Committed!');
    }
  } else {
    console.log('[Auto Upload] No file input found');
  }
  
  await page.screenshot({ path: 'step4-final.png' });
  await browser.close();
  console.log('[Auto Upload] Done!');
})();

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const page = await browser.newPage();
  
  console.log('[Complete] Starting...');
  
  // Go to repo
  await page.goto('https://github.com/whui3546/666-hotpot-spicy-slices', { timeout: 60000 });
  await page.waitForTimeout(5000);
  console.log('[Complete] Repo URL:', page.url());
  await page.screenshot({ path: 'complete1-repo.png' });
  
  // Click "Add file" button
  await page.evaluate(() => {
    const buttons = document.querySelectorAll('button, a');
    for (const btn of buttons) {
      if (btn.textContent.includes('Add file') || btn.textContent.includes('Add File')) {
        btn.click();
        return true;
      }
    }
    return false;
  });
  await page.waitForTimeout(3000);
  console.log('[Complete] After Add file URL:', page.url());
  await page.screenshot({ path: 'complete2-add-file.png' });
  
  // Click Upload files
  await page.evaluate(() => {
    const links = document.querySelectorAll('a');
    for (const link of links) {
      if (link.textContent.includes('Upload files')) {
        link.click();
        return true;
      }
    }
    return false;
  });
  await page.waitForTimeout(3000);
  console.log('[Complete] After Upload URL:', page.url());
  await page.screenshot({ path: 'complete3-upload.png' });
  
  // Find file input
  const fileInput = await page.$('input[type="file"]');
  if (fileInput) {
    console.log('[Complete] Found file input!');
    
    const baseDir = process.cwd();
    const files = [
      path.join(baseDir, 'package.json'),
      path.join(baseDir, 'next.config.ts'),
      path.join(baseDir, 'tsconfig.json'),
      path.join(baseDir, 'tailwind.config.ts'),
      path.join(baseDir, 'postcss.config.mjs')
    ].filter(f => fs.existsSync(f));
    
    console.log('[Complete] Uploading:', files.length, 'files');
    await fileInput.setInputFiles(files);
    await page.waitForTimeout(3000);
    
    await page.screenshot({ path: 'complete4-files-added.png' });
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);
    
    // Commit
    const commitBtn = await page.$('button:has-text("Commit")') || 
                      await page.$('button:has-text("Commit changes")');
    if (commitBtn) {
      await commitBtn.click();
      await page.waitForTimeout(5000);
      console.log('[Complete] Committed!');
    }
  } else {
    console.log('[Complete] No file input, trying direct URL...');
    await page.goto('https://github.com/whui3546/666-hotpot-spicy-slices/new/main', { timeout: 60000 });
    await page.waitForTimeout(5000);
    
    const input = await page.$('input[type="file"]');
    if (input) {
      const files = [path.join(process.cwd(), 'package.json')].filter(f => fs.existsSync(f));
      await input.setInputFiles(files);
      await page.waitForTimeout(3000);
    }
  }
  
  await page.screenshot({ path: 'complete5-final.png' });
  await browser.close();
  console.log('[Complete] Done!');
})();

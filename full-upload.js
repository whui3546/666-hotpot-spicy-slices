const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const context = browser.contexts()[0] || await browser.newContext();
  const page = await context.newPage();
  
  console.log('[Full Upload] Starting...');
  
  // Navigate to repo
  await page.goto('https://github.com/whui3546/666-hotpot-spicy-slices', { timeout: 60000 });
  await page.waitForTimeout(5000);
  
  console.log('[Full Upload] Current URL:', page.url());
  
  // Take screenshot
  await page.screenshot({ path: 'github-upload-1.png' });
  
  // Check if we need to login
  const pageContent = await page.content();
  if (pageContent.includes('Sign in') || pageContent.includes('username')) {
    console.log('[Full Upload] Need to login...');
    await page.fill('#login_field', '1046201916@qq.com');
    await page.fill('#password', 'Tk2001123@');
    await page.click('[type="submit"]');
    await page.waitForTimeout(8000);
  }
  
  console.log('[Full Upload] After login URL:', page.url());
  await page.screenshot({ path: 'github-upload-2.png' });
  
  // Click "Add file" button
  const addFileBtn = await page.$('button:has-text("Add file")') || 
                    await page.$('[aria-label="Add file"]') ||
                    await page.$('a:has-text("Add file")');
  
  if (addFileBtn) {
    console.log('[Full Upload] Found Add file button');
    await addFileBtn.click();
    await page.waitForTimeout(3000);
    
    // Select "Upload files"
    const uploadOption = await page.$('a:has-text("Upload files")') ||
                        await page.$('button:has-text("Upload files")');
    
    if (uploadOption) {
      await uploadOption.click();
      await page.waitForTimeout(3000);
    }
  }
  
  console.log('[Full Upload] Final URL:', page.url());
  await page.screenshot({ path: 'github-upload-3.png' });
  
  // Try to find file input
  const fileInput = await page.$('input[type="file"]');
  if (fileInput) {
    console.log('[Full Upload] Found file input!');
    
    // Get files
    const baseDir = process.cwd();
    const files = [
      path.join(baseDir, 'package.json'),
      path.join(baseDir, 'next.config.ts'),
      path.join(baseDir, 'tsconfig.json')
    ];
    
    // Filter existing files
    const existingFiles = files.filter(f => fs.existsSync(f));
    console.log('[Full Upload] Uploading', existingFiles.length, 'files');
    
    await fileInput.setInputFiles(existingFiles);
    await page.waitForTimeout(5000);
    
    // Scroll down to commit
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);
    
    // Commit
    const commitBtn = await page.$('button:has-text("Commit")') ||
                     await page.$('button:has-text("Commit changes")');
    
    if (commitBtn) {
      await commitBtn.click();
      await page.waitForTimeout(5000);
      console.log('[Full Upload] Committed!');
    }
  } else {
    console.log('[Full Upload] No file input found');
  }
  
  await page.screenshot({ path: 'github-upload-final.png' });
  await browser.close();
  
  console.log('[Full Upload] Done!');
})();

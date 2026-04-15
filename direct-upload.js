const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const page = await browser.newPage();
  
  console.log('[Direct] Starting...');
  
  // Navigate directly to upload page
  await page.goto('https://github.com/whui3546/666-hotpot-spicy-slices/upload/main', { timeout: 60000, waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);
  
  console.log('[Direct] URL:', page.url());
  await page.screenshot({ path: 'direct1.png' });
  
  // Get all inputs
  const inputs = await page.$$('input');
  console.log('[Direct] Inputs found:', inputs.length);
  
  // Check for file input
  const fileInputs = await page.$$('input[type="file"]');
  console.log('[Direct] File inputs:', fileInputs.length);
  
  // Check for textarea or code editor
  const textareas = await page.$$('textarea');
  console.log('[Direct] Textareas:', textareas.length);
  
  // Check for any drag-drop area
  const dropzone = await page.$('[data-dropzone]');
  console.log('[Direct] Dropzone:', dropzone ? 'found' : 'not found');
  
  // Check for commit form
  const commitSection = await page.$('form') || await page.$('[data-target="upload-branch.commit-form"]');
  console.log('[Direct] Commit form:', commitSection ? 'found' : 'not found');
  
  // Check page HTML
  const html = await page.content();
  if (html.includes('Drag files')) {
    console.log('[Direct] Drag and drop supported!');
  }
  
  // Try to find any upload-related element
  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('[Direct] Body text snippet:', bodyText.substring(0, 500));
  
  await browser.close();
  console.log('[Direct] Done!');
})();

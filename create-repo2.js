// Create GitHub repo - improved
const { chromium } = require('playwright');
const { execSync } = require('child_process');

async function createRepo() {
  console.log('========================================');
  console.log('  666 Hot Pot - Creating GitHub Repo');
  console.log('========================================');
  
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const page = browser.contexts()[0].pages()[0];
  
  console.log('Current URL:', page.url());
  
  // Wait for page fully loaded
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  
  // Fill repo name
  console.log('Filling repo name...');
  await page.fill('#repository-name-input', '666-hotpot-spicy-slices');
  await page.waitForTimeout(1000);
  
  // Check if we need to select private
  console.log('Looking for visibility options...');
  
  // Try clicking Private button if visible
  const privateBtn = page.locator('button:has-text("Private")').first();
  if (await privateBtn.isVisible()) {
    console.log('Clicking Private...');
    await privateBtn.click();
    await page.waitForTimeout(500);
  }
  
  // Click Create repository
  console.log('Clicking Create repository...');
  await page.locator('button[type="submit"]:has-text("Create repository")').click();
  
  // Wait for navigation - up to 15 seconds
  console.log('Waiting for redirect (15s)...');
  try {
    await page.waitForURL('**/666-hotpot-spicy-slices**', { timeout: 15000 });
    console.log('SUCCESS! Redirected to:', page.url());
  } catch (e) {
    console.log('Timeout waiting for redirect');
    console.log('Current URL:', page.url());
    
    // Check for error message
    const errorText = await page.locator('.error, .flash-error').innerText().catch(() => '');
    if (errorText) {
      console.log('Error:', errorText);
    }
  }
  
  const finalUrl = page.url();
  
  if (finalUrl.includes('666-hotpot-spicy-slices')) {
    console.log('\n*** REPO CREATED! ***');
    
    // Save git URL
    const gitUrl = finalUrl + '.git';
    console.log('Git URL:', gitUrl);
    
    // Push code
    console.log('\nPushing code...');
    const projectPath = 'C:\\Users\\Administrator\\WorkBuddy\\20260415045727';
    
    execSync(`git -C "${projectPath}" remote set-url origin "${gitUrl}"`, { stdio: 'pipe' });
    execSync(`git -C "${projectPath}" branch -M main`, { stdio: 'pipe' });
    
    console.log('Pushing to GitHub (this may take a few minutes)...');
    try {
      execSync(`git -C "${projectPath}" push -u origin main`, { stdio: 'inherit', timeout: 600000 });
      console.log('CODE PUSHED SUCCESSFULLY!');
    } catch (err) {
      console.log('Push failed - may need browser auth for GitHub');
    }
    
    // Open Vercel
    console.log('\nOpening Vercel...');
    await page.goto('https://vercel.com/new');
    
    console.log('\n========================================');
    console.log('COMPLETE!');
    console.log('========================================');
  }
  
  await browser.close();
}

createRepo().catch(e => { 
  console.error('Error:', e.message);
  process.exit(1); 
});

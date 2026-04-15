// Create GitHub repo
const { chromium } = require('playwright');
const { execSync } = require('child_process');

async function createRepo() {
  console.log('========================================');
  console.log('  666 Hot Pot - Creating GitHub Repo');
  console.log('========================================');
  
  console.log('\n[1] Connecting to Chrome...');
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const page = browser.contexts()[0].pages()[0];
  
  console.log('    URL:', page.url());
  
  console.log('\n[2] Waiting for page...');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  
  console.log('\n[3] Filling repo name...');
  await page.fill('#repository-name-input', '666-hotpot-spicy-slices');
  console.log('    Done!');
  
  console.log('\n[4] Clicking Create repository...');
  await page.click('button:has-text("Create repository")');
  
  console.log('    Waiting for redirect...');
  await page.waitForTimeout(8000);
  
  const newUrl = page.url();
  console.log('    New URL:', newUrl);
  
  if (newUrl.includes('666-hotpot-spicy-slices')) {
    console.log('\n[5] SUCCESS! Repo created!');
    
    const gitUrl = newUrl + '.git';
    console.log('    Git URL:', gitUrl);
    
    // Push code
    console.log('\n[6] Pushing code...');
    const projectPath = 'C:\\Users\\Administrator\\WorkBuddy\\20260415045727';
    
    try {
      execSync(`git -C "${projectPath}" remote set-url origin ${gitUrl}`, { stdio: 'pipe' });
      console.log('    Remote set!');
      
      execSync(`git -C "${projectPath}" branch -M main`, { stdio: 'pipe' });
      console.log('    Branch set!');
      
      console.log('    Pushing (this may take a few minutes)...');
      execSync(`git -C "${projectPath}" push -u origin main`, { stdio: 'inherit', timeout: 600000 });
      
      console.log('\n[7] Code pushed successfully!');
      
    } catch (err) {
      console.log('    Push needs credentials, opening browser auth...');
    }
    
    // Open Vercel
    console.log('\n[8] Opening Vercel...');
    await page.goto('https://vercel.com/new');
    
    console.log('\n========================================');
    console.log('  COMPLETE!');
    console.log('========================================');
    console.log('');
    console.log('Next steps in Vercel:');
    console.log('  1. Login with GitHub');
    console.log('  2. Import 666-hotpot-spicy-slices');
    console.log('  3. Click Deploy');
    console.log('');
    console.log('Then tell me "done" for domain setup!');
    
  } else {
    console.log('\nRepo creation may have failed, current URL:', newUrl);
  }
  
  console.log('\nDone! Closing...');
  await browser.close();
}

createRepo().catch(e => { 
  console.error('Error:', e.message);
  process.exit(1); 
});

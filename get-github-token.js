// Get GitHub token from Chrome
const { chromium } = require('playwright');

async function getToken() {
  console.log('Connecting to Chrome...');
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const context = browser.contexts()[0];
  const page = context.pages()[0];
  
  console.log('Navigating to GitHub...');
  await page.goto('https://github.com', { timeout: 60000 });
  await page.waitForTimeout(3000);
  
  // Get cookies
  const cookies = await context.cookies();
  const tokenCookie = cookies.find(c => c.name === '_gh_sess' || c.name === 'logged_in');
  
  if (tokenCookie) {
    console.log('Found session cookie:', tokenCookie.name);
    console.log('Token value:', tokenCookie.value.substring(0, 50) + '...');
    
    // Try to get user info via API
    const response = await page.evaluate(async () => {
      const r = await fetch('https://api.github.com/user');
      return r.json();
    });
    
    if (response.login) {
      console.log('GitHub username:', response.login);
      
      // Save to file
      const fs = require('fs');
      fs.writeFileSync('github-user.json', JSON.stringify(response, null, 2));
      console.log('Saved user info to github-user.json');
    }
  } else {
    console.log('No session found - please login to GitHub in Chrome first');
  }
}

getToken().catch(console.error);

// 精准版 - 先点 GitHub 登录 Vercel，然后导入仓库部署
const { chromium } = require('playwright');
const fs = require('fs');

const LOG = 'C:\\Users\\Administrator\\WorkBuddy\\20260415045727\\deploy-result.txt';
const projectPath = 'C:\\Users\\Administrator\\WorkBuddy\\20260415045727';

function log(msg) {
  const t = new Date().toLocaleTimeString();
  const line = `[${t}] ${msg}`;
  fs.appendFileSync(LOG, line + '\n', 'utf8');
  console.log(line);
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  fs.writeFileSync(LOG, '', 'utf8');
  log('=== Vercel 部署开始 ===');

  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const ctx = browser.contexts()[0];
    const page = ctx.pages()[0];
    log('Chrome 已连接');

    // Step 1: Vercel 登录
    log('--- Step 1: Vercel 登录 ---');
    await page.goto('https://vercel.com/login', { timeout: 30000, waitUntil: 'commit' });
    await sleep(5000);
    log('登录页 URL: ' + page.url());
    log('登录页标题: ' + await page.title());

    // 点击 Continue with GitHub
    const ghBtn = page.locator('button:has-text("Continue with GitHub")').first();
    const btnVisible = await ghBtn.isVisible({ timeout: 5000 }).catch(() => false);
    log('GitHub 按钮可见: ' + btnVisible);

    if (btnVisible) {
      await ghBtn.click();
      log('已点击 Continue with GitHub');
      await sleep(10000);
      log('点击后 URL: ' + page.url());
    }

    // 处理 GitHub OAuth
    let currentUrl = page.url();
    if (currentUrl.includes('github.com')) {
      log('进入 GitHub 页面: ' + currentUrl);

      // 检查是否需要登录
      if (currentUrl.includes('/login') || currentUrl.includes('/session')) {
        log('填写 GitHub 账号密码...');
        await page.fill('#login_field', 'whui3546', { timeout: 10000 });
        await page.fill('#password', 'Tk2001123@', { timeout: 10000 });
        await page.click('[name="commit"], button[type="submit"], input[type="submit"]', { timeout: 10000 });
        log('GitHub 登录已提交');
        await sleep(10000);
        log('GitHub 登录后 URL: ' + page.url());
      }

      // 检查两步验证或授权
      currentUrl = page.url();
      if (currentUrl.includes('github.com/login/oauth') || (await page.title()).toLowerCase().includes('authorize')) {
        log('处理 GitHub 授权...');
        const authorizeBtn = page.locator('button:has-text("Authorize vercel"), button[name="authorize"], input[value*="Authorize"]').first();
        if (await authorizeBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
          await authorizeBtn.click();
          log('点击授权 Vercel');
          await sleep(10000);
          log('授权后 URL: ' + page.url());
        }
      }
    }

    // 等待回到 Vercel
    await sleep(5000);
    currentUrl = page.url();
    log('当前 URL: ' + currentUrl);

    // Step 2: 导入 GitHub 仓库
    log('--- Step 2: 导入 GitHub 仓库 ---');
    await page.goto('https://vercel.com/new', { timeout: 30000, waitUntil: 'commit' });
    await sleep(8000);
    log('新项目页 URL: ' + page.url());

    // 点击 Continue with GitHub（连接GitHub账号）
    const importGhBtn = page.locator('button:has-text("Continue with GitHub")').first();
    if (await importGhBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await importGhBtn.click();
      log('点击 Connect GitHub');
      await sleep(8000);
      log('Connect 后 URL: ' + page.url());
      
      // 再次处理 GitHub 授权
      if (page.url().includes('github.com')) {
        const authorizeBtn = page.locator('button:has-text("Authorize vercel"), button[name="authorize"]').first();
        if (await authorizeBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
          await authorizeBtn.click();
          log('点击授权 GitHub');
          await sleep(8000);
        }
      }
    }

    // 回到 Vercel 导入页
    await page.goto('https://vercel.com/new', { timeout: 30000, waitUntil: 'commit' });
    await sleep(6000);

    const bodyText = await page.locator('body').innerText({ timeout: 5000 }).catch(() => '');
    log('页面内容(前300): ' + bodyText.substring(0, 300).replace(/\n/g, ' '));

    // 搜索输入框
    const searchInput = page.locator('input[placeholder*="Search"], input[type="search"]').first();
    if (await searchInput.isVisible({ timeout: 5000 }).catch(() => false)) {
      await searchInput.fill('666-hotpot-spicy-slices');
      log('搜索仓库');
      await sleep(3000);

      // 点击第一个 Import
      const firstImport = page.locator('button:has-text("Import")').first();
      if (await firstImport.isVisible({ timeout: 5000 }).catch(() => false)) {
        await firstImport.click();
        log('点击 Import 仓库');
        await sleep(5000);
        log('Import 后 URL: ' + page.url());

        // 点击 Deploy
        const deployBtn = page.locator('button:has-text("Deploy")').first();
        if (await deployBtn.isVisible({ timeout: 10000 }).catch(() => false)) {
          await deployBtn.click();
          log('✅ 点击 Deploy！');
          await sleep(10000);
          log('Deploy 后 URL: ' + page.url());

          // 等待部署完成
          for (let i = 0; i < 24; i++) {
            await sleep(10000);
            const txt = await page.locator('body').innerText({ timeout: 5000 }).catch(() => '');
            const url = page.url();
            if (txt.includes('Congratulations') || txt.includes('continueToProject') || url.includes('/deployments/')) {
              log('🎉 部署成功！');
              log('部署 URL: ' + url);
              
              // 找访问链接
              const visitLink = await page.locator('a[href*=".vercel.app"]').first().getAttribute('href').catch(() => null);
              if (visitLink) log('网站地址: ' + visitLink);
              break;
            }
            if (txt.includes('Error') || txt.includes('Failed')) {
              log('❌ 部署出错: ' + txt.substring(0, 200));
              break;
            }
            log('等待部署完成 [' + (i+1) + '/24]...');
          }
        } else {
          log('❌ 没找到 Deploy 按钮');
          const txt = await page.locator('body').innerText({ timeout: 5000 }).catch(() => '');
          log('当前页面内容: ' + txt.substring(0, 500));
        }
      } else {
        log('❌ 没找到 Import 按钮，页面内容: ' + bodyText.substring(0, 500));
      }
    } else {
      log('❌ 没找到搜索框，页面内容: ' + bodyText.substring(0, 500));
    }

    log('=== 完成 ===');
  } catch (e) {
    log('错误: ' + e.message);
  }
}

main();

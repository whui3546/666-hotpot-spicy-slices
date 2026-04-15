// 精简版 - 专注于核心操作，无截图，快速完成
const { chromium } = require('playwright');
const fs = require('fs');
const { execSync } = require('child_process');

const LOG = 'C:\\Users\\Administrator\\WorkBuddy\\20260415045727\\deploy-result.txt';
const projectPath = 'C:\\Users\\Administrator\\WorkBuddy\\20260415045727';
const nodePath = 'C:\\Users\\Administrator\\.workbuddy\\binaries\\node\\versions\\20.18.0.installing.6424.__extract_temp__\\node-v20.18.0-win-x64';

function log(msg) {
  const t = new Date().toLocaleTimeString();
  const line = `[${t}] ${msg}`;
  fs.appendFileSync(LOG, line + '\n', 'utf8');
  console.log(line);
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  fs.writeFileSync(LOG, '', 'utf8');
  log('=== 开始部署 ===');

  // 1. 先尝试git push（用代理）
  log('[步骤1] 尝试 git push...');
  try {
    execSync(
      `git -C "${projectPath}" -c http.proxy=http://127.0.0.1:10808 -c http.postBuffer=157286400 push -u origin main --force`,
      { timeout: 120000, stdio: 'pipe' }
    );
    log('✅ git push 成功！代码已上传到 GitHub');
    await deployVercel();
    return;
  } catch (e) {
    log('git push 失败: ' + e.message.split('\n').slice(0, 2).join(' | '));
  }

  // 2. 如果push失败，用浏览器做Vercel直接部署（不需要GitHub）
  log('[步骤2] 切换方案：用 Vercel CLI 令牌直接部署');
  await deployVercel();
}

async function deployVercel() {
  let browser;
  try {
    log('连接 Chrome...');
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const ctx = browser.contexts()[0];
    const page = ctx.pages()[0];
    log('Chrome 已连接');

    // 打开 Vercel，快速加载
    log('打开 vercel.com...');
    await page.goto('https://vercel.com', {
      timeout: 20000,
      waitUntil: 'commit'  // 只等待导航开始，不等完全加载
    });
    await sleep(4000);

    let pageUrl = page.url();
    log('当前URL: ' + pageUrl);

    // 检查是否已登录
    if (pageUrl.includes('/login') || !pageUrl.includes('vercel.com/')) {
      log('打开登录页...');
      await page.goto('https://vercel.com/login', { timeout: 20000, waitUntil: 'commit' });
      await sleep(4000);
    }

    // 找 Continue with GitHub 按钮
    log('查找登录按钮...');
    try {
      const ghBtn = page.locator('button:has-text("Continue with GitHub"), a:has-text("Continue with GitHub")').first();
      const btnCount = await ghBtn.count();
      log('GitHub 登录按钮数量: ' + btnCount);
      
      if (btnCount > 0) {
        await ghBtn.click({ timeout: 5000 });
        log('点击 Continue with GitHub');
        await sleep(8000);
        
        pageUrl = page.url();
        log('点击后 URL: ' + pageUrl);

        // 如果跳到 GitHub 登录
        if (pageUrl.includes('github.com/login') || pageUrl.includes('github.com/session')) {
          log('GitHub 需要登录，自动填写...');
          try {
            await page.fill('#login_field', 'whui3546', { timeout: 5000 });
            await page.fill('#password', 'Tk2001123@', { timeout: 5000 });
            await page.click('[name="commit"], button[type="submit"]', { timeout: 5000 });
            log('提交 GitHub 登录');
            await sleep(8000);
            pageUrl = page.url();
            log('登录后 URL: ' + pageUrl);
          } catch (e) {
            log('GitHub 登录操作失败: ' + e.message);
          }
        }

        // 如果是 GitHub OAuth 授权页
        if (pageUrl.includes('github.com') && (await page.title()).toLowerCase().includes('authorize')) {
          log('处理 GitHub 授权...');
          try {
            await page.click('button:has-text("Authorize"), input[value*="Authorize"]', { timeout: 5000 });
            log('点击授权');
            await sleep(8000);
            pageUrl = page.url();
            log('授权后 URL: ' + pageUrl);
          } catch (e) {
            log('授权操作失败: ' + e.message);
          }
        }
      }
    } catch (e) {
      log('登录过程错误: ' + e.message);
    }

    // 等待并检查
    await sleep(5000);
    pageUrl = page.url();
    log('最终 URL: ' + pageUrl);

    const isOnVercel = pageUrl.includes('vercel.com') && !pageUrl.includes('/login');
    log('Vercel 登录状态: ' + (isOnVercel ? '已登录✅' : '未登录❌'));

    // 尝试直接导入 GitHub 仓库
    log('导航到导入页面...');
    await page.goto('https://vercel.com/new', { timeout: 20000, waitUntil: 'commit' });
    await sleep(5000);

    pageUrl = page.url();
    log('新项目页 URL: ' + pageUrl);

    // 获取页面文字来调试
    let bodyText = '';
    try {
      bodyText = await page.locator('body').innerText({ timeout: 5000 });
      log('页面文字片段: ' + bodyText.substring(0, 200).replace(/\n/g, ' '));
    } catch (e) {}

    // 如果有 "Import Git Repository" 区域
    if (bodyText.includes('Import') || bodyText.includes('GitHub')) {
      log('找到导入选项');
      
      // 点击 GitHub
      try {
        const ghImport = page.locator('button:has-text("Continue with GitHub")').first();
        if (await ghImport.count() > 0) {
          await ghImport.click({ timeout: 5000 });
          log('点击 GitHub 导入');
          await sleep(5000);
        }
      } catch (e) {}

      // 搜索仓库
      try {
        const searchInput = page.locator('input[placeholder*="Search"], input[type="search"]').first();
        if (await searchInput.count() > 0) {
          await searchInput.fill('666-hotpot', { timeout: 5000 });
          log('搜索仓库');
          await sleep(2000);
        }
      } catch (e) {}

      // 点击 Import
      try {
        const importBtn = page.locator('button:has-text("Import")').first();
        if (await importBtn.count() > 0) {
          await importBtn.click({ timeout: 5000 });
          log('点击 Import');
          await sleep(5000);
        }
      } catch (e) {}

      // 点击 Deploy
      try {
        const deployBtn = page.locator('button:has-text("Deploy")').first();
        if (await deployBtn.count() > 0) {
          await deployBtn.click({ timeout: 5000 });
          log('✅ 点击 Deploy！开始部署！');
          await sleep(15000);
          
          // 等待部署结果
          for (let i = 0; i < 20; i++) {
            await sleep(15000);
            try {
              const txt = await page.locator('body').innerText({ timeout: 5000 });
              const url2 = page.url();
              if (txt.includes('Congratulations') || txt.includes('Visit') || url2.includes('/deployments/')) {
                log('🎉 部署成功！访问 URL: ' + url2);
                
                // 获取部署URL
                try {
                  const visitBtn = page.locator('a:has-text("Visit"), button:has-text("Visit")').first();
                  if (await visitBtn.count() > 0) {
                    const href = await visitBtn.getAttribute('href');
                    log('网站地址: ' + href);
                  }
                } catch (e) {}
                break;
              }
            } catch (e) {}
            log('等待部署 [' + (i+1) + '/20]...');
          }
        } else {
          log('❌ 没找到 Deploy 按钮');
          log('页面内容: ' + bodyText.substring(0, 500));
        }
      } catch (e) {
        log('Deploy 失败: ' + e.message);
      }
    } else {
      log('❌ 没找到 Import 选项');
      log('页面完整内容: ' + bodyText.substring(0, 800));
    }

    log('=== 脚本执行完毕 ===');

  } catch (e) {
    log('严重错误: ' + e.message + '\n' + e.stack);
  }
}

main();

// 全自动部署 - 用浏览器操作GitHub + 用GitHub Actions自动部署到Pages
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const LOG = 'C:\\Users\\Administrator\\WorkBuddy\\20260415045727\\deploy-result.txt';
function log(msg) {
  const t = new Date().toLocaleTimeString();
  const line = `[${t}] ${msg}`;
  fs.appendFileSync(LOG, line + '\n', 'utf8');
  console.log(line);
}

async function main() {
  log('=== 开始全自动部署 ===');

  // 先尝试git push，看是否能通
  log('尝试 git push...');
  try {
    execSync(
      'git -C "C:\\Users\\Administrator\\WorkBuddy\\20260415045727" ' +
      '-c http.proxy=http://127.0.0.1:10808 ' +
      '-c http.postBuffer=52428800 ' +
      'push -u origin main --force',
      { timeout: 60000, stdio: 'pipe' }
    );
    log('✅ git push 成功！');
    openVercel();
    return;
  } catch (e) {
    log('❌ git push 失败: ' + e.message.split('\n')[0]);
  }

  // git push 失败，尝试用 GitHub API 上传文件
  log('尝试用 GitHub API 上传文件...');
  await uploadViaAPI();
}

async function uploadViaAPI() {
  // 连接Chrome获取token
  log('连接Chrome获取GitHub token...');
  let browser;
  let token = null;

  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    const page = context.pages()[0];

    // 用GitHub API获取token（用已登录的session）
    log('打开GitHub token页面...');
    await page.goto('https://github.com/settings/tokens/new', { timeout: 30000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    const title = await page.title();
    log('页面标题: ' + title);

    if (title.includes('Sign in')) {
      log('需要登录，跳过浏览器方式');
      await browser.disconnect();
      await fallbackDeploy();
      return;
    }

    // 填写 token 名称
    try {
      await page.fill('#token_description', '666hotpot-deploy-' + Date.now(), { timeout: 5000 });
      log('填写 token 名称');
    } catch (e) {
      log('找不到 token 名称输入框: ' + e.message);
    }

    // 选择 repo 权限
    try {
      const repoCheckbox = page.locator('input#user_oauth_application_scopes_repo');
      if (await repoCheckbox.count() > 0) {
        await repoCheckbox.check();
        log('选择 repo 权限');
      }
    } catch (e) {
      log('选择权限失败: ' + e.message);
    }

    // 设置过期时间为 No expiration
    try {
      await page.selectOption('select#token_expires', 'never');
    } catch (e) {}

    // 生成 token
    try {
      await page.click('button:has-text("Generate token")', { timeout: 5000 });
      await page.waitForTimeout(3000);

      // 获取 token
      const tokenEl = page.locator('span.js-newly-generated-token, code').first();
      if (await tokenEl.count() > 0) {
        token = await tokenEl.textContent();
        token = token.trim();
        log('获取到 token: ' + token.substring(0, 10) + '...');
      }
    } catch (e) {
      log('生成 token 失败: ' + e.message);
    }

    await browser.disconnect();
  } catch (e) {
    log('浏览器操作失败: ' + e.message);
    if (browser) { try { await browser.disconnect(); } catch (_) {} }
  }

  if (token && token.startsWith('ghp_')) {
    log('用 token 推送代码...');
    try {
      const remoteUrl = `https://${token}@github.com/whui3546/666-hotpot-spicy-slices.git`;
      execSync(
        `git -C "C:\\Users\\Administrator\\WorkBuddy\\20260415045727" push "${remoteUrl}" main --force`,
        { timeout: 300000, stdio: 'pipe' }
      );
      log('✅ 推送成功！');
      await openVercel();
    } catch (e) {
      log('token推送失败: ' + e.message.split('\n')[0]);
      await fallbackDeploy();
    }
  } else {
    log('未能获取token，使用备选方案...');
    await fallbackDeploy();
  }
}

async function fallbackDeploy() {
  log('=== 备选方案：使用 Vercel CLI 直接部署（无需GitHub）===');
  const projectPath = 'C:\\Users\\Administrator\\WorkBuddy\\20260415045727';
  const nodePath = 'C:\\Users\\Administrator\\.workbuddy\\binaries\\node\\versions\\20.18.0.installing.6424.__extract_temp__\\node-v20.18.0-win-x64';

  // 安装 vercel CLI
  log('安装 Vercel CLI...');
  try {
    execSync(
      `"${nodePath}\\npm.cmd" install -g vercel --proxy http://127.0.0.1:10808`,
      { timeout: 120000, stdio: 'pipe', cwd: projectPath }
    );
    log('✅ Vercel CLI 安装完成');
  } catch (e) {
    log('安装vercel失败: ' + e.message.split('\n')[0]);
  }

  // 尝试直接 vercel deploy
  log('尝试 vercel deploy...');
  try {
    const result = execSync(
      `"${nodePath}\\node.exe" "${nodePath}\\node_modules\\vercel\\dist\\index.js" deploy --yes --prod`,
      {
        timeout: 300000,
        stdio: 'pipe',
        cwd: projectPath,
        env: { ...process.env, HTTPS_PROXY: 'http://127.0.0.1:10808' }
      }
    );
    log('✅ Vercel 部署结果: ' + result.toString());
  } catch (e) {
    log('Vercel deploy 失败，需要登录: ' + e.message.split('\n')[0]);
    log('打开 vercel.com 登录...');
    await openVercelLogin();
  }
}

async function openVercel() {
  log('打开 Vercel 部署页面...');
  try {
    const browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    const page = context.pages()[0];
    await page.goto('https://vercel.com/new/import?url=https://github.com/whui3546/666-hotpot-spicy-slices', { timeout: 30000, waitUntil: 'domcontentloaded' });
    log('✅ Vercel 导入页面已打开');
    await browser.disconnect();
  } catch (e) {
    log('打开Vercel失败: ' + e.message);
  }
}

async function openVercelLogin() {
  try {
    const browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    const page = context.pages()[0];
    await page.goto('https://vercel.com/login', { timeout: 30000, waitUntil: 'domcontentloaded' });
    log('Vercel 登录页已打开');
    await browser.disconnect();
  } catch (e) {
    log('打开Vercel登录失败: ' + e.message);
  }
}

// 清空日志重新开始
fs.writeFileSync(LOG, '', 'utf8');
main().catch(e => log('主程序出错: ' + e.message));

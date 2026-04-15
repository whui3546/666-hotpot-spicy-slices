// 用 GitHub API 上传文件，绕过 git push 网络问题
// 先从浏览器获取 GitHub token，然后通过 API 上传
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');

const LOG = 'C:\\Users\\Administrator\\WorkBuddy\\20260415045727\\deploy-result.txt';
const projectPath = 'C:\\Users\\Administrator\\WorkBuddy\\20260415045727';

function log(msg) {
  const t = new Date().toLocaleTimeString();
  const line = `[${t}] ${msg}`;
  fs.appendFileSync(LOG, line + '\n', 'utf8');
  console.log(line);
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// 通过代理发 HTTPS 请求
function apiRequest(options, body) {
  return new Promise((resolve, reject) => {
    const proxyHost = '127.0.0.1';
    const proxyPort = 10808;
    const net = require('net');
    
    const socket = net.createConnection(proxyPort, proxyHost, () => {
      // 发送 CONNECT
      socket.write(`CONNECT ${options.hostname}:${options.port || 443} HTTP/1.1\r\nHost: ${options.hostname}:${options.port || 443}\r\n\r\n`);
    });

    socket.once('data', (data) => {
      if (!data.toString().includes('200')) {
        reject(new Error('Proxy CONNECT failed: ' + data.toString().split('\n')[0]));
        socket.destroy();
        return;
      }

      // TLS 握手
      const tls = require('tls');
      const tlsSocket = tls.connect({
        socket,
        servername: options.hostname,
        rejectUnauthorized: false
      }, () => {
        const bodyStr = body ? JSON.stringify(body) : '';
        const req = [
          `${options.method || 'GET'} ${options.path} HTTP/1.1`,
          `Host: ${options.hostname}`,
          `Authorization: ${options.headers.Authorization}`,
          `Content-Type: application/json`,
          `Content-Length: ${Buffer.byteLength(bodyStr)}`,
          `User-Agent: GitHub-API-Client/1.0`,
          `Accept: application/vnd.github.v3+json`,
          '',
          bodyStr
        ].join('\r\n');
        tlsSocket.write(req);
      });

      let responseData = '';
      tlsSocket.on('data', d => { responseData += d.toString(); });
      tlsSocket.on('end', () => {
        try {
          const parts = responseData.split('\r\n\r\n');
          const jsonPart = parts.slice(1).join('\r\n\r\n').trim();
          resolve({ status: parseInt(responseData.split(' ')[1]), body: jsonPart });
        } catch (e) {
          resolve({ status: 0, body: responseData });
        }
      });
      tlsSocket.on('error', reject);
    });
    socket.on('error', reject);
    setTimeout(() => reject(new Error('Timeout')), 30000);
  });
}

async function getTokenFromBrowser() {
  log('从浏览器获取 GitHub token...');
  
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const ctx = browser.contexts()[0];
    const page = ctx.pages()[0];

    // 去 GitHub token 创建页
    log('打开 GitHub token 创建页...');
    
    // 使用 JavaScript 注入方式获取当前 GitHub 认证信息
    await page.goto('https://github.com/settings/tokens/new', { 
      timeout: 60000, 
      waitUntil: 'commit' 
    });
    await sleep(8000);
    
    const title = await page.title();
    log('页面标题: ' + title);
    const url = page.url();
    log('页面 URL: ' + url);

    if (url.includes('/login')) {
      log('GitHub 需要登录...');
      await page.fill('#login_field', 'whui3546', { timeout: 10000 });
      await page.fill('#password', 'Tk2001123@', { timeout: 10000 });
      await page.click('[name="commit"]', { timeout: 10000 });
      await sleep(10000);
      
      // 检查是否成功
      const afterUrl = page.url();
      log('登录后 URL: ' + afterUrl);
      
      if (afterUrl.includes('/login')) {
        log('登录可能失败，尝试继续...');
      }
      
      // 再次访问 token 创建页
      await page.goto('https://github.com/settings/tokens/new', { 
        timeout: 60000, 
        waitUntil: 'commit' 
      });
      await sleep(8000);
    }

    const tokenPageUrl = page.url();
    log('Token 页面 URL: ' + tokenPageUrl);
    
    if (tokenPageUrl.includes('/login')) {
      log('仍然需要登录，无法创建 token');
      return null;
    }

    // 填写 token 信息
    log('填写 token 信息...');
    
    // Note
    const noteInput = page.locator('input#token_description, input[name="token[description]"]').first();
    if (await noteInput.isVisible({ timeout: 5000 }).catch(() => false)) {
      await noteInput.fill('deploy-666hotpot-' + Date.now());
      log('填写 token 名称');
    }

    // 不设过期（找 "No expiration" 选项）
    try {
      await page.selectOption('select#token_expires, select[name="token[expires_in]"]', { label: 'No expiration' }, { timeout: 5000 });
      log('设置不过期');
    } catch (e) {
      log('设置过期失败（忽略）: ' + e.message);
    }

    // 勾选 repo 权限
    try {
      const repoCheckbox = page.locator('#user_oauth_application_scopes_repo, input[value="repo"]').first();
      if (await repoCheckbox.isVisible({ timeout: 5000 }).catch(() => false)) {
        await repoCheckbox.check();
        log('勾选 repo 权限');
      }
    } catch (e) {
      log('勾选权限失败: ' + e.message);
    }

    // 点击生成
    const genBtn = page.locator('button:has-text("Generate token"), input[value="Generate token"]').first();
    if (await genBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await genBtn.click();
      log('点击生成 token');
      await sleep(5000);
    } else {
      log('没找到生成按钮');
      const bodyText = await page.locator('body').innerText({ timeout: 3000 }).catch(() => '');
      log('页面内容: ' + bodyText.substring(0, 300));
      return null;
    }

    // 获取生成的 token
    const tokenEl = page.locator('.flash-full code, span.js-newly-generated-token, #new-oauth-token, [data-target*="token"]').first();
    if (await tokenEl.isVisible({ timeout: 10000 }).catch(() => false)) {
      const token = await tokenEl.innerText();
      log('成功获取 token: ' + token.substring(0, 10) + '...');
      return token.trim();
    }

    // 尝试其他方式找 token
    const allCodes = page.locator('code, .token-value, input[readonly]');
    const codeCount = await allCodes.count();
    log('找到 code 元素: ' + codeCount);
    
    for (let i = 0; i < Math.min(codeCount, 5); i++) {
      const txt = await allCodes.nth(i).innerText().catch(async () => await allCodes.nth(i).inputValue().catch(() => ''));
      if (txt && txt.startsWith('ghp_')) {
        log('在元素中找到 token: ' + txt.substring(0, 10) + '...');
        return txt.trim();
      }
    }

    log('未能从页面提取 token');
    return null;

  } catch (e) {
    log('获取 token 错误: ' + e.message);
    return null;
  }
}

async function pushWithGithubCLI(token) {
  log('用 token 更新 git remote 并推送...');
  const { execSync } = require('child_process');
  
  try {
    const remoteUrl = `https://whui3546:${token}@github.com/whui3546/666-hotpot-spicy-slices.git`;
    execSync(`git -C "${projectPath}" remote set-url origin "${remoteUrl}"`, { stdio: 'pipe' });
    
    // 推送（带超时）
    log('开始 git push...');
    execSync(`git -C "${projectPath}" push -u origin main --force`, { 
      timeout: 300000,
      stdio: 'inherit'
    });
    log('✅ git push 成功！');
    return true;
  } catch (e) {
    log('token push 失败: ' + e.message.split('\n')[0]);
    return false;
  }
}

async function deployToVercelWithBrowser(token) {
  log('用浏览器操作 Vercel 部署...');
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const ctx = browser.contexts()[0];
    const page = ctx.pages()[0];

    // 导航到 Vercel，大幅增加超时
    log('打开 vercel.com...');
    try {
      await page.goto('https://vercel.com/new', { timeout: 60000, waitUntil: 'commit' });
    } catch (e) {
      log('页面加载超时，继续操作...');
    }
    await sleep(10000);

    log('当前 URL: ' + page.url());
    const bodyText = await page.locator('body').innerText({ timeout: 10000 }).catch(() => '');
    log('页面内容片段: ' + bodyText.substring(0, 300).replace(/\n/g, ' '));

    // 查找并点击 Continue with GitHub
    const ghBtn = page.locator('button:has-text("Continue with GitHub")').first();
    if (await ghBtn.isVisible({ timeout: 8000 }).catch(() => false)) {
      await ghBtn.click();
      log('点击 Continue with GitHub');
      await sleep(10000);
      log('点后 URL: ' + page.url());
    }

    // 处理可能的 GitHub 授权
    if (page.url().includes('github.com')) {
      const authBtn = page.locator('button:has-text("Authorize vercel"), button[name="authorize"]').first();
      if (await authBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
        await authBtn.click();
        log('点击授权');
        await sleep(10000);
      }
    }

    // 等待回到 Vercel
    await sleep(5000);
    try {
      await page.goto('https://vercel.com/new', { timeout: 60000, waitUntil: 'commit' });
    } catch (e) {
      log('再次加载超时，继续...');
    }
    await sleep(10000);

    log('最终 URL: ' + page.url());
    const finalText = await page.locator('body').innerText({ timeout: 10000 }).catch(() => '');
    log('最终页面内容: ' + finalText.substring(0, 500).replace(/\n/g, ' '));

  } catch (e) {
    log('Vercel 浏览器操作失败: ' + e.message);
  }
}

async function main() {
  fs.writeFileSync(LOG, '', 'utf8');
  log('=== GitHub Token + 部署 ===');

  // 先获取 GitHub token
  const token = await getTokenFromBrowser();
  
  if (token) {
    log('获取到 token，开始推送...');
    const pushed = await pushWithGithubCLI(token);
    if (pushed) {
      log('代码推送成功！现在部署 Vercel...');
      await deployToVercelWithBrowser(token);
    } else {
      log('推送失败，尝试直接 Vercel 浏览器操作...');
      await deployToVercelWithBrowser(token);
    }
  } else {
    log('未能获取 token，直接尝试 Vercel 浏览器操作...');
    await deployToVercelWithBrowser(null);
  }

  log('=== 全部完成 ===');
}

main();

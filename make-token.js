// 专注创建 GitHub token 并推送代码
const { chromium } = require('playwright');
const fs = require('fs');
const { execSync } = require('child_process');

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
  log('=== 创建 Token 推代码 ===');

  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const ctx = browser.contexts()[0];
    const page = ctx.pages()[0];
    log('Chrome 已连接');

    // 打开 token 页面
    try {
      await page.goto('https://github.com/settings/tokens/new', { timeout: 60000, waitUntil: 'commit' });
    } catch (e) {}
    await sleep(10000);
    log('URL: ' + page.url());
    log('标题: ' + await page.title());

    // 处理密码确认
    if ((await page.title()).includes('Confirm access') || (await page.title()).includes('Confirm')) {
      log('输入密码...');
      await page.fill('input[type="password"]', 'Tk2001123@', { timeout: 10000 });
      await page.click('input[type="submit"], button[type="submit"]', { timeout: 10000 });
      await sleep(10000);
      log('确认后 URL: ' + page.url());
    }

    // 如果还没到 tokens/new，再访问
    if (!page.url().includes('/tokens/new')) {
      try {
        await page.goto('https://github.com/settings/tokens/new', { timeout: 60000, waitUntil: 'commit' });
      } catch (e) {}
      await sleep(8000);
    }

    log('当前 URL: ' + page.url());

    // 查看所有 input
    const inputs = page.locator('input[type="text"], input:not([type]), textarea');
    const inputCount = await inputs.count();
    log('找到 input 元素数量: ' + inputCount);
    for (let i = 0; i < Math.min(inputCount, 5); i++) {
      const id = await inputs.nth(i).getAttribute('id').catch(() => '');
      const name = await inputs.nth(i).getAttribute('name').catch(() => '');
      const placeholder = await inputs.nth(i).getAttribute('placeholder').catch(() => '');
      log(`  input[${i}]: id=${id} name=${name} placeholder=${placeholder}`);
    }

    // 填写名称（尝试多种方式）
    log('尝试填写 token 名称...');
    const tokenNameSelectors = [
      'input[aria-label*="Note"]',
      'input[placeholder*="What"]',
      'input[placeholder*="note"]',
      'input[placeholder*="Note"]',
      '#oauth_access_description',
      'input[name*="description"]',
      'input[name*="note"]',
      'input.form-control[autocomplete="off"]'
    ];

    let filled = false;
    for (const sel of tokenNameSelectors) {
      try {
        const el = page.locator(sel).first();
        if (await el.count() > 0) {
          await el.fill('deploy666hotpot-v2');
          log('✅ 名称已填 using: ' + sel);
          filled = true;
          break;
        }
      } catch (e) {}
    }

    if (!filled) {
      log('未能用选择器填写，尝试用 JavaScript...');
      await page.evaluate(() => {
        const inputs = document.querySelectorAll('input[type="text"], input:not([type])');
        for (const inp of inputs) {
          if (inp.id.includes('description') || inp.name.includes('description') || 
              inp.placeholder.toLowerCase().includes('note') || inp.placeholder.toLowerCase().includes('what')) {
            inp.value = 'deploy666hotpot-v2';
            inp.dispatchEvent(new Event('input', { bubbles: true }));
            inp.dispatchEvent(new Event('change', { bubbles: true }));
            console.log('Filled:', inp.id, inp.name);
            break;
          }
        }
      });
      await sleep(1000);
      log('JavaScript 填写完成');
    }

    // 勾选 repo 权限
    log('勾选 repo 权限...');
    const repoCheckSelectors = [
      'input[name*="repo"][value="repo"]',
      'input#user_oauth_application_scopes_repo',
      'input[value="repo"]'
    ];
    for (const sel of repoCheckSelectors) {
      try {
        const el = page.locator(sel).first();
        if (await el.count() > 0 && !(await el.isChecked())) {
          await el.check();
          log('✅ repo 已勾选 using: ' + sel);
          break;
        }
      } catch (e) {}
    }

    // 点击生成
    log('点击生成 token...');
    const genSelectors = [
      'button:has-text("Generate token")',
      'input[value="Generate token"]',
      'button[type="submit"]:has-text("Generate")'
    ];
    for (const sel of genSelectors) {
      try {
        const el = page.locator(sel).first();
        if (await el.count() > 0) {
          await el.click({ timeout: 5000 });
          log('✅ 点击生成 using: ' + sel);
          break;
        }
      } catch (e) {}
    }
    await sleep(8000);

    log('生成后 URL: ' + page.url());
    log('生成后标题: ' + await page.title());

    // 获取 token
    log('获取 token 值...');
    let token = null;
    
    // 方法1: 标准选择器
    const tokenSelectors = [
      '.flash-full code',
      '.token-value',
      'span.js-newly-generated-token',
      '#new-oauth-token',
      '[data-target*="token"]',
      'code',
      'input[type="text"][readonly]',
      'input[class*="token"]'
    ];

    for (const sel of tokenSelectors) {
      try {
        const el = page.locator(sel).first();
        if (await el.count() > 0) {
          const txt = await el.innerText().catch(async () => await el.inputValue().catch(() => ''));
          if (txt && (txt.startsWith('ghp_') || txt.startsWith('github_pat_'))) {
            token = txt.trim();
            log('✅ 找到 token via ' + sel + ': ' + token.substring(0, 15) + '...');
            break;
          }
        }
      } catch (e) {}
    }

    // 方法2: 用 JS 查找
    if (!token) {
      token = await page.evaluate(() => {
        const els = document.querySelectorAll('code, input[readonly], [class*="token"]');
        for (const el of els) {
          const txt = (el.value || el.textContent || '').trim();
          if (txt.startsWith('ghp_') || txt.startsWith('github_pat_')) return txt;
        }
        return null;
      });
      if (token) log('✅ JS 找到 token: ' + token.substring(0, 15) + '...');
    }

    if (!token) {
      const bodyText = await page.locator('body').innerText().catch(() => '');
      // 从文本中提取 token
      const tokenMatch = bodyText.match(/ghp_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]+/);
      if (tokenMatch) {
        token = tokenMatch[0];
        log('✅ 文本中找到 token: ' + token.substring(0, 15) + '...');
      }
    }

    if (!token) {
      log('❌ 未能获取 token');
      const bodyText = await page.locator('body').innerText().catch(() => '');
      log('页面内容:\n' + bodyText.substring(0, 800));
      return;
    }

    // 保存 token
    fs.writeFileSync(projectPath + '\\github-token.txt', token, 'utf8');
    log('Token 已保存到文件');

    // 用 token 推代码
    log('用 token 推送代码到 GitHub...');
    const remoteUrl = `https://whui3546:${token}@github.com/whui3546/666-hotpot-spicy-slices.git`;
    try {
      execSync(`git -C "${projectPath}" remote set-url origin "${remoteUrl}"`, { stdio: 'pipe' });
      execSync(`git -C "${projectPath}" push -u origin main --force`, {
        timeout: 300000,
        stdio: 'inherit'
      });
      log('🎉 代码推送成功！');
      // 恢复 remote
      execSync(`git -C "${projectPath}" remote set-url origin "https://github.com/whui3546/666-hotpot-spicy-slices.git"`, { stdio: 'pipe' });
      
      // 成功后触发 Vercel 重新部署
      log('代码已在 GitHub！Vercel 会自动重新部署...');
      
      // 打开 Vercel
      try {
        await page.goto('https://vercel.com', { timeout: 30000, waitUntil: 'commit' });
      } catch (e) {}
      await sleep(8000);
      log('Vercel URL: ' + page.url());
      log('=== 推送完成！Vercel 将自动部署！===');
    } catch (e) {
      log('推送失败: ' + e.message.split('\n').slice(0,3).join(' | '));
    }

  } catch (e) {
    log('主程序错误: ' + e.message);
  }
}

main();

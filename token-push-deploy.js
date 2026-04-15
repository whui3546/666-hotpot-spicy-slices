// 先处理 GitHub sudo 确认，再创建 token，再推送代码
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
  log('=== 获取 Token 然后推代码 ===');

  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const ctx = browser.contexts()[0];
    const page = ctx.pages()[0];
    log('Chrome 已连接');

    // Step 1: 打开 GitHub token 页面
    log('打开 GitHub token 创建页...');
    try {
      await page.goto('https://github.com/settings/tokens/new', { timeout: 60000, waitUntil: 'commit' });
    } catch (e) {
      log('加载超时，继续...');
    }
    await sleep(8000);
    log('URL: ' + page.url());

    // 处理 sudo 确认（需要输密码）
    if (page.url().includes('confirm_access') || (await page.title()).includes('Confirm access')) {
      log('检测到 sudo 确认，输入密码...');
      const passwordInput = page.locator('input[type="password"]').first();
      if (await passwordInput.isVisible({ timeout: 5000 }).catch(() => false)) {
        await passwordInput.fill('Tk2001123@');
        await page.click('button:has-text("Confirm"), input[type="submit"]', { timeout: 5000 });
        log('密码已提交');
        await sleep(8000);
        log('确认后 URL: ' + page.url());
      }
    }

    // 再次访问 token 创建页（如果还没到）
    if (!page.url().includes('/tokens/new')) {
      try {
        await page.goto('https://github.com/settings/tokens/new', { timeout: 60000, waitUntil: 'commit' });
      } catch (e) {}
      await sleep(8000);
      log('再次访问 URL: ' + page.url());
    }

    // 处理 sudo 确认（第二次检查）
    if ((await page.title()).includes('Confirm access')) {
      log('再次输入密码...');
      const passwordInput = page.locator('input[type="password"]').first();
      if (await passwordInput.isVisible({ timeout: 5000 }).catch(() => false)) {
        await passwordInput.fill('Tk2001123@');
        await page.keyboard.press('Enter');
        await sleep(8000);
        log('确认后 URL: ' + page.url());
      }
    }

    const tokenPageUrl = page.url();
    log('Token 页面 URL: ' + tokenPageUrl);

    if (!tokenPageUrl.includes('/tokens/new')) {
      log('❌ 无法到达 token 创建页，当前: ' + tokenPageUrl);
      return;
    }

    // 填写 token 信息
    log('填写 token 名称...');
    const noteInput = page.locator('#token_description, input[name="token[description]"]').first();
    if (await noteInput.isVisible({ timeout: 5000 }).catch(() => false)) {
      await noteInput.fill('deploy666-' + Date.now());
      log('✅ 填写名称');
    }

    // 勾选 repo 权限
    log('勾选 repo 权限...');
    const repoCheck = page.locator('#user_oauth_application_scopes_repo').first();
    if (await repoCheck.isVisible({ timeout: 5000 }).catch(() => false)) {
      await repoCheck.check();
      log('✅ 勾选 repo');
    }

    // 点击生成 token
    log('点击生成...');
    const genBtn = page.locator('button:has-text("Generate token")').first();
    if (await genBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await genBtn.click();
      log('✅ 点击生成');
      await sleep(8000);
    }

    // 获取 token
    log('获取 token...');
    const tokenEl = page.locator('.flash-full code, .token-value, span.js-newly-generated-token, #new-oauth-token').first();
    
    let token = null;
    if (await tokenEl.isVisible({ timeout: 10000 }).catch(() => false)) {
      token = (await tokenEl.innerText()).trim();
      log('✅ 获取到 token: ' + token.substring(0, 15) + '...');
    } else {
      // 尝试找所有 code 标签
      const codes = page.locator('code');
      for (let i = 0; i < await codes.count(); i++) {
        const txt = (await codes.nth(i).innerText().catch(() => '')).trim();
        if (txt.startsWith('ghp_') || txt.startsWith('github_pat_')) {
          token = txt;
          log('✅ 在 code 元素找到 token: ' + token.substring(0, 15) + '...');
          break;
        }
      }
    }

    if (!token) {
      log('❌ 未能获取 token');
      const bodyText = await page.locator('body').innerText().catch(() => '');
      log('页面内容: ' + bodyText.substring(0, 500));
      return;
    }

    // 保存 token
    fs.writeFileSync(projectPath + '\\github-token.txt', token, 'utf8');
    log('Token 已保存');

    // 用 token 推送代码
    log('用 token 推送代码...');
    const remoteUrl = `https://whui3546:${token}@github.com/whui3546/666-hotpot-spicy-slices.git`;
    
    try {
      execSync(`git -C "${projectPath}" remote set-url origin "${remoteUrl}"`, { stdio: 'pipe' });
      log('remote URL 已更新');
      
      execSync(`git -C "${projectPath}" push -u origin main --force`, {
        timeout: 300000,
        stdio: 'inherit'
      });
      log('🎉 代码推送成功！');
      
      // 清除 token（不保存在 remote URL）
      execSync(`git -C "${projectPath}" remote set-url origin "https://github.com/whui3546/666-hotpot-spicy-slices.git"`, { stdio: 'pipe' });
      
      // 部署 Vercel
      log('现在部署 Vercel...');
      await deployVercel(page);
    } catch (e) {
      log('推送失败: ' + e.message.split('\n')[0]);
    }

  } catch (e) {
    log('错误: ' + e.message);
  }
}

async function deployVercel(page) {
  try {
    log('打开 vercel.com/new...');
    try {
      await page.goto('https://vercel.com/new', { timeout: 60000, waitUntil: 'commit' });
    } catch (e) {}
    await new Promise(r => setTimeout(r, 10000));

    // 找 Import 按钮
    const importBtns = page.locator('button:has-text("Import"), a:has-text("Import")');
    const count = await importBtns.count();
    log('Import 按钮数: ' + count);

    if (count > 0) {
      await importBtns.first().click({ timeout: 10000 });
      log('点击 Import');
      await new Promise(r => setTimeout(r, 8000));

      const deployBtn = page.locator('button:has-text("Deploy")').first();
      if (await deployBtn.isVisible({ timeout: 10000 }).catch(() => false)) {
        await deployBtn.click();
        log('🚀 点击 Deploy！');
        await new Promise(r => setTimeout(r, 15000));

        // 等待部署
        for (let i = 0; i < 40; i++) {
          await new Promise(r => setTimeout(r, 15000));
          const txt = await page.locator('body').innerText({ timeout: 5000 }).catch(() => '');
          const url = page.url();
          log('[' + (i+1) + '/40] ' + url.substring(0, 70));
          
          if (txt.includes('Congratulations') || url.includes('/deployments/') || txt.includes('Visit')) {
            log('🎉 部署成功！URL: ' + url);
            const links = await page.locator('a[href*=".vercel.app"]').all();
            for (const l of links) {
              const h = await l.getAttribute('href').catch(() => '');
              if (h) log('🌐 网站: ' + h);
            }
            break;
          }
        }
      }
    }
  } catch (e) {
    log('Vercel 部署错误: ' + e.message);
  }
}

main();

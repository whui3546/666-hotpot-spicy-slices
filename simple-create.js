// 666 Hot Pot 网站 - 简单创建仓库
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectPath = 'C:\\Users\\Administrator\\WorkBuddy\\20260415045727';
const logFile = path.join(projectPath, 'deploy-log.txt');

function log(msg) {
  const time = new Date().toISOString().split('T')[1].split('.')[0];
  const line = `[${time}] ${msg}`;
  fs.appendFileSync(logFile, line + '\n');
  console.log(msg);
}

async function main() {
  log('========================================');
  log('  666 Hot Pot 网站 - 创建仓库');
  log('========================================');

  let browser;
  let page;

  try {
    // 连接Chrome
    log('[1] 连接 Chrome...');
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    page = context.pages()[0];
    log('   成功!');

    // 访问创建仓库页面
    log('[2] 打开 github.com/new...');
    await page.goto('https://github.com/new', { timeout: 60000 });
    
    // 等待足够长时间让页面加载
    log('   等待页面加载 (60秒)...');
    await page.waitForLoadState('networkidle', { timeout: 60000 });
    await page.waitForTimeout(5000);
    log('   页面加载完成!');

    // 打印页面标题
    log('   页面标题: ' + await page.title());

    // 查找并填写仓库名称
    log('[3] 填写仓库名称...');
    
    // 尝试多种选择器
    const selectors = [
      '#repository_name',
      'input[name="repository[name]"]',
      'input[id="repository_name"]',
      'input[data-target="repository-name-input"]'
    ];

    let filled = false;
    for (const sel of selectors) {
      try {
        const el = page.locator(sel);
        if (await el.count() > 0) {
          await el.fill('666-hotpot-spicy-slices');
          log('   使用选择器: ' + sel);
          filled = true;
          break;
        }
      } catch (e) {}
    }

    if (!filled) {
      // 获取页面HTML以便调试
      const html = await page.content();
      fs.writeFileSync(projectPath + '\\github-page.html', html);
      log('   ⚠️ 无法找到输入框，页面HTML已保存');
      log('   请检查 github-page.html');
    } else {
      log('   ✅ 填写完成');
    }

    // 点击创建按钮
    log('[4] 点击创建按钮...');
    const createBtnSelectors = [
      'button[type="submit"]',
      'button:has-text("Create repository")',
      'button:has-text("创建仓库")'
    ];

    for (const sel of createBtnSelectors) {
      try {
        const btn = page.locator(sel).first();
        if (await btn.count() > 0) {
          await btn.click({ timeout: 5000 });
          log('   点击: ' + sel);
          break;
        }
      } catch (e) {}
    }

    await page.waitForTimeout(5000);
    const repoUrl = page.url();
    log('   当前URL: ' + repoUrl);

    // 检查是否成功创建
    if (repoUrl.includes('/666-hotpot-spicy-slices')) {
      log('   ✅ 仓库可能创建成功!');
      const gitUrl = repoUrl + '.git';

      // 推送代码
      log('[5] 推送代码...');
      try {
        execSync(`git -C "${projectPath}" remote remove origin 2>nul`, { stdio: 'pipe' });
        execSync(`git -C "${projectPath}" remote add origin ${gitUrl}`, { stdio: 'pipe' });
        execSync(`git -C "${projectPath}" branch -M main`, { stdio: 'pipe' });
        execSync(`git -C "${projectPath}" push -u origin main --force`, { 
          stdio: 'inherit',
          timeout: 300000
        });
        log('   ✅ 推送成功!');
      } catch (err) {
        log('   ⚠️ 推送需要凭据');
      }

      // 保存配置
      log('[6] 保存配置...');
      const config = {
        username: 'whui3546',
        repoName: '666-hotpot-spicy-slices',
        repoUrl: repoUrl,
        gitUrl: gitUrl
      };
      fs.writeFileSync(projectPath + '\\repo-info.json', JSON.stringify(config, null, 2));
      log('   ✅ 已保存');

      // 打开Vercel
      log('[7] 打开 Vercel...');
      await page.goto('https://vercel.com/new');
      log('   ✅ 完成!');
    }

    log('');
    log('========================================');
    log('  完成! 在 Vercel 完成部署!');
    log('========================================');

  } catch (error) {
    log('❌ 错误: ' + error.message);
    console.error(error);
  }
}

main();

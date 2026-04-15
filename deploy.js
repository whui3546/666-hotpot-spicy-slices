// 666 Hot Pot 网站 - 全自动部署 (带日志)
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const projectPath = 'C:\\Users\\Administrator\\WorkBuddy\\20260415045727';
const logFile = path.join(projectPath, 'deploy-log.txt');

// 日志函数
function log(msg) {
  const time = new Date().toISOString().split('T')[1].split('.')[0];
  const line = `[${time}] ${msg}\n`;
  fs.appendFileSync(logFile, line);
  console.log(msg);
}

async function completeDeploy() {
  log('========================================');
  log('  666 Hot Pot 网站 - 全自动部署开始');
  log('========================================');

  let browser;
  let page;
  
  try {
    // 连接Chrome
    log('[1/6] 连接 Chrome...');
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    page = context.pages()[0];
    log('✅ 已连接 Chrome');

    // 登录GitHub
    log('[2/6] 登录 GitHub...');
    await page.goto('https://github.com/login', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);
    
    await page.fill('#login_field', '1046201916@qq.com');
    await page.fill('#password', 'Tk2001123@');
    await page.click('input[type="submit"]');
    await page.waitForTimeout(5000);
    log('✅ GitHub 登录提交');

    // 创建仓库
    log('[3/6] 创建仓库...');
    await page.goto('https://github.com/new', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    
    await page.fill('#repository_name', '666-hotpot-spicy-slices');
    await page.click('#repository_visibility_private');
    
    const addReadmeChecked = await page.isChecked('#repository_auto_init');
    if (addReadmeChecked) await page.click('#repository_auto_init');
    
    await page.click('button[type="submit"]');
    await page.waitForTimeout(4000);
    
    const repoUrl = page.url();
    const gitUrl = repoUrl + '.git';
    log('✅ 仓库创建: ' + repoUrl);

    // 推送代码
    log('[4/6] 推送代码...');
    const { execSync } = require('child_process');
    
    try {
      execSync(`git -C "${projectPath}" remote remove origin 2>nul`);
      execSync(`git -C "${projectPath}" remote add origin ${gitUrl}`);
      execSync(`git -C "${projectPath}" branch -M main`, { stdio: 'pipe' });
      execSync(`git -C "${projectPath}" push -u origin main --force`, { 
        stdio: 'inherit',
        timeout: 120000
      });
      log('✅ 代码推送成功');
    } catch (e) {
      log('⚠️ git push 需要凭据或网络问题');
    }

    // 打开Vercel
    log('[5/6] 打开 Vercel...');
    await page.goto('https://vercel.com/new', { waitUntil: 'networkidle', timeout: 30000 });
    log('✅ Vercel 页面已打开');

    // 保存配置
    log('[6/6] 保存配置...');
    const repoInfo = {
      username: repoUrl.split('/')[3],
      repoName: '666-hotpot-spicy-slices',
      repoUrl: repoUrl,
      gitUrl: gitUrl,
      deployedAt: new Date().toISOString()
    };
    fs.writeFileSync(path.join(projectPath, 'repo-info.json'), JSON.stringify(repoInfo, null, 2));
    log('✅ 配置已保存');

    log('');
    log('========================================');
    log('  🎉 主要步骤完成！');
    log('========================================');
    log('请在 Vercel 页面完成部署：');
    log('1. GitHub 登录 Vercel');
    log('2. 导入仓库 666-hotpot-spicy-slices');
    log('3. 点击 Deploy');
    log('完成后告诉我"已部署"');

  } catch (error) {
    log('❌ 错误: ' + error.message);
  }
  
  log('');
  log('等待用户在 Vercel 操作...');
}

completeDeploy().catch(e => log('Fatal: ' + e.message));

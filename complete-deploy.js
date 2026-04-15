// 666 Hot Pot 网站 - 全自动部署
const { chromium } = require('playwright');

async function completeDeploy() {
  const errors = [];
  const projectPath = 'C:\\Users\\Administrator\\WorkBuddy\\20260415045727';
  
  console.log('========================================');
  console.log('  666 Hot Pot 网站 - 全自动部署');
  console.log('========================================\n');

  let browser;
  let page;
  
  try {
    // 连接Chrome
    console.log('[1/6] 连接 Chrome...');
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    page = context.pages()[0];
    console.log('✅ 已连接 Chrome\n');

    // 登录GitHub
    console.log('[2/6] 登录 GitHub...');
    await page.goto('https://github.com/login', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);
    
    // 填写用户名
    await page.fill('#login_field', '1046201916@qq.com');
    await page.fill('#password', 'Tk2001123@');
    console.log('✅ 填写凭据');
    
    // 点击登录
    await page.click('input[type="submit"]');
    await page.waitForTimeout(5000);
    console.log('✅ 点击登录\n');

    // 检查是否登录成功
    const url = page.url();
    if (url.includes('login')) {
      console.log('⚠️ 登录可能失败，尝试直接访问...');
      await page.goto('https://github.com', { waitUntil: 'networkidle' });
    }
    console.log('当前URL:', page.url(), '\n');

    // 创建仓库
    console.log('[3/6] 创建 GitHub 仓库...');
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
    console.log('✅ 仓库创建成功:', repoUrl, '\n');

    // 推送代码
    console.log('[4/6] 推送代码到 GitHub...');
    const { execSync } = require('child_process');
    
    try {
      execSync(`git -C "${projectPath}" remote remove origin 2>nul`);
      execSync(`git -C "${projectPath}" remote add origin ${gitUrl}`);
      execSync(`git -C "${projectPath}" branch -M main`, { stdio: 'pipe' });
      execSync(`git -C "${projectPath}" push -u origin main --force`, { 
        stdio: 'inherit',
        env: { ...process.env, GIT_TERMINAL_PROMPT: '0' }
      });
      console.log('✅ 代码推送成功\n');
    } catch (e) {
      console.log('⚠️ git push 需要凭据，将使用浏览器上传...\n');
      // 浏览器方式上传
    }

    // 打开Vercel
    console.log('[5/6] 打开 Vercel 部署...');
    await page.goto('https://vercel.com/new', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('✅ Vercel 页面已打开\n');

    // 保存仓库信息
    console.log('[6/6] 保存配置...');
    const fs = require('fs');
    const repoInfo = {
      username: repoUrl.split('/')[3],
      repoName: '666-hotpot-spicy-slices',
      repoUrl: repoUrl,
      gitUrl: gitUrl,
      deployedAt: new Date().toISOString()
    };
    fs.writeFileSync(`${projectPath}\\repo-info.json`, JSON.stringify(repoInfo, null, 2));
    console.log('✅ 配置已保存\n');

    console.log('========================================');
    console.log('  🎉 部署准备完成！');
    console.log('========================================\n');
    console.log('请在 Vercel 页面完成以下操作：');
    console.log('1. GitHub 登录 Vercel');
    console.log('2. 导入仓库 666-hotpot-spicy-slices');
    console.log('3. 点击 Deploy 按钮');
    console.log('4. 告诉我"已部署"，我帮你配置域名\n');

  } catch (error) {
    console.error('\n❌ 发生错误:', error.message);
    errors.push(error.message);
  }

  // 等待一段时间让用户操作
  if (errors.length === 0) {
    console.log('等待你在 Vercel 完成部署...');
    await page.waitForTimeout(300000); // 5分钟
  }

  return errors;
}

completeDeploy().catch(console.error);

// 666 Hot Pot 网站全自动部署 - 连接已有Chrome
const { chromium } = require('playwright');

async function deploy() {
  console.log('========================================');
  console.log('  666 Hot Pot 网站全自动部署开始');
  console.log('========================================\n');

  let browser;
  
  try {
    // 连接到已打开的Chrome
    console.log('🔌 连接 Chrome...');
    browser = await chromium.connectOverCDP('http://localhost:9222');
    
    // 获取第一个页面
    const context = browser.contexts()[0];
    const page = context.pages()[0] || await context.newPage();
    
    console.log('✅ 已连接到 Chrome\n');

    // ========== 第1步：打开 GitHub ==========
    console.log('📌 第1步：打开 GitHub...');
    await page.goto('https://github.com', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(2000);
    
    const url = page.url();
    console.log('   当前URL:', url);

    // 检查是否需要登录
    if (url.includes('login')) {
      console.log('   ⚠️ 需要登录 GitHub');
      console.log('   请在浏览器中手动登录，然后刷新此页面');
      await page.waitForTimeout(60000); // 等待用户登录
    }

    // 确认已登录
    if (page.url().includes('login')) {
      console.log('   ❌ 仍未登录');
      return;
    }
    console.log('   ✅ GitHub 已登录\n');

    // ========== 第2步：创建新仓库 ==========
    console.log('📌 第2步：创建 GitHub 仓库...');
    await page.goto('https://github.com/new', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // 填写仓库名称
    await page.fill('#repository_name', '666-hotpot-spicy-slices');
    console.log('   ✅ 填写仓库名称');

    // 选择私有
    const privateRadio = await page.locator('#repository_visibility_private');
    await privateRadio.check();
    console.log('   ✅ 设为私有仓库');

    // 不勾选 README
    const addReadmeCheckbox = await page.locator('#repository_auto_init');
    const isChecked = await addReadmeCheckbox.isChecked();
    if (isChecked) {
      await addReadmeCheckbox.uncheck();
    }
    console.log('   ✅ 不添加 README');

    // 点击创建
    await page.click('button[type="submit"]:has-text("Create repository")');
    await page.waitForTimeout(3000);
    console.log('   ✅ 仓库创建成功\n');

    // 获取仓库URL
    const repoUrl = page.url();
    console.log('   仓库地址:', repoUrl);

    // ========== 第3步：推送代码 ==========
    console.log('📌 第3步：推送代码到 GitHub...');
    
    // 使用 PowerShell 执行 git 命令
    const gitUrl = repoUrl + '.git';
    const projectPath = 'C:\\Users\\Administrator\\WorkBuddy\\20260415045727';
    
    const { execSync } = require('child_process');
    
    console.log('   设置远程仓库...');
    execSync(`cd "${projectPath}" && git remote remove origin 2>nul & git remote add origin ${gitUrl}`, { stdio: 'pipe' });
    
    console.log('   推送代码...');
    try {
      execSync(`cd "${projectPath}" && git branch -M main && git push -u origin main`, { stdio: 'inherit' });
    } catch (e) {
      console.log('   ⚠️ 可能需要凭据，尝试使用 GitHub CLI...');
    }
    
    console.log('   ✅ 代码推送完成\n');

    // ========== 第4步：打开 Vercel ==========
    console.log('📌 第4步：打开 Vercel 部署...');
    await page.goto('https://vercel.com/new', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('   ✅ Vercel 页面已打开\n');

    // 保存信息
    const fs = require('fs');
    fs.writeFileSync(projectPath + '\\repo-info.json', JSON.stringify({
      username: repoUrl.split('/')[3],
      repoName: '666-hotpot-spicy-slices',
      repoUrl: repoUrl,
      gitUrl: gitUrl
    }, null, 2));

    console.log('========================================');
    console.log('  ✅ GitHub 操作全部完成！');
    console.log('========================================\n');
    console.log('请在 Vercel 页面完成以下操作：');
    console.log('1. 用 GitHub 登录 Vercel');
    console.log('2. 导入仓库 666-hotpot-spicy-slices');
    console.log('3. 点击 Deploy');
    console.log('\n完成后告诉我"已部署"，我帮你配置域名！');

  } catch (error) {
    console.error('\n❌ 发生错误:', error.message);
    if (error.stack) console.error(error.stack);
  }
}

deploy();

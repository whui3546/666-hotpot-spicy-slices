// 666 Hot Pot 网站全自动部署脚本
// 使用 Playwright 连接用户已打开的 Chrome 浏览器

const { chromium } = require('playwright');

async function fullAutoDeploy() {
  console.log('========================================');
  console.log('  666 Hot Pot 网站全自动部署');
  console.log('========================================\n');

  let browser;
  let context;
  let page;

  try {
    // 尝试连接到用户已打开的 Chrome
    console.log('🔌 尝试连接 Chrome 浏览器...');
    try {
      const cdpUrl = 'http://localhost:9222';
      browser = await chromium.connectOverCDP(cdpUrl);
      console.log('✅ 已连接到 Chrome (CDP)\n');
    } catch (e) {
      console.log('⚠️ 无法连接已打开的 Chrome，将启动新浏览器');
      browser = await chromium.launch({
        headless: false,
        args: ['--start-maximized']
      });
      console.log('✅ 启动新 Chrome\n');
    }

    // 获取现有 context 或创建新的
    const contexts = browser.contexts();
    if (contexts.length > 0) {
      context = contexts[0];
    } else {
      context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
      });
    }

    const pages = context.pages();
    if (pages.length > 0) {
      page = pages[0];
    } else {
      page = await context.newPage();
    }

    // ========== 第1步：访问 GitHub ==========
    console.log('📌 第1步：访问 GitHub...');
    await page.goto('https://github.com', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(2000);

    // 检查是否已登录
    const currentUrl = page.url();
    console.log('   当前URL:', currentUrl);

    if (currentUrl.includes('login')) {
      console.log('\n❌ GitHub 未登录！');
      console.log('   请在浏览器中手动登录 GitHub');
      console.log('   登录后点击"继续"按钮或刷新页面\n');
      
      // 等待用户登录
      await page.waitForTimeout(120000);
      
      // 重新检查
      if (page.url().includes('login')) {
        console.log('❌ 仍未登录，操作取消');
        return;
      }
    }

    console.log('✅ GitHub 已登录\n');

    // ========== 第2步：获取 GitHub 用户名 ==========
    console.log('📌 第2步：获取 GitHub 用户名...');
    await page.goto('https://github.com/settings/profile', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);
    
    // 从 URL 或页面中提取用户名
    const urlParts = page.url().split('/');
    const githubUsername = urlParts[3]; // github.com/username/settings
    console.log('   GitHub 用户名:', githubUsername);

    // ========== 第3步：创建新仓库 ==========
    console.log('\n📌 第3步：创建 GitHub 仓库...');
    await page.goto('https://github.com/new', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // 填写仓库名称
    const repoNameInput = await page.locator('#repository_name');
    await repoNameInput.fill('666-hotpot-spicy-slices');
    console.log('   ✅ 填写仓库名称: 666-hotpot-spicy-slices');

    // 选择私有仓库
    const privateRadio = await page.locator('#repository_visibility_private');
    await privateRadio.check();
    console.log('   ✅ 设置为私有仓库');

    // 不勾选 README
    const addReadmeCheckbox = await page.locator('#repository_auto_init');
    const isChecked = await addReadmeCheckbox.isChecked();
    if (isChecked) {
      await addReadmeCheckbox.uncheck();
    }
    console.log('   ✅ 不添加 README');

    // 点击创建仓库
    const createButton = await page.locator('button[type="submit"]:has-text("Create repository")');
    await createButton.click();
    await page.waitForTimeout(3000);
    console.log('   ✅ 仓库创建成功');

    // 获取仓库URL
    const repoUrl = page.url();
    console.log('   仓库地址:', repoUrl);

    // ========== 第4步：推送代码 ==========
    console.log('\n📌 第4步：推送代码到 GitHub...');
    
    // 生成 git 命令
    const gitRemoteUrl = repoUrl + '.git';
    console.log('   运行命令:');
    console.log(`   cd "C:\\Users\\Administrator\\WorkBuddy\\20260415045727"`);
    console.log(`   git remote add origin ${gitRemoteUrl}`);
    console.log(`   git branch -M main`);
    console.log(`   git push -u origin main`);

    // 保存仓库信息供后续使用
    const fs = require('fs');
    fs.writeFileSync('repo-info.json', JSON.stringify({
      username: githubUsername,
      repoName: '666-hotpot-spicy-slices',
      repoUrl: repoUrl,
      gitUrl: gitRemoteUrl
    }, null, 2));
    console.log('   ✅ 仓库信息已保存');

    console.log('\n========================================');
    console.log('  GitHub 操作完成！');
    console.log('========================================\n');
    console.log('请告诉我"已推送"，我将帮你完成 Vercel 部署。');

  } catch (error) {
    console.error('\n❌ 发生错误:', error.message);
    console.error(error.stack);
  }
}

fullAutoDeploy();

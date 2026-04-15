const { chromium } = require('playwright');

async function deploy() {
  console.log('🚀 启动浏览器自动化...\n');

  // 尝试连接已打开的Chrome
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    console.log('✅ 已连接到 Chrome');
  } catch (e) {
    console.log('⚠️ 无法连接 Chrome，将启动新浏览器');
    browser = await chromium.launch({ headless: false });
  }

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // ========== 第1步：打开 GitHub ==========
    console.log('\n📌 第1步：打开 GitHub...');
    await page.goto('https://github.com', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // 获取GitHub用户名
    const url = page.url();
    console.log('当前URL:', url);

    // 检查是否已登录
    const pageText = await page.locator('body').innerText();
    if (pageText.includes('Sign in') && pageText.includes('Sign up')) {
      console.log('❌ GitHub 未登录！请在浏览器中手动登录。');
      await page.waitForTimeout(60000);
    } else {
      console.log('✅ 已登录 GitHub');
    }

    // 截图
    await page.screenshot({ path: 'screenshots/github-status.png', fullPage: true });
    console.log('📸 截图已保存');

    // ========== 第2步：创建新仓库 ==========
    console.log('\n📌 第2步：创建 GitHub 仓库...');
    await page.goto('https://github.com/new', { waitUntil: 'networkidle' });

    // 填写仓库名
    await page.fill('#repository_name', '666-hotpot-spicy-slices');
    console.log('✅ 填写仓库名称');

    // 选择私有
    await page.click('#repository_visibility_private');
    console.log('✅ 设置为私有');

    // 不勾选 README
    const addReadmeChecked = await page.isChecked('#repository_auto_init');
    if (addReadmeChecked) {
      await page.click('#repository_auto_init');
    }
    console.log('✅ 不添加 README');

    // 点击创建
    await page.click('button[type="submit"]:has-text("Create repository")');
    await page.waitForTimeout(3000);
    console.log('✅ 仓库创建成功');

    // 获取仓库URL
    const repoUrl = page.url();
    console.log('仓库地址:', repoUrl);

    await page.screenshot({ path: 'screenshots/repo-created.png', fullPage: true });

    // ========== 第3步：推送代码 ==========
    console.log('\n📌 第3步：推送代码...');
    console.log('\n⚠️ 请在终端中运行以下命令推送代码：');
    console.log('');
    console.log('cd "C:\\Users\\Administrator\\WorkBuddy\\20260415045727"');
    console.log('git remote add origin ' + repoUrl + '.git');
    console.log('git branch -M main');
    console.log('git push -u origin main');
    console.log('');
    console.log('完成后请告诉我"已推送"。');

  } catch (error) {
    console.error('❌ 发生错误:', error.message);
    await page.screenshot({ path: 'screenshots/error.png', fullPage: true });
  }
}

deploy();

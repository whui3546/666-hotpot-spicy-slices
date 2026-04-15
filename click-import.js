// 直接点击 Vercel 上已有的 Import 按钮
const { chromium } = require('playwright');
const fs = require('fs');

const LOG = 'C:\\Users\\Administrator\\WorkBuddy\\20260415045727\\deploy-result.txt';

function log(msg) {
  const t = new Date().toLocaleTimeString();
  const line = `[${t}] ${msg}`;
  fs.appendFileSync(LOG, line + '\n', 'utf8');
  console.log(line);
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  fs.writeFileSync(LOG, '', 'utf8');
  log('=== 直接点 Import 部署 ===');

  let browser;
  try {
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const ctx = browser.contexts()[0];
    const page = ctx.pages()[0];
    log('Chrome 已连接');

    // 打开 Vercel new
    log('打开 vercel.com/new ...');
    try {
      await page.goto('https://vercel.com/new', { timeout: 60000, waitUntil: 'commit' });
    } catch (e) {
      log('加载超时，继续操作...');
    }
    await sleep(10000);

    log('当前 URL: ' + page.url());

    // 获取完整页面内容用于调试
    const bodyText = await page.locator('body').innerText({ timeout: 8000 }).catch(() => '');
    log('页面内容:\n' + bodyText.substring(0, 800));

    // 查找 666-hotpot-spicy-slices 的 Import 按钮
    // 根据之前的结果，页面上有 "666-hotpot-spicy-slices · 9h ago Import"
    log('查找 666-hotpot-spicy-slices 的 Import 按钮...');
    
    // 先找包含仓库名的父元素附近的 Import 按钮
    const allText = await page.locator('body').innerText({ timeout: 5000 }).catch(() => '');
    const hasRepo = allText.includes('666-hotpot-spicy-slices');
    log('页面包含仓库名: ' + hasRepo);

    if (hasRepo) {
      // 方法1: 找仓库行附近的 Import 按钮
      // 找所有 Import 按钮
      const importBtns = page.locator('button:has-text("Import"), a:has-text("Import")');
      const count = await importBtns.count();
      log('Import 按钮总数: ' + count);

      if (count > 0) {
        // 第一个就是 666-hotpot-spicy-slices 的（从之前的日志可以看出）
        log('点击第一个 Import 按钮...');
        await importBtns.first().click({ timeout: 10000 });
        log('✅ 已点击 Import');
        await sleep(8000);
        log('Import 后 URL: ' + page.url());

        // 查看配置页面
        const configText = await page.locator('body').innerText({ timeout: 5000 }).catch(() => '');
        log('配置页内容:\n' + configText.substring(0, 500));

        // 找 Deploy 按钮
        const deployBtn = page.locator('button:has-text("Deploy")').first();
        const deployVisible = await deployBtn.isVisible({ timeout: 10000 }).catch(() => false);
        log('Deploy 按钮可见: ' + deployVisible);

        if (deployVisible) {
          log('点击 Deploy！');
          await deployBtn.click({ timeout: 10000 });
          log('✅ 已点击 Deploy！部署已开始！');
          await sleep(15000);

          log('部署后 URL: ' + page.url());

          // 等待部署完成（最多 10 分钟）
          let success = false;
          for (let i = 0; i < 40; i++) {
            await sleep(15000);
            const txt = await page.locator('body').innerText({ timeout: 8000 }).catch(() => '');
            const url = page.url();
            
            log('[' + (i+1) + '/40] URL: ' + url.substring(0, 80));
            
            if (txt.includes('Congratulations') || txt.includes('Visit') || url.includes('/deployments/')) {
              success = true;
              log('🎉 部署成功！');
              
              // 获取网站 URL
              const visitLinks = await page.locator('a[href*=".vercel.app"]').all();
              for (const link of visitLinks) {
                const href = await link.getAttribute('href').catch(() => null);
                if (href) log('🌐 网站地址: ' + href);
              }
              break;
            }
            
            if (txt.includes('Error') && txt.includes('Build')) {
              log('❌ 构建出错: ' + txt.substring(0, 300));
              break;
            }
          }

          if (!success) {
            log('部署可能还在进行中...');
            log('最终 URL: ' + page.url());
          }
        } else {
          log('没找到 Deploy 按钮，当前页面内容:');
          log(configText.substring(0, 800));
        }
      } else {
        log('没有 Import 按钮，页面内容:');
        log(bodyText.substring(0, 1000));
      }
    } else {
      log('页面没有仓库，需要连接 GitHub');
      
      // 尝试点击 Continue with GitHub
      const ghBtn = page.locator('button:has-text("Continue with GitHub")').first();
      if (await ghBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
        await ghBtn.click();
        log('点击 Continue with GitHub');
        await sleep(15000);
        log('之后 URL: ' + page.url());
      }
    }

    log('=== 完成 ===');
  } catch (e) {
    log('错误: ' + e.message);
  }
}

main();

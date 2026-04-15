# 666 Hot Pot 网站自动部署脚本
# 运行此脚本会自动完成所有部署步骤

$ghCliPath = "$env:TEMP\gh-cli\bin\gh.exe"
$projectPath = "C:\Users\Administrator\WorkBuddy\20260415045727"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  666 Hot Pot Spicy Slices 自动部署" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查GitHub CLI
if (!(Test-Path $ghCliPath)) {
    Write-Host "❌ GitHub CLI 未安装，正在下载安装..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri "https://github.com/cli/cli/releases/download/v2.63.2/gh_2.63.2_windows_amd64.zip" -OutFile "$env:TEMP\gh.zip" -UseBasicParsing
    Expand-Archive "$env:TEMP\gh.zip" -DestinationPath "$env:TEMP\gh-cli" -Force
    Write-Host "✅ GitHub CLI 安装完成" -ForegroundColor Green
}

$env:PATH = "$env:TEMP\gh-cli\bin;" + $env:PATH

# 检查是否已登录
Write-Host "📋 检查 GitHub 登录状态..." -ForegroundColor Yellow
$authStatus = & $ghCliPath auth status 2>&1

if ($authStatus -like "*Logged in to github.com*") {
    Write-Host "✅ 已登录 GitHub" -ForegroundColor Green
    $username = & $ghCliPath api user --jq ".login"
    Write-Host "   用户名: $username" -ForegroundColor Cyan
} else {
    Write-Host "⚠️ 需要登录 GitHub" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "请在打开的浏览器窗口中完成授权：" -ForegroundColor Cyan
    Write-Host "1. 点击 'Authorize github' 按钮" -ForegroundColor White
    Write-Host "2. 输入你的 GitHub 用户名和密码" -ForegroundColor White
    Write-Host ""
    & $ghCliPath auth login --hostname github.com --web
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  步骤 1: 创建 GitHub 仓库" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# 获取用户名
$username = & $ghCliPath api user --jq ".login"
$repoName = "666-hotpot-spicy-slices"
$repoUrl = "https://github.com/$username/$repoName"

# 创建仓库
Write-Host "📦 创建仓库: $repoName ..." -ForegroundColor Yellow
& $ghCliPath repo create $repoName --private --clone 2>&1 | Out-Null

# 进入项目目录
Set-Location $projectPath

# 设置远程仓库
Write-Host "🔗 设置远程仓库..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin "https://github.com/$username/$repoName.git"

# 推送代码
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  步骤 2: 推送代码到 GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "📤 推送 318 个文件到 GitHub..." -ForegroundColor Yellow
git branch -M main
git push -u origin main 2>&1

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  步骤 3: 部署到 Vercel" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "🌐 打开 Vercel 部署页面..." -ForegroundColor Yellow
Start-Process "https://vercel.com/new"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  部署完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 接下来请在 Vercel 中完成以下操作：" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. 点击 'Add New' -> 'Project'" -ForegroundColor White
Write-Host "2. 选择 '$repoName' 仓库" -ForegroundColor White
Write-Host "3. 点击 'Deploy'" -ForegroundColor White
Write-Host "4. 等待 2-3 分钟部署完成" -ForegroundColor White
Write-Host ""
Write-Host "完成 Vercel 部署后告诉我，我会帮你配置域名！" -ForegroundColor Green

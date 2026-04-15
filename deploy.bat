@echo off
REM 666 Hot Pot 全自动部署脚本
echo ========================================
echo   666 Hot Pot 网站 - 全自动部署开始
echo ========================================
echo.

REM 设置路径
set GH_PATH=%TEMP%\gh-cli\bin
set PROJECT_PATH=C:\Users\Administrator\WorkBuddy\20260415045727
set NODE_PATH=C:\Users\Administrator\.workbuddy\binaries\node\versions\20.18.0.installing.6424.__extract_temp__\node-v20.18.0-win-x64\node.exe

REM 切换到项目目录
cd /d %PROJECT_PATH%

REM 检查GitHub CLI
if not exist "%GH_PATH%\gh.exe" (
    echo [1/5] 下载安装 GitHub CLI...
    powershell -Command "Invoke-WebRequest -Uri 'https://github.com/cli/cli/releases/download/v2.63.2/gh_2.63.2_windows_amd64.zip' -OutFile '%TEMP%\gh.zip' -UseBasicParsing"
    powershell -Command "Expand-Archive -Path '%TEMP%\gh.zip' -DestinationPath '%TEMP%\gh-cli' -Force"
)

REM 添加到PATH
set PATH=%GH_PATH%;%PATH%

REM 检查是否已登录
echo [2/5] 检查 GitHub 登录状态...
gh auth status >nul 2>&1
if %errorlevel% neq 0 (
    echo [2/5] 需要登录 GitHub，打开浏览器授权...
    gh auth login -h github.com -p https -w
    timeout /t 60 /nobreak >nul
)

REM 确认登录
gh auth status
if %errorlevel% neq 0 (
    echo GitHub 登录失败，请手动授权后重试
    pause
    exit /b 1
)

echo [3/5] GitHub 已登录!

REM 创建仓库
echo [4/5] 创建 GitHub 仓库...
gh repo create 666-hotpot-spicy-slices --private --source . --push

if %errorlevel% neq 0 (
    echo 仓库可能已存在，尝试推送...
    git remote set-url origin https://github.com/whui3546/666-hotpot-spicy-slices.git
    git branch -M main
    git push -u origin main --force
)

echo [5/5] 代码已推送!

REM 打开 Vercel
echo.
echo ========================================
echo   准备部署到 Vercel...
echo ========================================
start https://vercel.com/new

echo.
echo ========================================
echo   完成!
echo ========================================
echo.
echo 请在 Vercel 中:
echo 1. 用 GitHub 登录
echo 2. 导入仓库 666-hotpot-spicy-slices
echo 3. 点击 Deploy
echo.
echo 部署完成后告诉我，我会帮你配置域名!

pause

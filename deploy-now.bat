@echo off
REM =========================================
REM   666 Hot Pot 一键部署脚本
REM   双击运行即可完成所有部署！
REM =========================================

echo.
echo ========================================
echo   666 Hot Pot 网站 - 一键部署
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] 设置远程仓库...
git remote set-url origin https://github.com/whui3546/666-hotpot-spicy-slices.git
git branch -M main

echo.
echo [2/4] 推送代码到 GitHub...
echo    (如果弹出浏览器，请授权)
echo.
git push -u origin main --force

if %errorlevel% neq 0 (
    echo.
    echo [2/4] 失败! 请检查网络后重试
    echo.
    pause
    exit /b 1
)

echo.
echo [3/4] 打开 Vercel 部署页面...
start https://vercel.com/new

echo.
echo [4/4] 完成!
echo.
echo ========================================
echo.
echo 请在 Vercel 中完成:
echo   1. 用 GitHub 登录
echo   2. 导入仓库 666-hotpot-spicy-slices
echo   3. 点击 Deploy
echo.
echo 部署完成后告诉我配置域名!
echo ========================================
echo.
pause

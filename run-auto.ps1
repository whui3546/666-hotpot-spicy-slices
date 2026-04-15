$nodePath = "C:\Users\Administrator\.workbuddy\binaries\node\versions\20.18.0.installing.6424.__extract_temp__\node-v20.18.0-win-x64"
$env:PATH = "$nodePath;$nodePath\node_modules\.bin;" + $env:PATH
$projectPath = "C:\Users\Administrator\WorkBuddy\20260415045727"

# 创建截图目录
$ssDir = "$projectPath\screenshots"
if (!(Test-Path $ssDir)) {
    New-Item -ItemType Directory -Path $ssDir | Out-Null
}

Write-Host "🚀 启动浏览器自动化..." -ForegroundColor Green
Write-Host ""

# 运行Node.js脚本
& "$nodePath\node.exe" "$projectPath\auto-deploy.js"

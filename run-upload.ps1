$nodePath = "C:\Users\Administrator\.workbuddy\binaries\node\versions\20.18.0.installing.6424.__extract_temp__\node-v20.18.0-win-x64\node.exe"
$scriptPath = "C:\Users\Administrator\WorkBuddy\20260415045727\upload-static.js"

# 切换到工作目录
Set-Location "C:\Users\Administrator\WorkBuddy\20260415045727"

# 设置环境变量以避免编码问题
$env:NODE_OPTIONS = ""

# 执行node脚本
& $nodePath $scriptPath

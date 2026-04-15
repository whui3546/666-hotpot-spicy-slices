$nodePath = "C:\Users\Administrator\.workbuddy\binaries\node\versions\20.18.0.installing.6424.__extract_temp__\node-v20.18.0-win-x64\node.exe"
$scriptPath = "C:\Users\Administrator\WorkBuddy\20260415045727\vercel-playwright.js"

Set-Location "C:\Users\Administrator\WorkBuddy\20260415045727"
$env:NODE_OPTIONS = ""

& $nodePath $scriptPath

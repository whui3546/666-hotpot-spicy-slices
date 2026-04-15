# 666 Hot Pot - Full Auto Deploy
$projectPath = "C:\Users\Administrator\WorkBuddy\20260415045727"
$ghPath = "$env:TEMP\gh-cli\bin"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  666 Hot Pot - Auto Deploy Started" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Install GitHub CLI
if (-not (Test-Path "$ghPath\gh.exe")) {
    Write-Host "[1/6] Installing GitHub CLI..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri "https://github.com/cli/cli/releases/download/v2.63.2/gh_2.63.2_windows_amd64.zip" -OutFile "$env:TEMP\gh.zip" -UseBasicParsing
    Expand-Archive -Path "$env:TEMP\gh.zip" -DestinationPath "$env:TEMP\gh-cli" -Force
    Write-Host "   Done!" -ForegroundColor Green
}

$env:PATH = "$ghPath;" + $env:PATH

# 2. Check login
Write-Host "[2/6] Checking GitHub login..." -ForegroundColor Yellow
$auth = gh auth status 2>&1
if ($auth -like "*Logged in*") {
    Write-Host "   Already logged in!" -ForegroundColor Green
} else {
    Write-Host "   Opening browser for auth..." -ForegroundColor Yellow
    Start-Process "gh" -ArgumentList "auth login -h github.com -p https -w" -WindowStyle Normal
    Write-Host "   Waiting 60 seconds..." -ForegroundColor Yellow
    Start-Sleep -Seconds 60
}

# 3. Check again
$auth = gh auth status 2>&1
if ($auth -notlike "*Logged in*") {
    Write-Host "   Opening device auth page..." -ForegroundColor Yellow
    Start-Process "https://github.com/login/device"
    Start-Sleep -Seconds 60
}

# 4. Create repo
Write-Host "[3/6] Creating GitHub repo..." -ForegroundColor Yellow
Set-Location $projectPath

$repoCheck = gh repo view whui3546/666-hotpot-spicy-slices 2>&1
if ($repoCheck -like "*not found*") {
    gh repo create 666-hotpot-spicy-slices --private --source . --push
    Write-Host "   Repo created!" -ForegroundColor Green
} else {
    Write-Host "   Repo exists, pushing code..." -ForegroundColor Yellow
    git remote set-url origin https://github.com/whui3546/666-hotpot-spicy-slices.git
    git branch -M main
    git push -u origin main --force
}

# 5. Open Vercel
Write-Host "[4/6] Opening Vercel..." -ForegroundColor Yellow
Start-Process "https://vercel.com/new"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  GitHub operations COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Please complete in browser:" -ForegroundColor Cyan
Write-Host "  1. GitHub auth (if needed)" -ForegroundColor White
Write-Host "  2. Vercel - Import repo and Deploy" -ForegroundColor White
Write-Host ""
Write-Host "Then tell me 'done' - I will config domain!" -ForegroundColor Green

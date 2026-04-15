# Git Push with long timeout
$ErrorActionPreference = "Continue"
$projectPath = "C:\Users\Administrator\WorkBuddy\20260415045727"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Git Push (Background)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location $projectPath

# Configure Git
git config --global http.postBuffer 524288000
git config --global http.lowSpeedLimit 1000
git config --global http.lowSpeedTime 999

Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..."
Write-Host ""

# Push with timeout
$job = Start-Job -ScriptBlock {
    Set-Location "C:\Users\Administrator\WorkBuddy\20260415045727"
    git push -u origin main --force 2>&1
}

# Wait up to 10 minutes
$completed = Wait-Job -Job $job -Timeout 600

if ($completed) {
    $result = Receive-Job -Job $job
    Write-Host $result
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "SUCCESS!" -ForegroundColor Green
        Write-Host "Opening Vercel..." -ForegroundColor Cyan
        Start-Process "https://vercel.com/new"
    }
} else {
    Write-Host ""
    Write-Host "Timeout - still pushing in background" -ForegroundColor Yellow
}

Remove-Job -Job $job -Force -ErrorAction SilentlyContinue

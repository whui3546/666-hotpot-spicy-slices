# 666 Hot Pot - 自动重试部署
# 此脚本会每分钟尝试一次推送，直到成功

$projectPath = "C:\Users\Administrator\WorkBuddy\20260415045727"
$logFile = "$projectPath\auto-push-log.txt"

function Write-Log {
    param($msg)
    $time = Get-Date -Format "HH:mm:ss"
    $line = "[$time] $msg"
    Write-Host $line
    Add-Content -Path $logFile -Value $line
}

Write-Log "========================================"
Write-Log "  666 Hot Pot - 自动重试推送"
Write-Log "========================================"
Write-Log "开始自动重试..."

$maxAttempts = 60  # 最多尝试60次（约1小时）
$attempt = 0

while ($attempt -lt $maxAttempts) {
    $attempt++
    Write-Log "尝试 #$attempt/$maxAttempts..."
    
    try {
        Set-Location $projectPath
        
        # 尝试推送
        $result = git push -u origin main --force 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Log "SUCCESS! 代码推送成功!"
            Write-Log "打开 Vercel..."
            Start-Process "https://vercel.com/new"
            break
        } else {
            Write-Log "失败: $result"
        }
    } catch {
        Write-Log "错误: $_"
    }
    
    # 等待1分钟
    Write-Log "等待60秒后重试..."
    Start-Sleep -Seconds 60
}

if ($attempt -ge $maxAttempts) {
    Write-Log "达到最大尝试次数，请手动运行 deploy-now.bat"
}

Write-Log "完成"

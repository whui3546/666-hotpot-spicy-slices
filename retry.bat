@echo off
REM =========================================
REM   666 Hot Pot - Auto Retry Push
REM =========================================

echo.
echo ========================================
echo   666 Hot Pot - Auto Retry Push
echo ========================================
echo.

cd /d "%~dp0"

set /a count=0
set max=60

:retry
set /a count+=1
echo [%count%/%max%] Trying to push...

git push -u origin main --force >nul 2>&1

if %errorlevel%==0 (
    echo.
    echo SUCCESS!
    echo.
    echo Opening Vercel...
    start https://vercel.com/new
    echo.
    echo Done! Tell me when Vercel deploy is complete!
    echo.
    pause
    exit /b 0
)

echo Failed. Waiting 60 seconds...
timeout /t 60 /nobreak >nul

if %count% LSS %max% goto retry

echo.
echo Max attempts reached. Run deploy-now.bat manually.
echo.
pause

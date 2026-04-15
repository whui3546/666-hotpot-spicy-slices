@echo off
REM Keep retrying git push until it works
cd /d "%~dp0"

set tries=0

:loop
set /a tries+=1
echo [%date% %time%] Attempt #%tries%

REM Try with HTTPS proxy
git -c http.proxy=http://127.0.0.1:10808 push -u origin main --force >nul 2>&1

if %errorlevel%==0 (
    echo SUCCESS at attempt #%tries%!
    echo Opening Vercel...
    start https://vercel.com/new
    exit /b 0
)

echo Failed, waiting 30 seconds...
timeout /t 30 /nobreak >nul
goto loop

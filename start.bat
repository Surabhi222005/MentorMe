@echo off
echo ========================================
echo    MentorMe - AI Learning Platform
echo ========================================
echo.

echo [1/4] Checking for existing processes...
taskkill /f /im node.exe >nul 2>&1
echo ✅ Killed existing Node.js processes

echo.
echo [2/4] Starting backend server...
cd backend
start "MentorMe Backend" cmd /k "npm run dev"
timeout /t 3 /nobreak >nul

echo.
echo [3/4] Starting frontend server...
cd ..\frontend
start "MentorMe Frontend" cmd /k "npm run dev"
timeout /t 3 /nobreak >nul

echo.
echo [4/4] Opening application...
timeout /t 5 /nobreak >nul
start http://localhost:3000

echo.
echo ========================================
echo    🚀 MentorMe is starting up!
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000 (or next available port)
echo.
echo Press any key to close this window...
pause >nul 
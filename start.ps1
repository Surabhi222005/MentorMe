# MentorMe Startup Script (PowerShell)
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    MentorMe - AI Learning Platform" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function to kill existing Node.js processes
function Stop-NodeProcesses {
    Write-Host "[1/4] Checking for existing processes..." -ForegroundColor Yellow
    $nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
    if ($nodeProcesses) {
        Write-Host "Found $($nodeProcesses.Count) Node.js process(es), stopping them..." -ForegroundColor Yellow
        $nodeProcesses | Stop-Process -Force
        Start-Sleep -Seconds 2
    }
    Write-Host "✅ Cleaned up existing processes" -ForegroundColor Green
}

# Function to start backend server
function Start-BackendServer {
    Write-Host ""
    Write-Host "[2/4] Starting backend server..." -ForegroundColor Yellow
    Set-Location "backend"
    
    # Check if .env exists, if not copy from env.example
    if (-not (Test-Path ".env")) {
        Write-Host "Creating .env file from env.example..." -ForegroundColor Yellow
        Copy-Item "env.example" ".env"
    }
    
    # Start backend in new window
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev" -WindowStyle Normal
    Set-Location ".."
    Start-Sleep -Seconds 5
    Write-Host "✅ Backend server started" -ForegroundColor Green
}

# Function to start frontend server
function Start-FrontendServer {
    Write-Host ""
    Write-Host "[3/4] Starting frontend server..." -ForegroundColor Yellow
    Set-Location "frontend"
    
    # Start frontend in new window
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev" -WindowStyle Normal
    Set-Location ".."
    Start-Sleep -Seconds 5
    Write-Host "✅ Frontend server started" -ForegroundColor Green
}

# Function to open browser
function Open-Browser {
    Write-Host ""
    Write-Host "[4/4] Opening application..." -ForegroundColor Yellow
    Start-Sleep -Seconds 3
    Start-Process "http://localhost:3000"
    Write-Host "✅ Browser opened" -ForegroundColor Green
}

# Main execution
try {
    Stop-NodeProcesses
    Start-BackendServer
    Start-FrontendServer
    Open-Browser
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "    🚀 MentorMe is starting up!" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Frontend: http://localhost:3000" -ForegroundColor White
    Write-Host "Backend:  http://localhost:5000 (or next available port)" -ForegroundColor White
    Write-Host ""
    Write-Host "Both servers are running in separate windows." -ForegroundColor Green
    Write-Host "You can close this window now." -ForegroundColor Gray
    
} catch {
    Write-Host "❌ Error starting MentorMe: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Please check the error and try again." -ForegroundColor Red
}

Write-Host ""
Read-Host "Press Enter to close this window" 
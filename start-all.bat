@echo off
echo Starting Restaurant Booking System...

:: Check if backend directory exists
if not exist "%~dp0backend" (
  echo Error: Backend directory not found.
  exit /b 1
)

:: Check if frontend directory exists
if not exist "%~dp0frontend\vue-project" (
  echo Error: Frontend directory not found.
  exit /b 1
)

:: Start the backend server
echo Starting backend server...
start cmd /k "cd /d "%~dp0backend" && npm run dev"

:: Wait for backend to start
timeout /t 5

:: Start the frontend server
echo Starting frontend server...
start cmd /k "cd /d "%~dp0frontend\vue-project" && npm run dev"

echo Restaurant Booking System started successfully!
echo Backend API running on http://localhost:3000
echo Frontend running on http://localhost:5173

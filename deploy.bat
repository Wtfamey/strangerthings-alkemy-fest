@echo off
echo 🚀 Stranger Things Alkemy Fest - Deployment Script
echo.

echo 📋 Step 1: Initialize Git Repository
echo.
"C:\Program Files\Git\bin\git.exe" init
"C:\Program Files\Git\bin\git.exe" add .
"C:\Program Files\Git\bin\git.exe" commit -m "Initial commit: Stranger Things Alkemy Fest website"

echo.
echo 📋 Step 2: Add Remote Repository
echo.
echo Replace YOUR_USERNAME with your GitHub username in the next command
echo.
set /p username="Enter your GitHub username: "
"C:\Program Files\Git\bin\git.exe" remote add origin https://github.com/%username%/strangerthings-alkemy-fest.git

echo.
echo 📋 Step 3: Push to GitHub
echo.
"C:\Program Files\Git\bin\git.exe" push -u origin main

echo.
echo 🎉 Next Steps:
echo 1. Go to https://vercel.com and deploy your frontend
echo 2. Go to https://render.com and deploy your backend
echo 3. Check the GITHUB_DEPLOYMENT_GUIDE.md for detailed instructions
echo.
pause

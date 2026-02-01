# 🚀 Stranger Things Alkemy Fest - PowerShell Deployment Script

Write-Host "🚀 Stranger Things Alkemy Fest - Deployment Script" -ForegroundColor Green
Write-Host ""

Write-Host "📋 Step 1: Initialize Git Repository" -ForegroundColor Yellow
Write-Host ""

& "C:\Program Files\Git\bin\git.exe" init
& "C:\Program Files\Git\bin\git.exe" add .
& "C:\Program Files\Git\bin\git.exe" commit -m "Initial commit: Stranger Things Alkemy Fest website"

Write-Host ""
Write-Host "📋 Step 2: Add Remote Repository" -ForegroundColor Yellow
Write-Host ""
Write-Host "Replace YOUR_USERNAME with your GitHub username in the next command"
Write-Host ""

$username = Read-Host "Enter your GitHub username"
& "C:\Program Files\Git\bin\git.exe" remote add origin "https://github.com/$username/strangerthings-alkemy-fest.git"

Write-Host ""
Write-Host "📋 Step 3: Push to GitHub" -ForegroundColor Yellow
Write-Host ""

& "C:\Program Files\Git\bin\git.exe" push -u origin main

Write-Host ""
Write-Host "🎉 Next Steps:" -ForegroundColor Green
Write-Host "1. Go to https://vercel.com and deploy your frontend"
Write-Host "2. Go to https://render.com and deploy your backend"
Write-Host "3. Check the GITHUB_DEPLOYMENT_GUIDE.md for detailed instructions"
Write-Host ""

Read-Host "Press Enter to exit"

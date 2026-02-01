# 🚀 GitHub Deployment Guide for Stranger Things Alkemy Fest

## 📋 **Step 1: Create GitHub Repository**

### **Option A: Create on GitHub Website**
1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Repository name: `strangerthings-alkemy-fest`
4. Description: "Stranger Things themed college fest website"
5. Make it **Public** (free hosting requires public repo)
6. Don't initialize with README
7. Click "Create repository"

### **Option B: Use GitHub CLI**
```bash
# Install GitHub CLI if not installed
winget install GitHub.cli

# Login to GitHub
gh auth login

# Create repository
gh repo create strangerthings-alkemy-fest --public --description "Stranger Things themed college fest website"
```

## 📁 **Step 2: Prepare Your Local Repository**

### **Initialize Git (if not already done)**
```bash
cd c:\xampp\htdocs\strangerthings2026

# Initialize git repository
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Stranger Things Alkemy Fest website"

# Add remote repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/strangerthings-alkemy-fest.git

# Push to GitHub
git push -u origin main
```

## 🎯 **Step 3: Deploy Frontend to Vercel**

### **Method A: Vercel CLI (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from your project directory
cd c:\xampp\htdocs\strangerthings2026
vercel

# Follow the prompts to link to your Vercel account
```

### **Method B: Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. "Import Git Repository"
4. Select your `strangerthings-alkemy-fest` repository
5. Click "Deploy"

## 🗄️ **Step 4: Deploy Backend to Render**

### **Prepare Backend for Production**
Create a `render.yaml` file in your project root:

```yaml
services:
  - type: web
    name: strangerthings-api
    env: php
    plan: free
    buildCommand: "echo 'No build needed'"
    startCommand: "php -S 0.0.0.0:10000 -t public/"
    healthCheckPath: /api/events/read.php
    envVars:
      - key: DATABASE_URL
        value: postgresql://user:password@host:5432/dbname
```

### **Deploy to Render**
1. Go to [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Select `strangerthings-alkemy-fest`
5. Configure:
   - **Runtime**: PHP
   - **Build Command**: `echo 'No build needed'`
   - **Start Command**: `php -S 0.0.0.0:10000 -t public/`
   - **Plan**: Free

## 🔧 **Step 5: Update Configuration for Production**

### **Update API URLs in Frontend**
Create `.env.production` file:
```env
VITE_API_URL=https://your-app-name.onrender.com
```

### **Update vite.config.ts**
```typescript
export default defineConfig({
  // ... existing config
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:80',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
```

### **Update API Configuration**
In your PHP files, update database connection:
```php
// public/api/config/database.php
private $host = getenv('DB_HOST') ?: 'localhost';
private $db_name = getenv('DB_NAME') ?: 'stranger_things_db';
private $username = getenv('DB_USER') ?: 'root';
private $password = getenv('DB_PASSWORD') ?: '';
```

## 🗄️ **Step 6: Database Setup**

### **Option A: Use Render PostgreSQL (Recommended)**
1. In Render dashboard, create a new PostgreSQL database
2. Get connection string
3. Add to environment variables

### **Option B: Use Supabase (Free Alternative)**
1. Go to [supabase.com](https://supabase.com)
2. Create free account
3. Create new project
4. Get connection details
5. Update your database configuration

## 📱 **Step 7: Test Everything**

### **Frontend Testing**
1. Visit your Vercel URL
2. Check all pages work
3. Test API calls in browser console

### **Backend Testing**
1. Visit your Render URL + `/api/events/read.php`
2. Should see JSON response
3. Test event creation/management

## 🔗 **Step 8: Custom Domain (Optional)**

### **Vercel Domain**
1. In Vercel dashboard, go to "Domains"
2. Add your custom domain
3. Update DNS records

### **Render Domain**
1. In Render dashboard, go to "Custom Domains"
2. Add your custom domain
3. Update DNS records

## 📝 **Commands Summary**

### **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### **Deploy Frontend**
```bash
vercel --prod
```

### **Deploy Backend**
```bash
# Automatic deployment on git push to main branch
```

## 🎯 **Free Hosting Limits**

### **Vercel (Free)**
- ✅ 100GB bandwidth/month
- ✅ Custom domains
- ✅ SSL certificates
- ✅ Serverless functions
- ❌ No server-side rendering limits

### **Render (Free)**
- ✅ 750 hours/month
- ✅ PostgreSQL database
- ✅ SSL certificates
- ✅ Custom domains
- ❌ Sleeps after 15 minutes inactivity

### **GitHub Pages (Alternative)**
- ✅ Unlimited bandwidth
- ✅ Custom domains
- ✅ SSL certificates
- ❌ No backend hosting

## 🚀 **Quick Start Commands**

```bash
# 1. Initialize and push to GitHub
git init
git add .
git commit -m "Initial commit: Stranger Things Alkemy Fest"
git remote add origin https://github.com/YOUR_USERNAME/strangerthings-alkemy-fest.git
git push -u origin main

# 2. Deploy frontend
vercel

# 3. Deploy backend (via Render dashboard)
# 4. Update environment variables
# 5. Test everything works!
```

## 📞 **Support**

If you need help with any step:
1. Check the platform documentation
2. Look at error logs
3. Ask in community forums
4. I can help troubleshoot specific issues

**🎉 Your Stranger Things Alkemy Fest will be live for free!**

# 🚀 Cooper Gaming Services - Quick Deployment Guide (Vercel)

## Overview

This guide will help you deploy the CGS website to Vercel in **under 10 minutes**.

---

## ✅ Pre-Deployment Checklist

Before you begin, ensure you have:

- [ ] Git repository (GitHub, GitLab, or Bitbucket)
- [ ] Code pushed to repository
- [ ] Gmail app password generated
- [ ] 9 images ready (or placeholder images)

---

## 🎯 Quick Start: Deploy to Vercel

### Option 1: One-Click Deploy (Easiest)

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login** with GitHub/GitLab
3. **Import Project**:
   - Click "Add New..." → "Project"
   - Select your repository
   - Click "Import"
4. **Configure** (auto-detected from `vercel.json`):
   - Framework: Vite
   - Root Directory: `./`
   - Build Command: `cd frontend && npm run build`
   - Output Directory: `frontend/dist`
5. **Add Environment Variables**:
   ```
   NODE_ENV=production
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-char-app-password
   ADMIN_EMAIL=admin@coopergamingservices.com
   FRONTEND_URL=https://cgs-web.vercel.app
   ```
6. **Click "Deploy"**
7. **Wait 2-3 minutes** ⏱️
8. **Done!** 🎉 Your site is live at `https://cgs-web-xxx.vercel.app`

---

## 📧 Getting Gmail App Password

1. Enable 2FA: https://myaccount.google.com/security
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Select "Mail" → "Other (Custom name)"
4. Name it "CGS Website"
5. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)
6. Use this as `SMTP_PASS` in environment variables

---

## 🧪 Testing Your Deployment

### 1. Test Frontend
Visit: `https://your-url.vercel.app`
- ✅ All sections load
- ✅ Images display
- ✅ Navigation works
- ✅ Mobile responsive

### 2. Test Backend API
```bash
# Health check
curl https://your-url.vercel.app/api/health

# Expected response:
# {"status":"OK","message":"Server is running"}
```

### 3. Test Contact Form
1. Fill out form on website
2. Submit
3. Check admin email (should receive notification)
4. Check customer email (should receive confirmation)

---

## 🌐 Adding Custom Domain

1. **In Vercel Dashboard**:
   - Project → Settings → Domains
   - Click "Add"
   - Enter: `coopergamingservices.com`
   - Click "Add"

2. **Configure DNS** (at your domain registrar):
   - Add CNAME record:
     - Type: `CNAME`
     - Name: `www`
     - Value: `cname.vercel-dns.com`
   - Add A record:
     - Type: `A`
     - Name: `@`
     - Value: `76.76.21.21`

3. **Wait for DNS** (24-48 hours)

4. **Update Environment Variables**:
   - Change `FRONTEND_URL` to `https://coopergamingservices.com`
   - Redeploy

5. **HTTPS Auto-Enabled** ✅

---

## 🖼️ Adding Images

Place 9 images in these folders:

```
frontend/public/images/
├── hero/
│   ├── hero-1.png (1920×1080px)
│   ├── hero-2.png (1920×1080px)
│   └── hero-3.png (1920×1080px)
├── services/
│   ├── service-sales.png (800×600px)
│   ├── service-repairs.png (800×600px)
│   ├── service-maintenance.png (800×600px)
│   └── service-consultation.png (800×600px)
├── about/
│   └── team.png (1200×800px)
└── commitment/
    └── certification.png (800×600px)
```

**Optimize**: Use https://tinypng.com to compress (<200KB each)

After adding images:
1. Commit to Git: `git add . && git commit -m "Add images"`
2. Push: `git push`
3. Vercel auto-deploys! 🚀

---

## 🐛 Troubleshooting

### Build Fails
- Check logs in Vercel Dashboard
- Test locally: `cd frontend && npm run build`
- Ensure all dependencies in `package.json`

### Emails Not Sending
- Verify Gmail app password (16 characters, no spaces)
- Check Vercel Function logs
- Ensure environment variables are set correctly

### Images Not Loading
- Check file names match exactly (case-sensitive)
- Ensure images committed to Git
- Hard refresh browser (Ctrl+Shift+R)

### CORS Errors
- Update `FRONTEND_URL` to match actual domain
- Redeploy after changing environment variables

---

## 📊 Post-Deployment Tasks

### Day 1
1. ✅ Submit sitemap to Google Search Console
2. ✅ Claim Google Business Profile
3. ✅ Install Google Analytics
4. ✅ Test all functionality

### Week 1
5. ✅ Monitor analytics
6. ✅ Get first customer reviews
7. ✅ Social media setup

---

## 💰 Cost

**Vercel Free Tier:**
- 100GB bandwidth/month
- Unlimited deployments
- Perfect for this website ✅

**Upgrade if needed:**
- Pro: $20/month (1TB bandwidth)

---

## 📞 Support

**Developer**: Athena Networks  
**Website**: https://athenanetworks.com.au  
**Documentation**: See README.md for full details

---

## 🎯 Summary

✅ **Total Time**: 5-10 minutes  
✅ **Cost**: Free  
✅ **Automatic HTTPS**: Yes  
✅ **Auto-Deploy**: Yes (on Git push)  
✅ **Scalable**: Yes  
✅ **Production-Ready**: Yes  

**Your website is now live and ready to generate leads!** 🎉

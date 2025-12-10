# Cooper Gaming Services - Deployment Guide

**Version:** 2.4.0  
**Last Updated:** December 10, 2025  
**Prepared by:** Kenny (Athena Networks)

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Overview](#project-overview)
3. [Environment Setup](#environment-setup)
4. [Build Process](#build-process)
5. [Deployment Steps](#deployment-steps)
6. [SSL/HTTPS Configuration](#sslhttps-configuration)
7. [DNS Configuration](#dns-configuration)
8. [Post-Deployment Checklist](#post-deployment-checklist)
9. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

Before deploying, ensure you have:

- [ ] Node.js v18+ installed on the server
- [ ] npm or yarn package manager
- [ ] Git installed
- [ ] Access to the hosting server (SSH)
- [ ] Domain DNS access
- [ ] SSL certificate (Let's Encrypt recommended)

---

## 📁 Project Overview

### Tech Stack
- **Frontend:** React 18 + TypeScript + Vite
- **Backend:** Node.js + Express (Serverless Functions)
- **Styling:** SCSS + Bootstrap 5
- **Deployment:** Static files + Serverless API

### Repository
- **GitLab:** `https://gitlab.athenanetworks.com.au/athenanetworks/cgs-web.git`
- **GitHub:** `https://github.com/Oyedokun-Kehinde/cgs-web.git`

### Directory Structure
```
cgs-web/
├── frontend/           # React frontend application
│   ├── src/           # Source code
│   ├── public/        # Static assets (images, favicon)
│   └── dist/          # Built files (after npm run build)
├── backend/           # Express backend (serverless functions)
│   ├── api/           # API endpoints
│   ├── controllers/   # Business logic
│   └── utils/         # Email service, validators
└── vercel.json        # Vercel configuration (reference)
```

---

## ⚙️ Environment Setup

### 1. Clone the Repository

```bash
git clone https://gitlab.athenanetworks.com.au/athenanetworks/cgs-web.git
cd cgs-web
```

### 2. Install Dependencies

```bash
# Frontend dependencies
cd frontend
npm install

# Backend dependencies
cd ../backend
npm install
```

### 3. Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# SMTP Configuration (for contact form emails)
SMTP_HOST=smtp.your-email-provider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@domain.com
SMTP_PASS=your-email-password

# Admin email (receives contact form submissions)
ADMIN_EMAIL=info@coopergamingservices.com

# Frontend URL (for email templates)
FRONTEND_URL=https://coopergamingservices.com
```

**Important:** Replace the placeholder values with actual credentials.

---

## 🏗️ Build Process

### Build Frontend

```bash
cd frontend
npm run build
```

This creates a `dist/` folder containing:
- `index.html` - Main HTML file
- `assets/` - JavaScript, CSS, and other assets
- `images/` - All images (copied from public/)

### Build Output Location
```
frontend/dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
└── images/
    ├── hero/
    ├── logo/
    ├── services/
    └── ...
```

---

## 🚀 Deployment Steps

### Option A: Traditional Server Deployment (Apache/Nginx)

#### Step 1: Upload Built Files

Upload the contents of `frontend/dist/` to your web server's document root:

```bash
# Using SCP
scp -r frontend/dist/* user@server:/var/www/coopergamingservices.com/public_html/

# Or using rsync
rsync -avz frontend/dist/ user@server:/var/www/coopergamingservices.com/public_html/
```

#### Step 2: Configure Nginx

Create/edit `/etc/nginx/sites-available/coopergamingservices.com`:

```nginx
server {
    listen 80;
    server_name coopergamingservices.com www.coopergamingservices.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name coopergamingservices.com www.coopergamingservices.com;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/coopergamingservices.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/coopergamingservices.com/privkey.pem;
    
    root /var/www/coopergamingservices.com/public_html;
    index index.html;
    
    # Handle React Router (SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API Proxy (if running backend separately)
    location /api/ {
        proxy_pass http://localhost:3001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/coopergamingservices.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### Step 3: Configure Apache (Alternative)

If using Apache, create `.htaccess` in the document root:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/css application/json application/javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
</IfModule>
```

#### Step 4: Deploy Backend API

For the contact form to work, deploy the backend:

```bash
cd backend
npm install --production

# Using PM2 (recommended)
npm install -g pm2
pm2 start server.js --name "cgs-api"
pm2 save
pm2 startup
```

Create `backend/server.js` if not exists:

```javascript
import express from 'express';
import cors from 'cors';
import { submitContactForm } from './controllers/contactController.js';
import { validateContactForm } from './utils/validator.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Contact form endpoint
app.post('/api/contact', validateContactForm, submitContactForm);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
});
```

---

### Option B: Vercel Deployment (Current Setup)

The project is already configured for Vercel. Simply:

1. Connect the GitHub/GitLab repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to `main` branch

---

## 🔒 SSL/HTTPS Configuration

### Using Let's Encrypt (Certbot)

```bash
# Install Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d coopergamingservices.com -d www.coopergamingservices.com

# Auto-renewal (already set up by Certbot)
sudo certbot renew --dry-run
```

### Troubleshooting Let's Encrypt

If you encounter issues:

1. **Port 80 must be accessible** - Ensure firewall allows HTTP
2. **DNS must be pointing to server** - Verify with `dig coopergamingservices.com`
3. **Rate limits** - Wait if you've requested too many certificates

```bash
# Check certificate status
sudo certbot certificates

# Force renewal
sudo certbot renew --force-renewal
```

---

## 🌐 DNS Configuration

Point the domain to the hosting server:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | [Server IP Address] | 3600 |
| A | www | [Server IP Address] | 3600 |
| CNAME | www | coopergamingservices.com | 3600 |

**Note:** DNS propagation can take up to 48 hours.

---

## ✅ Post-Deployment Checklist

After deployment, verify:

- [ ] **Homepage loads** - Visit https://coopergamingservices.com
- [ ] **SSL working** - Check for padlock icon in browser
- [ ] **All images loading** - Check hero slider, services, about section
- [ ] **Navigation works** - Test all menu links
- [ ] **Contact form works** - Submit a test inquiry
- [ ] **Email received** - Check admin email for test submission
- [ ] **Mobile responsive** - Test on mobile device
- [ ] **Page speed** - Run Google PageSpeed Insights

### Test Contact Form

1. Fill out the contact form with test data
2. Submit the form
3. Verify:
   - Green success modal appears
   - Admin receives notification email
   - Customer receives confirmation email

---

## 🔧 Troubleshooting

### Common Issues

#### 1. "Page Not Found" on refresh
**Cause:** Server not configured for SPA routing  
**Fix:** Add the Nginx/Apache configuration above

#### 2. Contact form returns 500 error
**Cause:** Backend not running or SMTP misconfigured  
**Fix:** 
```bash
# Check if backend is running
pm2 status

# Check logs
pm2 logs cgs-api

# Verify environment variables
cat backend/.env
```

#### 3. Images not loading
**Cause:** Images not uploaded or wrong paths  
**Fix:** Ensure `images/` folder is in the document root

#### 4. SSL certificate errors
**Cause:** Certificate not installed or expired  
**Fix:**
```bash
sudo certbot renew
sudo systemctl reload nginx
```

#### 5. CORS errors
**Cause:** Backend not allowing frontend origin  
**Fix:** Ensure CORS is configured in backend

---

## 📞 Support

For deployment assistance, contact:

- **Kenny (Developer):** kenny@athenanetworks.com.au
- **Josh (Hosting):** josh@athenanetworks.com.au

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.4.0 | Dec 10, 2025 | New client images, deployment documentation |
| 2.3.2 | Nov 25, 2025 | Contact form fixes, validation improvements |
| 2.2.0 | Nov 25, 2025 | Email templates, SEO updates |
| 2.0.0 | Nov 2025 | Initial production release |

---

**Merry Christmas! 🎄**

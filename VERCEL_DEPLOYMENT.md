# 🚀 Vercel Deployment Guide for MentorMe

## **Frontend Deployment on Vercel**

### **1. Prerequisites**
- ✅ Backend deployed on Render.com: `https://mentorme-wa2h.onrender.com`
- ✅ GitHub repository with frontend code
- ✅ Vercel account

### **2. Deploy to Vercel**

#### **Option A: Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Set the following configuration:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

#### **Option B: Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend directory
cd frontend

# Deploy
vercel
```

### **3. Environment Variables**

In Vercel Dashboard → Project Settings → Environment Variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://mentorme-wa2h.onrender.com` | Production, Preview, Development |

### **4. Build Settings**

**Build Command:**
```bash
npm run build
```

**Output Directory:**
```
.next
```

**Install Command:**
```bash
npm install
```

### **5. Domain Configuration**

1. Go to Project Settings → Domains
2. Add your custom domain (optional)
3. Vercel will provide a default URL like: `https://your-project.vercel.app`

### **6. Testing Deployment**

#### **Test API Connection:**
1. Visit your Vercel deployment URL
2. Navigate to `/test-api.html` (if you upload it)
3. Test the health endpoint
4. Test the chat functionality

#### **Expected Behavior:**
- ✅ Frontend loads successfully
- ✅ API calls go to Render.com backend
- ✅ Chat functionality works
- ✅ File uploads work (if configured)

### **7. Troubleshooting**

#### **CORS Issues:**
If you see CORS errors, ensure your backend has proper CORS configuration:

```javascript
// In your backend server.js
app.use(cors({
  origin: ['https://your-vercel-app.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

#### **API Connection Issues:**
1. Check if Render.com backend is running
2. Verify the API URL in environment variables
3. Test the backend URL directly: `https://mentorme-wa2h.onrender.com/api/health`

#### **Build Failures:**
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify TypeScript compilation

### **8. Continuous Deployment**

Vercel automatically deploys when you push to:
- `main` branch → Production
- Other branches → Preview deployments

### **9. Monitoring**

- **Vercel Analytics**: Built-in performance monitoring
- **Function Logs**: Check API route logs
- **Real-time Metrics**: Monitor traffic and performance

### **10. Security Considerations**

- ✅ Environment variables are encrypted
- ✅ API keys are not exposed to client
- ✅ HTTPS is enabled by default
- ✅ Automatic security headers

---

## **🎯 Quick Deployment Checklist**

- [ ] Backend deployed on Render.com
- [ ] Frontend code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables set
- [ ] Build successful
- [ ] API connection tested
- [ ] Custom domain configured (optional)
- [ ] Monitoring enabled

---

**Need Help?** Check the [Vercel Documentation](https://vercel.com/docs) or [Render.com Documentation](https://render.com/docs). 
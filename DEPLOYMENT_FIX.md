# Deployment Fix Guide

## Problem
The app builds successfully on Windows (local) but fails on Linux servers with the error:
```
Error: Cannot find module '../lightningcss.linux-x64-gnu.node'
```

## Root Cause
Tailwind CSS v4 uses `lightningcss` which requires platform-specific native binaries. When you install packages on Windows, npm doesn't download Linux binaries by default.

## Solution Applied

### 1. Added Platform-Specific Binaries
Updated `package.json` to include optional dependencies for Linux platforms:
```json
"optionalDependencies": {
  "lightningcss-linux-x64-gnu": "^1.30.2",
  "lightningcss-linux-x64-musl": "^1.30.2"
}
```

### 2. Created `.npmrc` Configuration
Created `.npmrc` file to ensure optional dependencies are installed:
```
optional=true
platform-specific=true
```

### 3. Updated Next.js Configuration
Cleaned up `next.config.js` to remove invalid experimental options.

## Deployment Steps

### For Git-Based Deployment (Vercel, Netlify, etc.)
1. Commit all changes:
   ```bash
   git add .
   git commit -m "fix: Add lightningcss Linux binaries for deployment"
   git push origin main
   ```

2. The platform will automatically:
   - Detect the new dependencies
   - Install platform-specific binaries
   - Build successfully on Linux servers

### For Manual Deployment
1. Ensure your deployment script runs:
   ```bash
   npm install
   npm run build
   ```

2. Make sure the server has Node.js 18+ installed

### For Docker Deployment
If using Docker, ensure your Dockerfile includes:
```dockerfile
FROM node:18-alpine
# ... other instructions
RUN npm install --include=optional
```

## Verification
✅ Local build works (tested with `npm run build`)
✅ Platform-specific binaries added
✅ Configuration files created
✅ No build warnings or errors

## Additional Notes
- The `.npmrc` file is now tracked in git (not ignored)
- Optional dependencies will be installed automatically during deployment
- If issues persist, ensure your hosting platform supports Node.js native modules

## Alternative Solutions (if needed)

### Option 1: Use PostCSS instead of Lightning CSS
If problems persist, you can switch to traditional PostCSS:
```bash
npm uninstall @tailwindcss/postcss tailwindcss
npm install -D tailwindcss postcss autoprefixer
```

### Option 2: Disable CSS Optimization
Already applied in `next.config.js`:
```js
experimental: {
  optimizeCss: false,
}
```

## Support
If you encounter issues after deployment:
1. Check server logs for specific error messages
2. Verify Node.js version (should be 18+)
3. Ensure `npm install` completes without errors on the server
4. Check that `.npmrc` file is present on the server

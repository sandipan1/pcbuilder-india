# Deployment Guide for PCBuilder India

## Quick Deploy to Vercel

### Option 1: Deploy with GitHub (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: PCBuilder India Vite app"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy with Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Vite project
   - Click "Deploy" - that's it!

### Option 2: Deploy with Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

## Manual Setup Steps

If you need to deploy manually:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder** to any static hosting service (Netlify, GitHub Pages, etc.)

## Environment Configuration

The app currently uses an empty API key for Gemini AI. To enable AI features:

1. Get a Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to your environment variables in Vercel:
   - Go to Project Settings → Environment Variables
   - Add `VITE_GEMINI_API_KEY` with your API key
3. Update the code to use `import.meta.env.VITE_GEMINI_API_KEY`

## Project Structure

```
pcbuilderindia/
├── dist/                 # Build output (auto-generated)
├── public/
│   ├── vite.svg         # Favicon
├── src/
│   ├── App.tsx          # Main application
│   ├── main.tsx         # Entry point
│   ├── index.css        # Global styles
│   └── types.ts         # TypeScript definitions
├── vercel.json          # Vercel configuration
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies and scripts
```

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

Your PCBuilder India app is now ready for deployment! 🚀
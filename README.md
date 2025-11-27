# PCBuilder India

A React-based PC building tool with realistic Indian pricing and AI assistance powered by Google Gemini.

## Features

- 🔧 **Component Compatibility Checking** - Automatic socket, memory type, and power supply validation
- 💰 **Realistic Indian Pricing** - Up-to-date prices from the Indian market
- 🤖 **AI Integration** - Get build recommendations and analysis using Google Gemini
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- ⚡ **Visual PC Builder** - See your build come together with an interactive 3D-style case visualization

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd pcbuilderindia
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Build for Production

```bash
npm run build
```

## Deploy to Vercel

The easiest way to deploy this app is using [Vercel](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Vercel will automatically detect this as a Vite project and deploy it

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Google Gemini API** for AI features

## Project Structure

```
pcbuilderindia/
├── public/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles with Tailwind
├── index.html           # HTML template
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── vercel.json          # Vercel deployment configuration
```

## License

MIT
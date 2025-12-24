# 🥖 Tezos Baking Portal

<div align="center">

![Tezos Baking Portal](public/tezos-baking-portal-logo.svg)

**Your comprehensive resource for Tezos baking — from setup to optimization, governance to rewards.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[Live Demo](https://baking-portal.vercel.app) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Content Management](#content-management)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Caching System](#caching-system)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## 🎯 About

Tezos Baking Portal is a modern, production-ready web application designed to help Tezos bakers and delegators make informed decisions. Built with performance and user experience in mind, it provides real-time blockchain data with intelligent caching to minimize API calls and deliver instant results.

### Why This Project?

- **🚀 Performance First**: Intelligent multi-level caching system (in-memory + localStorage)
- **📊 Real-time Data**: Live network statistics and baker performance metrics
- **🎨 Beautiful UI**: Modern, responsive design with dark mode support
- **🔧 Production Ready**: Well-documented, type-safe, and optimized code
- **🌍 Open Source**: Community-driven and welcoming contributions

---

## ✨ Features

### 🔥 Core Features

- **Real-time Network Statistics**
  - Current staking APY
  - Active bakers count
  - Total staked XTZ
  - Current cycle information
  - Block time metrics

- **Baker Analytics**
  - Detailed baker profiles
  - Performance metrics (blocks, endorsements)
  - Reward history tracking
  - Staking efficiency visualization
  - Frozen balance breakdown

- **Intelligent Caching**
  - Multi-level cache (memory + localStorage)
  - Stale-while-revalidate pattern
  - Automatic cache invalidation
  - Performance monitoring

- **Educational Content**
  - Baking process explained
  - Setup guides for new bakers
  - Hardware requirements
  - Key management best practices
  - Governance information

### 🎨 UI/UX Features

- Fully responsive design (mobile, tablet, desktop)
- Dark mode by default
- Smooth scrolling navigation
- Loading states and error handling
- Accessible components (Radix UI)

---

## 🛠️ Tech Stack

### Core Technologies

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and better DX
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI components
- **[Lucide Icons](https://lucide.dev/)** - Beautiful icon library

### Key Libraries

- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management
- **[clsx](https://github.com/lukeed/clsx)** - Conditional classnames
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Merge Tailwind classes

### Data Source

- **[TzKT API](https://api.tzkt.io/)** - Tezos blockchain indexer (no API key required)

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have installed:

- **Node.js** ≥ 18.17 ([Download](https://nodejs.org/))
- **pnpm** (recommended) or npm
  ```bash
  npm install -g pnpm
  ```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AurelienMonteillet/tezos-baking-portal.git
   cd tezos-baking-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

### Troubleshooting

**Issue: Unstyled pages (Times New Roman font, no layout)**

This means Tailwind CSS is not compiling correctly.

```bash
# Solution 1: Check Node version
node -v  # Should be ≥ 18.17

# Solution 2: Clear Next.js cache
rm -rf .next
pnpm dev

# Solution 3: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Content Management

All website content is separated from the code for easy maintenance. You can find all text, links, and image references in the `content/` directory.

To update any text or link:
1. Navigate to the `content/` folder.
2. Open the relevant file (e.g., `hero.ts`, `about.ts`).
3. Modify the text strings, href values, or image paths.
4. Save the file - the changes will reflect automatically.

**Files:**
- `header.ts`: Navigation menu and logo.
- `hero.ts`: Hero section text, buttons, and images.
- `network-stats.ts`: Statistics section text.
- `about.ts`: "What is Baking?" section.
- `get-started.ts`: "How to get started" guide cards.
- `governance.ts`: Governance process steps.
- `tools.ts`: Useful tools cards.
- `documentation.ts`: Documentation links.
- `cta.ts`: Call to action section.
- `footer.ts`: Footer text and copyright.

---

## 🚀 Deployment

This project is deployed on **AWS S3 + CloudFront**.

### Quick Deploy

```bash
# Staging
npm run deploy:staging

# Production
npm run deploy:prod
```

### Prerequisites

1. **AWS CLI installed** - [Install guide](https://aws.amazon.com/cli/)
2. **AWS Credentials configured** - Set environment variables or run `aws configure`

```bash
export AWS_ACCESS_KEY_ID="AKIAZVZBOPN5T77KQ3C3"
export AWS_SECRET_ACCESS_KEY="<your-secret-key>"
export AWS_DEFAULT_REGION="us-east-1"
```

### Detailed Instructions

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide.

**Production URL**: https://bakers.tezos.com  
**Staging URL**: https://next-bakers-tezos-com.tzstaging.com

---

## 📂 Project Structure

```
tezos-baking-portal/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles + Tailwind v4 config
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── robots.ts                # Robots.txt generator
│   └── sitemap.ts               # Sitemap generator
├── components/                   # React components
│   ├── sections/                # Page sections
│   │   ├── header.tsx
│   │   ├── hero-section.tsx
│   │   ├── network-stats-section.tsx
│   │   ├── about-section.tsx
│   │   ├── get-started-section.tsx
│   │   ├── governance-section.tsx
│   │   ├── tools-section.tsx
│   │   ├── documentation-section.tsx
│   │   ├── cta-section.tsx
│   │   ├── footer.tsx
│   │   └── scroll-to-top-button.tsx
│   ├── ui/                      # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── tabs.tsx
│   │   └── badge.tsx
│   ├── theme-provider.tsx       # Theme context provider
│   ├── feedback-button.tsx      # Feedback form button
│   └── deferred-posthog.tsx     # Analytics (deferred loading)
├── content/                      # Text content, links, and image references
│   ├── about.ts
│   ├── cta.ts
│   ├── documentation.ts
│   ├── footer.ts
│   ├── get-started.ts
│   ├── governance.ts
│   ├── header.ts
│   ├── hero.ts
│   ├── network-stats.ts
│   └── tools.ts
├── hooks/                        # Custom React hooks
│   └── use-tzkt-data-cached.ts  # Data fetching hooks with cache
├── lib/                          # Utilities and API clients
│   ├── cache-manager.ts         # Intelligent caching system
│   ├── tzkt-api.ts              # Type definitions & helpers
│   ├── tzkt-api-cached.ts       # Cached API wrapper
│   └── utils.ts                 # Utility functions
├── public/                       # Static assets
│   ├── images/                  # Gradient backgrounds (WebP)
│   ├── fonts/                   # Custom fonts (GT Eesti Display)
│   ├── tezos-baking-portal-logo.svg  # Complete logo (logo + text)
│   ├── tezos-logomark.svg       # Logo mark only
│   └── tezos-*-illustration.webp # Optimized illustrations (WebP)
├── scripts/                      # Build and deployment scripts
│   ├── optimize-images.js       # Image optimization script
│   ├── optimize-jpg-images.js   # JPG to WebP conversion
│   ├── deploy-s3.sh             # AWS S3 deployment
│   └── test-links.js            # Link validation
├── next.config.mjs              # Next.js configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

---

## 🔥 Caching System

One of the key features of this project is the intelligent caching system that significantly improves performance.

### Architecture

```
User Request → Cache Manager → TzKT API
                    ↓
              In-Memory Cache
                    ↓
              localStorage (optional)
```

### Caching Strategies

| Data Type | TTL | localStorage | Stale-while-revalidate |
|-----------|-----|--------------|------------------------|
| Network Stats | 5 min | ✅ | ✅ |
| Bakers List | 10 min | ✅ | ✅ |
| Baker Details | 2 min | ❌ | ✅ |
| Rewards History | 30 min | ✅ | ❌ |
| Global Stats | 1 min | ❌ | ✅ |

### Features

- **Multi-level caching**: In-memory (fast) + localStorage (persistent)
- **Stale-while-revalidate**: Show cached data instantly, update in background
- **Automatic invalidation**: Smart cache expiration and refresh
- **Hit rate tracking**: Monitor cache performance

### Example Usage

```typescript
import { useNetworkStats } from '@/hooks/use-tzkt-data-cached'

function MyComponent() {
  const { stats, loading, error, refresh } = useNetworkStats()
  
  // Data is automatically cached and refreshed
  // Manual refresh available with refresh()
}
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- 🐛 Report bugs
- 💡 Suggest features
- 🔧 Submit pull requests

Fork the repo, make your changes, and open a PR!

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[TzKT](https://tzkt.io/)** - For providing the excellent Tezos blockchain indexer API
- **[Tezos](https://tezos.com/)** - For the amazing blockchain technology
- **[Shadcn UI](https://ui.shadcn.com/)** - For the beautiful component library
- **[Vercel](https://vercel.com/)** - For the best Next.js deployment platform

---

## 📞 Contact & Links

- **Issues**: [Report a bug](../../issues)
- **Discussions**: [Join the conversation](../../discussions)
- **Website**: [tezos.com](https://tezos.com)

---

<div align="center">

**⭐ If you find this project useful, please consider giving it a star! ⭐**


</div>

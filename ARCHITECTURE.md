# 🏗️ Project Architecture - Tezos Baking Portal

This document describes the architecture and organization of the Tezos Baking Portal project.

## 📂 Folder Structure

```
tezos-baking-portal/
├── app/                          # Next.js App Router (Pages and Layouts)
│   ├── globals.css              # Global styles + Tailwind configuration
│   ├── layout.tsx               # Root layout (fonts, theme, providers)
│   ├── page.tsx                 # Home page (orchestrates sections)
│   └── statistics/              # Baker statistics page
│       ├── page.tsx             # Main statistics page
│       └── loading.tsx          # Loading state
│
├── components/                   # Reusable React components
│   ├── sections/                # Home page sections
│   │   ├── header.tsx           # Sticky navigation with mobile menu
│   │   ├── hero-section.tsx     # Main hero section
│   │   ├── network-stats-section.tsx  # Real-time network statistics
│   │   ├── about-section.tsx    # "What is Baking" section
│   │   ├── get-started-section.tsx    # Getting started guide
│   │   ├── governance-section.tsx     # Governance section
│   │   ├── tools-section.tsx     # Useful tools
│   │   ├── documentation-section.tsx # Documentation resources
│   │   ├── cta-section.tsx      # Call-to-action
│   │   ├── footer.tsx           # Site footer
│   │   ├── scroll-to-top-button.tsx  # Scroll to top button
│   │   └── index.ts             # Centralized exports
│   │
│   ├── ui/                      # Base UI components (shadcn/ui style)
│   │   ├── button.tsx           # Reusable button
│   │   ├── card.tsx             # Card container
│   │   ├── input.tsx            # Input field
│   │   ├── tabs.tsx             # Tabs
│   │   └── badge.tsx            # Badge/label
│   │
│   ├── feedback-button.tsx      # Floating feedback button with modal
│   └── theme-provider.tsx        # Theme provider (dark mode)
│
├── content/                      # Content separated from code (facilitates maintenance)
│   ├── header.ts                # Navigation and logo
│   ├── hero.ts                  # Hero section
│   ├── network-stats.ts         # Network statistics
│   ├── about.ts                 # "About" section
│   ├── get-started.ts           # Getting started guide
│   ├── governance.ts            # Governance
│   ├── tools.ts                 # Tools
│   ├── documentation.ts        # Documentation
│   ├── cta.ts                  # Call-to-action
│   └── footer.ts                # Footer
│
├── hooks/                        # Custom React hooks
│   └── use-tzkt-data-cached.ts  # Hooks for fetching TzKT data with cache
│
├── lib/                          # Utilities and API clients
│   ├── cache-manager.ts         # Intelligent caching system
│   ├── tzkt-api.ts              # TypeScript types and utility functions
│   ├── tzkt-api-cached.ts       # API wrapper with cache
│   └── utils.ts                 # Utility functions (cn, etc.)
│
├── public/                       # Static assets
│   ├── images/                  # Images and illustrations
│   ├── fonts/                   # Custom fonts
│   └── *.png, *.svg, *.jpg      # Other assets
│
├── scripts/                      # Local scripts (not committed)
│   └── test-links.js            # External link testing script
│
├── next.config.mjs              # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── postcss.config.js            # PostCSS configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # Main documentation
```

## 🎯 Organization by Responsibility

### 1. **Pages (`app/`)**
- **Role**: Next.js pages and layouts
- **Principle**: Pages orchestrate components, don't contain complex business logic
- **Key files**:
  - `layout.tsx`: Root layout with global providers
  - `page.tsx`: Home page (130 lines, uses sections)
  - `statistics/page.tsx`: Dedicated baker statistics page

### 2. **Components (`components/`)**

#### **Sections (`components/sections/`)**
- **Role**: Reusable home page sections
- **Principle**: Each section is isolated and reusable
- **Benefits**:
  - Maintainability: modify one section without impacting others
  - Testability: each section can be tested independently
  - Reusability: sections can be used elsewhere if needed

#### **UI (`components/ui/`)**
- **Role**: Base UI components (shadcn/ui style)
- **Principle**: Primitive components reusable everywhere
- **Examples**: Button, Card, Input, Tabs, Badge

#### **Special Components**
- `feedback-button.tsx`: Floating button with Asana modal
- `theme-provider.tsx`: Theme provider for dark mode

### 3. **Content (`content/`)**
- **Role**: Separation of content and code
- **Principle**: All texts, links, and image references are in TypeScript files
- **Benefits**:
  - Easy modification without touching code
  - Translation facilitated
  - Centralized maintenance

### 4. **Hooks (`hooks/`)**
- **Role**: Reusable data fetching logic
- **Principle**: Encapsulates fetch logic with cache, loading, errors
- **Available hooks**:
  - `useNetworkStats()`: Network statistics
  - `useBakersStats()`: Aggregated baker statistics
  - `useBakerDetails()`: Specific baker details
  - `useActiveBakers()`: List of active bakers
  - `useDataPreloader()`: Critical data preloading

### 5. **Library (`lib/`)**
- **Role**: Utilities and API clients
- **Files**:
  - `cache-manager.ts`: Multi-level cache manager
  - `tzkt-api.ts`: Types and utility functions
  - `tzkt-api-cached.ts`: API wrapper with automatic cache
  - `utils.ts`: Utility functions (cn, etc.)

### 6. **Assets (`public/`)**
- **Role**: Static files served directly
- **Organization**:
  - `images/`: Images and illustrations
  - `fonts/`: Custom fonts (GT Eesti Display)

## 🔄 Data Flow

```
User Action
    ↓
React Component (page.tsx or statistics/page.tsx)
    ↓
Custom Hook (useNetworkStats, useBakersStats, etc.)
    ↓
Cached API Wrapper (tzkt-api-cached.ts)
    ↓
Cache Manager (cache-manager.ts)
    ↓
TzKT API (https://api.tzkt.io)
    ↓
Response → Cache → Component State → UI Update
```

## 🎨 Styling System

### Tailwind CSS v4
- Configuration in `app/globals.css` with `@import "tailwindcss"`
- Custom CSS variables for brand colors
- Dark mode by default

### Color Structure
```css
--brand-blue-600    /* Primary color */
--brand-lilac-600   /* Secondary color */
--black-900, --black-800, --black-600  /* Backgrounds */
--white-900, --white-800, --white-700, --white-600  /* Text */
```

## 🔌 Extension Points

### Adding a New Section
1. Create `components/sections/my-new-section.tsx`
2. Export from `components/sections/index.ts`
3. Import and use in `app/page.tsx`

### Adding a New Data Hook
1. Create the function in `lib/tzkt-api-cached.ts`
2. Create the hook in `hooks/use-tzkt-data-cached.ts`
3. Use in components

### Modifying Content
1. Open the corresponding file in `content/`
2. Modify texts/links
3. Changes are automatically reflected

## 📊 Code Metrics

- **Home page**: 130 lines (vs 814 before refactoring)
- **Section components**: 11 modular components
- **Custom hooks**: 6 data hooks
- **Caching system**: Multi-level (memory + localStorage)

## 🚀 Performance

- **First Load JS**: ~122 kB (shared across all pages)
- **Code splitting**: Automatic with Next.js
- **Caching**: Intelligent with TTL adapted by data type
- **Images**: Optimized with Next.js Image (priority for LCP)

## 🔒 Security

- No API keys required (TzKT public API)
- Client-side data validation
- Automatic sanitization with React

## 📝 Naming Conventions

- **Components**: PascalCase (`NetworkStatsSection.tsx`)
- **Hooks**: camelCase with `use` prefix (`useNetworkStats`)
- **Content files**: kebab-case (`network-stats.ts`)
- **Utilities**: camelCase (`formatXTZ`, `cn`)

## 🧪 Testing

- **Link testing script**: `npm run test:links` (scripts/test-links.js)
- **Linter**: ESLint configured
- **Type checking**: TypeScript strict mode

## 🔄 Development Workflow

1. **Modify content**: Edit files in `content/`
2. **Add a section**: Create in `components/sections/`
3. **Add a feature**: Create hook in `hooks/` if data needed
4. **Test links**: `npm run test:links`
5. **Build**: `npm run build` to verify
6. **Commit**: Follow commit conventions

## 📚 Main Dependencies

### Core
- **Next.js 14**: React framework with App Router
- **TypeScript 5**: Type safety
- **Tailwind CSS v4**: Styling

### UI
- **Radix UI**: Accessible headless components
- **Lucide React**: Icons
- **next-themes**: Theme management

### Data
- **TzKT API**: Blockchain data source (no npm dependency)

## 🎯 Architecture Principles

1. **Separation of concerns**: Each folder has a clear role
2. **Reusability**: Reusable components and hooks
3. **Maintainability**: Organized and documented code
4. **Performance**: Intelligent caching and code splitting
5. **Accessibility**: Radix UI components
6. **Type Safety**: TypeScript strict everywhere

---

**Last updated**: After refactoring (refactor branch → main)

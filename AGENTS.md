# Reflecter LABS - AI Agent Guide

## Project Overview

Reflecter LABS is a multi-chain Web3 development laboratory website built with Next.js. The company specializes in Starknet and EVM-compatible blockchain ecosystems, offering services like smart contract development, dApp creation, audits, and consulting.

- **Website**: https://reflecterlabs.xyz
- **Tech Stack**: Next.js 14, React 18, TypeScript, CSS Modules
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Static export ready for any static hosting

## Project Structure

```
/workspaces/reflecter_labs/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with SEO metadata
│   ├── page.tsx                 # Home page (landing)
│   ├── globals.css              # Global styles & CSS variables
│   └── start-project/           # Project application form page
│       ├── page.tsx             # Multi-step wizard component
│       └── StartProject.module.css
├── components/                   # React components
│   ├── Header.tsx               # Navigation header with scroll effects
│   ├── Hero.tsx                 # Landing hero with parallax & animations
│   ├── WhatWeDo.tsx             # Services section with reveal animations
│   ├── Blockchains.tsx          # Blockchain ecosystems with carousel
│   ├── Values.tsx               # Company values with flip cards
│   ├── Achievements.tsx         # Showcase/awards with counter animations
│   ├── Roadmap.tsx              # Journey timeline with scroll
│   ├── ContactForm.tsx          # Contact form with Supabase
│   ├── Footer.tsx               # Footer with social links
│   ├── KanizsaTriangle.tsx      # CSS animation component
│   ├── AnimatedBackground.tsx   # Particle network background
│   ├── AnimatedText.tsx         # Typewriter & word animations
│   ├── AnimatedSection.tsx      # Scroll reveal wrapper
│   └── StaggeredContainer.tsx   # Staggered children animations
├── lib/                         # Utilities & configurations
│   ├── supabase.ts              # Supabase client & types
│   └── animations.ts            # Custom animation hooks
├── public/                      # Static assets
│   ├── logoreflecter.png        # Company logo
│   ├── blockchain-hero.png      # Hero image
│   └── images/                  # Additional images
│       └── networking/          # Blockchain logos
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
└── next.config.js               # Next.js configuration
```

## Technology Stack

### Core Framework
- **Next.js 14.2.3** - React framework with App Router
- **React 18.3.1** - UI library
- **TypeScript 5.4.5** - Type safety (strict mode enabled)

### Styling
- **CSS Modules** - Component-scoped styling
- **CSS Variables** - Theming system (black & white palette)
- **Inter font** - Google Fonts (loaded via link tag)

### Animation System
- **Custom Hooks** - `useInView`, `useCountUp`, `useParallax`, `useMouseParallax`
- **CSS Animations** - Keyframes for fade, float, pulse, gradient shifts
- **Intersection Observer** - Scroll-triggered animations
- **Hardware Acceleration** - `transform` and `opacity` for 60fps animations

### External Services
- **Supabase** - Backend as a Service for form submissions
  - `contact_leads` table - Stores contact form submissions
  - `project_applications` table - Stores project applications
- **@typebot.io/react** - Chat widget integration

### 3D/Animation
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber
- **three** - 3D library

## Build and Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Environment Variables

Create `.env.local` in the project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_anon_key
```

**Note**: All Supabase environment variables use `NEXT_PUBLIC_` prefix as they are accessed from client-side components.

## Code Style Guidelines

### TypeScript
- Strict mode is enabled in `tsconfig.json`
- All components should have explicit return types when possible
- Use interfaces for data structures (see `ContactLead` in `lib/supabase.ts`)

### Component Structure
- Functional components with default exports
- Props defined inline or via interfaces
- CSS Modules imported as `styles` object
- Animation hooks imported from `@/lib/animations`

Example:
```typescript
import styles from './Component.module.css'
import { useInView } from '@/lib/animations'

export default function Component() {
  const { ref, isInView } = useInView()
  return (
    <div 
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      ...
    </div>
  )
}
```

### CSS Conventions
- CSS variables defined in `globals.css` under `:root`
- Color palette: Black & White themed
- Animation keyframes defined globally in `globals.css`
- Component-specific styles in `.module.css` files
- Use `cubic-bezier(0.34, 1.56, 0.64, 1)` for bouncy transitions
- Use `cubic-bezier(0.4, 0, 0.2, 1)` for smooth transitions

### Key CSS Variables
```css
--primary: #000000
--secondary: #ffffff
--text: #000000
--text-secondary: #404040
--bg: #ffffff
--bg-secondary: #fafafa
--gradient-primary: linear-gradient(135deg, #000000 0%, #333333 100%)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
```

## Animation System

### Custom Hooks (`lib/animations.ts`)

#### useInView
Detects when element enters viewport for scroll-triggered animations.
```typescript
const { ref, isInView } = useInView()
```

#### useCountUp
Animated counter with easing.
```typescript
const { count, ref } = useCountUp(targetValue, duration)
```

#### useMouseParallax
Tracks mouse position for parallax effects.
```typescript
const { x, y } = useMouseParallax(intensity)
```

### Animation Components

#### AnimatedSection
Wrapper for scroll-triggered fade-in animations.
```typescript
<AnimatedSection animation="fadeInUp" delay={200}>
  <Content />
</AnimatedSection>
```

#### AnimatedBackground
Canvas-based particle network background.
```typescript
<AnimatedBackground />
```

#### AnimatedText
Typewriter and word-by-word reveal animations.
```typescript
<AnimatedText text="Hello World" speed={50} />
<AnimatedWords text="Hello World" staggerDelay={100} />
```

### Animation Best Practices
1. Use `transform` and `opacity` for 60fps animations
2. Add `will-change: transform` on frequently animated elements
3. Use `prefers-reduced-motion` media query for accessibility
4. Implement stagger delays for lists (100-150ms between items)
5. Use hardware-accelerated easing functions

## Database Schema

### contact_leads Table
```typescript
interface ContactLead {
  id?: string
  name: string
  email: string
  company?: string
  service_interest: 'Smart Contracts & Project Development' | 'Research & Innovation'
  message: string
  action?: boolean  // false = Call, true = WhatsApp
  created_at?: string
  updated_at?: string
}
```

### project_applications Table
Multi-step form stores comprehensive project data including:
- Contact information (name, email, telegram, wallet)
- Project details (name, URLs, phase, blockchain)
- Technical stack (language, framework, patterns)
- Security info (audit status, test coverage)
- Business model (revenue, token status)
- Team & funding details

## Key Components

### Header (`components/Header.tsx`)
- Sticky header with hide/show on scroll
- Glass morphism effect when scrolled
- Smooth scroll navigation
- Mobile hamburger menu with animations

### Hero (`components/Hero.tsx`)
- Mouse parallax floating orbs
- Animated gradient text
- Staggered entrance animations
- Floating badges with icons
- Scroll indicator animation

### WhatWeDo (`components/WhatWeDo.tsx`)
- Scroll-triggered reveal animations
- Hover effects on cards
- Icon animations on hover
- Focus areas grid with stagger

### Values (`components/Values.tsx`)
- 3D flip cards on hover
- Number badges with icons
- Gradient backgrounds
- Staggered entrance

### Achievements (`components/Achievements.tsx`)
- Animated counter for total grants
- Card hover effects with shine
- Status badges with colors
- Scroll-triggered reveals

### Roadmap (`components/Roadmap.tsx`)
- Horizontal scroll timeline
- Progress line animation
- Status indicators (completed/upcoming)
- Navigation buttons

### ContactForm (`components/ContactForm.tsx`)
- Form validation
- Multi-step success states
- Loading spinners
- Social action buttons

### AnimatedBackground (`components/AnimatedBackground.tsx`)
- Canvas-based particle system
- Mouse interaction
- Connection lines between particles
- Performance optimized (30fps)

## Testing Considerations

- No test framework is currently configured
- Forms include client-side validation
- Error handling implemented for Supabase operations
- RLS (Row Level Security) errors are caught and displayed

## Security Notes

1. **Supabase RLS**: The database tables should have Row Level Security policies configured to allow public inserts for contact forms and project applications.

2. **Environment Variables**: All Supabase keys are client-side safe (anon keys only). No service_role keys should be exposed.

3. **Form Validation**: Both client-side and server-side validation should be considered for production.

## Deployment

The project is configured for static export via Next.js. Ensure environment variables are set in your deployment platform:

1. Vercel/Netlify: Add environment variables in dashboard
2. Self-hosted: Set in `.env.local` or environment

## Troubleshooting

### Common Issues

**Form submissions failing**: Check Supabase RLS policies. The error handler in ContactForm will show specific error codes like `42501` for permission issues.

**Build errors**: Ensure TypeScript strict mode compliance. Check for missing imports or type errors.

**3D animations not rendering**: Verify @react-three/fiber and three.js versions are compatible.

**Animation performance**: If animations are choppy, check for:
- Too many simultaneous animations
- Heavy components re-rendering
- Missing `will-change` properties
- Large particle counts in AnimatedBackground

## External Links

- **Booking Calendar**: https://calendar.app.google/wArBbQyT49pLD45y8
- **WhatsApp**: https://wa.me/5491173661972
- **Twitter/X**: https://twitter.com/reflecterlabs
- **Telegram**: https://t.me/reflecterlabs
- **LinkedIn**: https://linkedin.com/company/reflecterlabslat
- **Instagram**: https://www.instagram.com/reflectlabs.lat/

## SEO Configuration

The site includes comprehensive SEO:
- Meta tags for keywords related to Web3, blockchain, Starknet
- OpenGraph images (expects `/og-image.png` in public)
- Sitemap at `/sitemap.xml`
- Robots.txt allowing all crawlers
- Canonical URLs pointing to https://reflecterlabs.xyz

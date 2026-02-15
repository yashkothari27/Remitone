# Remitone - International Money Transfer Platform

A premium, modern fintech website for Remitone, built with Next.js, TypeScript, and Tailwind CSS. Send money globally with competitive rates and lightning-fast transfers.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)

## ✨ Features

- **14 Fully Responsive Pages** - Home, Pricing, Countries, How It Works, Mobile App, About, Contact, FAQ, Partners, AIMSFX, and legal pages
- **Premium Design** - Modern fintech-style UI with glassmorphism, gradients, and smooth animations
- **Interactive Components** - Currency converter, contact form with validation, FAQ accordion
- **SEO Optimized** - Proper metadata, OG tags, and semantic HTML for all pages
- **Mobile First** - Fully responsive design tested on all device sizes
- **Type Safe** - Built with TypeScript for better developer experience
- **Performance** - Optimized with Next.js 16 and Turbopack for fast load times

## 📑 Pages

### Core Pages
- **Home** (`/`) - Hero section, trust indicators, features, corridors preview, how it works, app promotion, CTA
- **Pricing** (`/pricing`) - Fee structure, example transfers, live FX calculator placeholder
- **Countries** (`/countries`) - 24+ transfer corridors with flags, search functionality
- **How It Works** (`/how-it-works`) - 4-step visual journey (Sign Up → Verify → Send → Receive)
- **Mobile App** (`/mobile-app`) - App features, screenshots, download links placeholder
- **About Us** (`/about`) - Company mission, values, statistics
- **Contact** (`/contact`) - Contact form with Zod validation, contact information
- **FAQ** (`/faq`) - 12 common questions in accordion style

### Partnership Pages
- **Partners** (`/partners`) - Payout partners, BAAS providers, payment processors
- **AIMSFX** (`/aimsfx`) - Dedicated partner page with benefits and details

### Legal Pages
- **Privacy Policy** (`/privacy`) - GDPR/CCPA compliant privacy policy
- **Terms of Service** (`/terms`) - Comprehensive terms and conditions
- **Cookie Policy** (`/cookies`) - Cookie usage and management
- **Complaints Procedure** (`/complaints`) - 4-step complaint resolution process

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone https://github.com/remitone/website.git
   cd website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```bash
   NEXT_PUBLIC_REMITONE_PLATFORM_URL=https://app.remitone.com
   EMAIL_TO=support@remitone.com
   # Add other variables as needed
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Data Fetching**: SWR

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── about/             # About Us page
│   ├── aimsfx/            # AIMSFX partner page
│   ├── api/               # API routes
│   │   └── exchange-rates/# Exchange rate API
│   ├── complaints/        # Complaints procedure
│   ├── contact/           # Contact page
│   ├── cookies/           # Cookie policy
│   ├── countries/         # Supported countries
│   ├── faq/               # FAQ page
│   ├── how-it-works/      # How it works page
│   ├── mobile-app/        # Mobile app page
│   ├── partners/          # Partners page
│   ├── pricing/           # Pricing page
│   ├── privacy/           # Privacy policy
│   ├── terms/             # Terms of service
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── features/          # Feature components
│   │   ├── ContactForm.tsx
│   │   ├── CurrencyConverter.tsx
│   │   └── FAQItem.tsx
│   ├── home/              # Home page sections
│   │   ├── AppPromotion.tsx
│   │   ├── CorridorsPreview.tsx
│   │   ├── CTASection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HowItWorks.tsx
│   │   └── TrustIndicators.tsx
│   ├── layout/            # Layout components
│   │   ├── Footer.tsx
│   │   └── Header.tsx
│   └── ui/                # UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       └── Select.tsx
├── hooks/                 # Custom React hooks
│   └── useExchangeRate.ts
└── lib/                   # Utilities and constants
    ├── constants/
    │   └── countries.ts
    └── utils/
        ├── currency.ts
        └── utils.ts
```

## 🔧 Configuration

### Updating Remitone Platform URL

All CTA buttons currently redirect to a placeholder URL. Update it in:
1. Environment variable: `NEXT_PUBLIC_REMITONE_PLATFORM_URL` in `.env.local`
2. Or find and replace `https://app.remitone.com` throughout the codebase

### Contact Form Setup

The contact form requires email service integration. Options include:
- SendGrid
- Resend
- Postmark

Update `/src/app/api/contact/route.ts` with your email service API.

### CAPTCHA Integration

The contact form includes CAPTCHA placeholder. To enable:
1. Sign up for Google reCAPTCHA v3
2. Add keys to `.env.local`
3. Integrate reCAPTCHA in `ContactForm.tsx`

### FX Calculator API

The live FX calculator is currently a placeholder. To integrate:
1. Obtain Remitone API credentials
2. Update `/src/app/api/exchange-rates/route.ts`
3. Replace mock data with actual API calls

## 📱 Mobile App Links

Update app store links when available:
- Edit `/src/app/mobile-app/page.tsx`
- Replace placeholder buttons with actual App Store and Google Play URLs
- Add QR code generation for quick downloads

## 🎨 Customization

### Brand Colors

Update colors in `/src/app/globals.css`:
```css
--color-primary-600: #7C3AED;  /* Main brand color */
--color-accent-600: #0D9488;   /* Accent color */
```

### Typography

Fonts are configured in `/src/app/layout.tsx` using Next.js font optimization.

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for:
- Vercel (recommended)
- Netlify
- AWS S3 + CloudFront

Quick deploy to Vercel:
```bash
npm install -g vercel
vercel --prod
```

## 📊 Performance

Target metrics (Lighthouse):
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

## 🔒 Security

- All forms include validation
- CAPTCHA protection (when configured)
- Environment variables for sensitive data
- HTTPS enforcement in production
- Regular dependency updates

## 📝 TODO

- [ ] Integrate Remitone FX API for live calculator
- [ ] Set up contact form email service
- [ ] Add Google reCAPTCHA to contact form
- [ ] Add real mobile app screenshots
- [ ] Configure actual App Store/Google Play links
- [ ] Add Google Analytics/tracking
- [ ] Set up error monitoring (Sentry, etc.)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

Proprietary - Remitone © 2026

## 📧 Contact

For questions or support:
- Email: dev@remitone.com
- Website: https://remitone.com

---

**Built with ❤️ for Remitone**
# Remitone

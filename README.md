# Trastbank Homepage Frontend (Server-Driven UI)

An enterprise-grade frontend application for **Trastbank** built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **TailwindCSS**, driven by a **Server-Driven UI (SDUI)** backend architecture and multi-language support (`i18next`).

---

## 🚀 About the Project

The Trastbank homepage is dynamically rendered based on a JSON configuration payload received from the backend API. Every section of the page—including the Header navigation, Hero banner, Product Tabs, Promo Carousel, Deposit Calculator, Services, Instant Card, and Mobile App section—is configurable via Server-Driven UI models with built-in multi-language text structures (`{ "ru": "...", "uz": "...", "en": "..." }`).

### Key Features
- **Server-Driven UI (SDUI)**: Page structure and component content are dynamically driven by backend JSON endpoints.
- **Multi-Language Support**: Seamless localization across **Uzbek (uz)**, **Russian (ru)**, and **English (en)** using `i18next` and `react-i18next`.
- **Axios Request Interceptors**: Automatically injects active language codes into HTTP headers (`Accept-Language`) and query parameters (`?lang=...`) for server-side localization.
- **Graceful Fallback Mechanism**: Built-in mock configuration (`mock/homePageConfig.ts`) ensures the page renders seamlessly even when the API is offline during local development.
- **Environment Management**: Configurable environment settings for `development` and `production` modes via environment variables.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Localization**: [i18next](https://www.i18next.com/) & [react-i18next](https://react.i18next.com/)
- **Animations & Carousel**: [Framer Motion](https://www.framer.com/motion/) & [Swiper](https://swiperjs.com/)

---

## 📁 Project Structure

```text
.
├── api/
│   ├── client.ts              # Axios instance with request interceptors for language & headers
│   └── pageService.ts         # API service for fetching SDUI page configurations
├── app/
│   ├── globals.css            # Global Tailwind CSS styling
│   ├── layout.tsx             # Root layout component
│   └── page.tsx               # Main Home page component with SDUI hook integration
├── components/
│   ├── layout/
│   │   ├── Header.tsx         # Top navigation bar & language selector dropdown
│   │   └── Footer.tsx         # Main bank footer component
│   ├── CardProducts.tsx       # Product tabs & cards section
│   ├── DepositCalculator.tsx  # Dynamic deposit calculation tool
│   ├── GetMore.tsx            # Promo carousel section
│   ├── Hero.tsx               # Main hero promotion banner
│   ├── QuickTools.tsx         # Quick calculators and step guide
│   ├── Services.tsx           # Bank services & live currency exchange rates
│   └── Trastpay.tsx           # Instant card ordering & Mobile app promotion
├── hooks/
│   └── useHomePageConfig.ts   # Custom React hook for fetching and managing SDUI page state
├── i18n/
│   └── index.ts               # i18next library setup and language resources
├── mock/
│   └── homePageConfig.ts      # Default fallback SDUI configuration data
├── types/
│   └── pageConfig.ts          # TypeScript interfaces matching backend SDUI JSON schema
├── utils/
│   └── i18nHelper.ts          # Safe localization helper function (getLocalizedText)
├── .env.example               # Example environment variable template
├── .env                       # Environment variables (copied from .env.example)
├── next.config.ts             # Next.js configuration
├── package.json               # Dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory based on `.env.example`:

```bash
# Copy the example env file
cp .env.example .env
```

### Configuration Parameters:

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Base endpoint URL for the backend API | `http://localhost:4000/api` (Dev)<br>`https://api.trastbank.uz/v1` (Prod) |
| `NEXT_PUBLIC_ENV` | Application runtime environment mode | `development` \| `production` |

---

## 🚦 Getting Started

### Prerequisites
Make sure you have **Node.js 18.x** or higher and **npm** / **yarn** / **pnpm** installed.

### 1. Installation
Install project dependencies:

```bash
npm install
```

### 2. Development Mode
Run the local development server with Turbopack enabled:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Production Build
Build the optimized application bundle:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### 4. Code Linting
Run ESLint code quality check:

```bash
npm run lint
```

---

## 📡 API Integration & Endpoints

1. **`GET /api/content/published`** 📄:
   Fetches the published Server-Driven UI configuration payload for the homepage.
   `pageService.getHomePageConfig()` sends requests to this endpoint.

2. **`GET /api/media/:id`** 📷:
   Serves media assets (images, icons, flags). The helper function `getMediaUrl()` automatically resolves media IDs (e.g. `6a608a1256258aff479a0a6d`) into full URLs: `${NEXT_PUBLIC_API_URL}/media/:id`.

3. **Language Interceptor**:
   `api/client.ts` intercepts outgoing HTTP requests, automatically extracting the currently active language from `i18n.language` and appending:
   - Request Header: `Accept-Language: ru` (or `uz` / `en`)
   - Query Parameter: `?lang=ru`

4. **Localized Text Rendering**:
   Components retrieve localized strings using the safe helper function `getLocalizedText()`:
   ```typescript
   import { getLocalizedText } from "@/utils/i18nHelper";

   const title = getLocalizedText(config?.title, currentLang);
   ```

---

## 📜 License

Private project for **Trastbank**. All rights reserved.
# trastpayweb

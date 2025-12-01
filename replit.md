# Mastermind OS Dashboard

## Overview

Mastermind OS Dashboard is a centralized management platform for multiple AI-powered bots and automation systems. Built with a modern tech stack featuring React, Express, and PostgreSQL, it provides real-time monitoring, analytics, and control interfaces for various specialized AI assistants including educational bots, marketing automation, content discovery, image processing, and gamification systems.

The platform follows a modular architecture where each bot has its own dedicated dashboard with tailored features while sharing common UI components and infrastructure. The system emphasizes real-time data visualization, intuitive controls, and a polished glassmorphic design aesthetic.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server, configured to serve from `client/` directory and output to `dist/public`
- Wouter for lightweight client-side routing instead of React Router

**UI Component System**
- Shadcn/ui components with Radix UI primitives as the foundation
- Tailwind CSS v4 for styling with custom design tokens
- Custom theme system using CSS variables for colors, supporting dark mode
- Glassmorphic design pattern with backdrop blur, noise overlays, and animated gradient blobs
- Path aliases configured: `@/` maps to `client/src/`, `@shared/` to `shared/`, `@assets/` to `attached_assets/`

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management with configured defaults (no auto-refetch on window focus, infinite stale time)
- Custom hooks pattern for API interactions (`useExplainerApi.ts`)
- Polling intervals configured per query (5s for stats, 3s for bot status, 10s for health, 30s for analytics)

**Charts & Visualization**
- Recharts library for analytics graphs (LineChart, BarChart, AreaChart)
- Custom chart components integrated with the design system

**Design System Features**
- Animated backgrounds with "liquid blob" animations using CSS keyframes
- Noise texture overlay for cinematic effect
- Grid pattern backgrounds
- Custom scrollbar styling
- Animation utilities using Tailwind's animation system

### Backend Architecture

**Server Framework**
- Express.js running on Node.js with TypeScript
- HTTP server created explicitly (not just Express app) to support potential WebSocket upgrades
- Custom logging middleware with formatted timestamps
- JSON body parsing with raw body preservation for webhook verification
- Development mode uses `tsx` for hot-reload, production uses compiled CommonJS bundle

**API Design**
- RESTful endpoints under `/api` prefix
- Route registration pattern: `registerRoutes(httpServer, app)` in `server/routes.ts`
- Response logging includes duration tracking
- Error handling with try-catch blocks returning appropriate HTTP status codes

**Build & Deployment**
- Custom build script (`script/build.ts`) using esbuild for server bundling
- Selective dependency bundling (allowlist pattern) to reduce cold start times by minimizing file system calls
- Client built with Vite, server built with esbuild, both outputs to `dist/`
- Production mode serves static files from `dist/public` with SPA fallback

### Data Storage

**Database**
- PostgreSQL as the primary database (provisioned via Neon serverless)
- Drizzle ORM for type-safe database operations
- Schema-first approach with schema defined in `shared/schema.ts`

**Schema Design**
- **Users table**: Basic authentication (username, hashed password)
- **Sessions table**: Bot configuration (model, systemPrompt, temperature, active status)
- **Conversations table**: Chat sessions with users (userName, status, unreadCount, timestamps)
- **Messages table**: Individual messages (conversationId, sender, content, status, timestamp)
- **Logs table**: System events (sessionId, type, message, details, timestamp)

**Storage Layer**
- Abstract `IStorage` interface defining all data operations
- `DrizzleStorage` class implements the interface
- Exported `storage` singleton and `db` client for direct queries
- Helper methods for common queries (stats aggregation, recent messages, conversation counts)

**Database Configuration**
- Connection via `DATABASE_URL` environment variable (required)
- Migrations output to `./migrations` directory
- Drizzle Kit configured for PostgreSQL dialect

### External Dependencies

**Database & ORM**
- `@neondatabase/serverless` - Serverless PostgreSQL driver for Neon
- `drizzle-orm` - Type-safe ORM with PostgreSQL support
- `drizzle-zod` - Schema validation integration
- `connect-pg-simple` - PostgreSQL session store for Express sessions

**Authentication & Security**
- Session-based authentication architecture in place (sessions table exists)
- Express session middleware configured via `connect-pg-simple`

**UI Libraries**
- `@radix-ui/*` - Comprehensive set of unstyled, accessible UI primitives
- `tailwindcss` - Utility-first CSS framework
- `class-variance-authority` - Type-safe variant management for components
- `lucide-react` - Icon library
- `cmdk` - Command palette component
- `embla-carousel-react` - Carousel/slider component

**Form Management**
- `react-hook-form` - Form state management
- `@hookform/resolvers` - Schema validation resolvers
- `zod` - Schema validation library

**Data Visualization**
- `recharts` - Chart library for analytics displays

**Development Tools**
- `@replit/vite-plugin-runtime-error-modal` - Runtime error overlay
- `@replit/vite-plugin-cartographer` - Development navigation aid
- `@replit/vite-plugin-dev-banner` - Development environment indicator
- Custom `vite-plugin-meta-images` - Updates OpenGraph meta tags for Replit deployments

**Utility Libraries**
- `date-fns` - Date manipulation and formatting
- `nanoid` - Unique ID generation
- `clsx` & `tailwind-merge` - Class name utilities

**Build Tools**
- `vite` - Frontend build tool and dev server
- `esbuild` - Fast JavaScript bundler for server
- `tsx` - TypeScript execution for development
- `typescript` - Type system
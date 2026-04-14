# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Session**: express-session
- **File uploads**: multer (stored in `artifacts/api-server/uploads/`)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Sunny Concepts (react-vite, preview at /)
Premium digital agency website for Sunny Concepts.

**Features:**
- Cinematic intro (plays once per session via sessionStorage)
- Hero section with animated background slideshow (from uploaded images)
- CEO profile section with image placeholder
- Services section (Brand Identity, Media Production, Digital Marketing, Printing & Logistics)
- Portfolio gallery with category filter tabs (Art Cover, Birthday Flyers, Church Flyers, Logos & Brand Identity, Others, Stickers & Labelling, Wedding Cards)
- Contact/footer with social links
- Admin dashboard at /admin with:
  - Login (password: `sunnyadmin2024` or ADMIN_PASSWORD env var)
  - Portfolio image management (upload, edit, delete by category)
  - CEO profile management (upload image, edit bio/name/vision)
  - Background images control (upload, delete, toggle active)
  - Site content editing (hero text, services, contact info)

### API Server (Express 5, preview at /api)
Backend for all CMS functionality.

**Routes:**
- `POST /api/admin/login` — Admin auth
- `GET/PUT /api/ceo` — CEO profile
- `GET/POST/PUT/DELETE /api/portfolio` — Portfolio images
- `GET/POST/DELETE /api/backgrounds` — Background images
- `GET/PUT /api/content` — Site content
- `GET /api/uploads/:filename` — Serve uploaded files

**DB Tables:** portfolio_images, ceo_profile, background_images, site_content

## Database Schema

- `portfolio_images` — category, title, description, imageUrl, sortOrder
- `ceo_profile` — name, bio, vision, imageUrl
- `background_images` — imageUrl, label, isActive, animationSpeed, sortOrder
- `site_content` — heroHeading, heroSubtext, services (jsonb), contact fields, social fields

## Admin Access

- URL: `/admin`
- Default password: `sunnyadmin2024`
- Set `ADMIN_PASSWORD` env var to change it

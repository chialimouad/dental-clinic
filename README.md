# SmileCare Dental Clinic Website

A modern, production-ready dental clinic website built with Next.js 14, TypeScript, TailwindCSS, and Supabase.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e)

## Features

### Public Website
- **Homepage** - Hero section, services preview, team, testimonials
- **About** - Clinic story, mission, values, statistics
- **Services** - Full service catalog with pricing
- **Team** - Doctor profiles with credentials
- **Contact** - Contact form, office information, emergency CTA
- **Booking** - Multi-step appointment wizard with calendar
- **Blog** - Article listing and individual post pages
- **Legal** - Privacy policy and terms of service

### Admin Dashboard
- **Dashboard** - Overview stats, today's appointments, recent patients
- **Appointments** - Search, filter, manage all appointments
- **Services** - CRUD operations for dental services
- **Availability** - Weekly calendar slot management
- **Patients** - Patient records management
- **Blog** - Create and manage blog posts
- **Settings** - Clinic configuration

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dental-clinic.git
cd dental-clinic
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Supabase credentials to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

5. Run the database migration in your Supabase SQL editor:
```sql
-- Copy contents from supabase/migrations/001_initial_schema.sql
```

6. Start the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Public pages (home, about, services, etc.)
│   ├── admin/             # Admin dashboard pages
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/
│   ├── booking/           # Booking-specific components
│   ├── layout/            # Header, Footer
│   └── ui/                # Reusable UI components
├── lib/
│   ├── constants.ts       # Site configuration and data
│   ├── supabase/          # Supabase client setup
│   └── utils.ts           # Utility functions
├── types/
│   └── index.ts           # TypeScript interfaces
└── supabase/
    └── migrations/        # Database schema
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Set these in your Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Database Setup

1. Create a new Supabase project
2. Go to SQL Editor
3. Run the migration file: `supabase/migrations/001_initial_schema.sql`
4. This will create all tables, RLS policies, and seed data

## License

MIT

# Zen Finance

A modern, full-stack personal finance tracking application built with Next.js 15, TypeScript, and Tailwind CSS. Zen Finance helps you manage your finances with a clean, intuitive interface and powerful features.

## ✨ Features

- 📊 Interactive dashboards with Recharts
- 💰 Transaction tracking and management
- 🔐 Secure authentication with Clerk
- 📱 Responsive design for all devices
- 🎨 Dark/Light theme support
- 📈 Data visualization and analytics
- 📤 CSV import/export functionality
- 🔄 Real-time updates
- 🗃️ Database management with Drizzle ORM

## 🌐 Live Demo

Check out the live version of the app: [https://zen-finance.vercel.app/](https://zen-finance.vercel.app/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.18.0 or higher)
- npm or yarn
- A Clerk account for authentication
- NeonDB account (or another PostgreSQL database)

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/zen-finance.git
cd zen-finance
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```env
# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# Database
DATABASE_URL=your_database_url

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Set up the database

```bash
# Generate database schema
npm run db:generate

# Run migrations
npm run db:migrate

# (Optional) Seed the database with sample data
npm run db:seed
```

5. Start the development server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

## 🛠️ Tech Stack

### Frontend
- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [React Query](https://tanstack.com/query/latest) - Data fetching
- [Recharts](https://recharts.org/) - Data visualization
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Zustand](https://zustand-demo.pmnd.rs/) - State management

### Backend
- [Hono](https://hono.dev/) - API routing
- [Drizzle ORM](https://orm.drizzle.team/) - Database ORM
- [NeonDB](https://neon.tech/) - PostgreSQL database
- [Clerk](https://clerk.com/) - Authentication
- [Zod](https://zod.dev/) - Schema validation

## 📁 Project Structure

```
zen-finance/
├── src/
│   ├── app/          # Next.js pages and API routes
│   ├── components/   # Reusable UI components
│   ├── db/          # Database schema and configurations
│   ├── features/    # Feature-specific components and logic
│   ├── hooks/       # Custom React hooks
│   ├── lib/         # Utility functions and shared logic
│   ├── providers/   # React context providers
│   └── styles/      # Global styles and Tailwind configurations
├── public/          # Static assets
├── scripts/        # Database and utility scripts
└── drizzle/        # Database migrations
```

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database schema
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Drizzle Studio

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

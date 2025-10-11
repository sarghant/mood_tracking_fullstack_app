# 🌟 Mood Tracking App

A full-stack web application built with Next.js that helps users track their daily moods and visualize emotional patterns over time. Discover insights about your well-being and grow through self-awareness.

![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.16.3-teal?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-blue?logo=tailwindcss)

## ✨ Features

### 🎯 Core Functionality

- **Daily Mood Logging**: Track your emotional state with 5 distinct mood types
- **Visual Mood Selection**: Interactive emoji-based mood picker with beautiful animations
- **Personal Insights**: Get uplifting messages and personalized greetings based on your current mood
- **Mood History**: View your emotional journey through interactive charts and visualizations
- **One Entry Per Day**: Ensures consistent daily tracking with unique date constraints

### 🔐 Authentication & Security

- **OAuth Integration**: Secure sign-in with GitHub and Google
- **Session Management**: Persistent user sessions with NextAuth.js
- **Protected Routes**: Middleware-based route protection for authenticated users
- **Privacy-Focused**: Your mood data is private and secure

### 🎨 User Experience

- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Animated UI**: Smooth GSAP animations and floating emojis
- **Accessibility**: Built with accessibility best practices
- **Real-time Feedback**: Toast notifications for user actions

### 📊 Data Visualization

- **Interactive Charts**: Line and bar charts powered by Recharts
- **Mood Trends**: Visualize your emotional patterns over time
- **Color-Coded Insights**: Each mood type has distinctive colors and styling
- **Historical Data**: Track your progress and identify patterns

## 🏗️ Technology Stack

### Frontend

- **Next.js 15.5.3** - React framework with App Router
- **React 19** - User interface library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Animation library
- **Recharts** - Chart visualization library
- **Lucide React** - Beautiful icon set
- **Next Themes** - Theme switching functionality

### Backend

- **Next.js API Routes** - Server-side API endpoints
- **NextAuth.js 5** - Authentication solution
- **Prisma ORM** - Database toolkit and query builder
- **PostgreSQL** - Primary database

### Development & Testing

- **Jest** - Testing framework
- **Testing Library** - React component testing utilities
- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- GitHub OAuth App (for authentication)
- Google OAuth App (for authentication)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sarghant/mood_tracking_fullstack_app.git
   cd mood_tracking_fullstack_app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/mood_tracker"

   # NextAuth.js
   NEXTAUTH_SECRET="your-nextauth-secret"

   # GitHub OAuth
   AUTH_GITHUB_ID="your-github-client-id"
   AUTH_GITHUB_SECRET="your-github-client-secret"

   # Google OAuth
   AUTH_GOOGLE_ID="your-google-client-id"
   AUTH_GOOGLE_SECRET="your-google-client-secret"
   ```

4. **Set up the database**

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode

## 🗄️ Database Schema

### User Model

- Stores user authentication data
- Links to OAuth providers (GitHub, Google)
- Manages user sessions and mood entries

### Mood Model

- Tracks daily mood entries per user
- Five mood types: `ANGRY`, `SAD`, `NEUTRAL`, `OPTIMISTIC`, `ECSTATIC`
- Optional mood quotes for additional context
- Unique constraint ensures one entry per user per day

### Mood Types

Each mood includes:

- **Emoji representation** with custom SVG icons
- **Color theming** for consistent visual identity
- **Personalized messages** for user encouragement
- **Chart visualization** with distinctive styling

## 🎨 Mood Types

| Mood           | Emoji | Description                  | Message                                               |
| -------------- | ----- | ---------------------------- | ----------------------------------------------------- |
| **Angry**      | 😠    | Feeling frustrated or upset  | "Take a Pause - Breathe deeply. You can handle this." |
| **Sad**        | 😢    | Feeling down or melancholy   | "This Too Shall Pass - Tomorrow brings new hope."     |
| **Neutral**    | 😐    | Balanced emotional state     | "Steady as You Go - Balance is your strength."        |
| **Optimistic** | 😊    | Feeling hopeful and positive | "Keep Shining - Your positivity is contagious!"       |
| **Ecstatic**   | 🤩    | Extremely happy and excited  | "You're Amazing - Celebrate this beautiful moment!"   |

## 🧪 Testing

The application includes comprehensive tests for:

- React components (Theme switcher, Daily log, etc.)
- Utility functions (Date utilities, mood calculations)
- API endpoints and data operations

Run tests with:

```bash
npm test
```

## 📁 Project Structure

```
src/
├── actions/           # Server actions for data operations
├── app/              # Next.js App Router pages and layouts
│   ├── components/   # Shared UI components
│   ├── moods/        # Mood tracking pages and components
│   └── api/          # API routes
├── db/               # Database configuration
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and helpers
└── ui/               # Reusable UI components

prisma/
├── schema.prisma     # Database schema definition
└── migrations/       # Database migration files

__tests__/            # Test files organized by feature
```

## 🔧 Configuration

### Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Secret for NextAuth.js sessions
- `AUTH_GITHUB_ID` & `AUTH_GITHUB_SECRET` - GitHub OAuth credentials
- `AUTH_GOOGLE_ID` & `AUTH_GOOGLE_SECRET` - Google OAuth credentials

### OAuth Setup

1. **GitHub**: Create an OAuth App in your GitHub Developer Settings
2. **Google**: Set up OAuth 2.0 credentials in Google Cloud Console
3. Configure callback URLs to match your application domain

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Prisma Team** - For the excellent ORM and database toolkit
- **NextAuth.js** - For secure and easy authentication
- **Tailwind CSS** - For the utility-first CSS framework
- **GSAP** - For beautiful animations
- **Recharts** - For interactive data visualizations

---

**Built with ❤️ for mental health awareness and personal growth**

_Start your journey to self-awareness today!_

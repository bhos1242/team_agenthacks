# 🚀 Hackathon Starter Template

A blazing-fast Next.js 16 starter template optimized for hackathons. Ship fast, win big!

## ⚡ What's Inside

### 🎨 **Pre-built Dashboard**
- ✅ Full sidebar layout with navigation
- ✅ Stats cards with trends and icons
- ✅ Interactive charts (Bar, Line, Pie, Area)
- ✅ Data tables with sorting, filtering, pagination
- ✅ Example pages (Users, Settings, Analytics)

### ✨ **Premium Input System**
A unified form input system located at `components/AppInputFields/InputField.tsx`. Just one import for everything!
- **Rich Text Editor**: Notion-style editor with slash commands, AI auto-completion support, and markdown shortcuts.
- **Smart Inputs**:
  - `InputPassword`: Built-in strength meter and visibility toggle.
  - `InputOTP`: Auto-focus and auto-submit functionality.
  - `InputDate`: Smart presets (Yesterday, Last Week) + manual typing.
  - `ModernImageInput`: Drag & drop, preview, and **built-in cropping**.
  - `InputPhone`: International phone number formatting.
- **AI Integration**: AI-powered text generation blocks ready to connect to your LLM.

### 🔐 **Authentication Ready**
- **Multi-Provider Auth**: Email/Password, Google OAuth, GitHub OAuth
- **OTP Email Verification**: 6-digit OTP with 10-minute expiry
- **Password Reset**: Secure token-based forgot password flow
- **Pre-built Pages**: Login, Signup, OTP Verification, Forgot Password, Reset Password
- **Form Validation**: Zod schemas with password complexity rules (8+ chars, uppercase, number, special char)
- **Rate Limiting**: 60s OTP resend cooldown, 3 forgot-password attempts/hour
- **Avatar Upload**: S3 integration with server-side upload
- **Auto-verification**: OAuth users automatically verified

### 🧩 **Reusable Components**
| Component | Description | Usage |
|-----------|-------------|-------|
| `StatsCard` | KPI cards with icons and trends | Dashboard metrics |
| `DataTable` | Tables with @tanstack/react-table | User lists, bookings |
| `StatusBadge` | Colored status indicators | Order status, user status |
| `EmptyState` | No-data placeholders with CTAs | Empty lists |
| `SearchFilter` | Search + filter dropdowns | Data filtering |
| `Charts` | Bar, Line, Pie, Area charts | Analytics |

### 🎯 **Pre-installed shadcn/ui**
Button, Card, Input, Label, Dialog, Form, Textarea, Select, Badge, Avatar, Separator, Dropdown, Skeleton, Sonner, Table, Tabs, Sheet, Progress, Switch, Slider

### 🔐 **Auth Ready**
- Auth.js v5 with Google & GitHub providers
- Session management with NextAuth
- Protected routes ready

### 🗄️ **Database**
- Prisma ORM with PostgreSQL
- User, Account, Session models pre-configured
- Prisma Accelerate ready

### 🌙 **Theme Support**
- Dark mode with next-themes
- Theme toggle component
- Customizable color schemes

---

## 📦 Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Set up environment
cp .env.example .env
# Edit .env with your credentials

# 3. Generate Prisma client
pnpm prisma generate

# 4. Push database schema
pnpm prisma db push

# 5. Start dev server
pnpm dev
```

---

## 🏗️ Project Structure

```
├── app/
│   ├── (auth)/               # Auth pages (sign-in, sign-up)
│   ├── dashboard/            # Dashboard routes
│   │   ├── layout.tsx        # Dashboard sidebar layout
│   │   ├── page.tsx          # Dashboard home
│   │   ├── users/            # Users management
│   │   ├── settings/         # Settings page
│   │   └── analytics/        # Analytics (add your own)
│   ├── api/auth/             # Auth API routes
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Landing page
│   ├── loading.tsx           # Global loading
│   ├── error.tsx             # Error boundary
│   └── not-found.tsx         # 404 page
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── charts.tsx            # Chart components (recharts)
│   ├── data-table.tsx        # Generic data table
│   ├── stats-card.tsx        # KPI card component
│   ├── status-badge.tsx      # Status indicators
│   ├── empty-state.tsx       # No-data placeholder
│   ├── search-filter.tsx     # Search with filters
│   ├── dashboard-sidebar.tsx # Dashboard navigation
│   ├── navbar.tsx            # Main navbar
│   ├── footer.tsx            # Footer
│   ├── theme-provider.tsx    # Theme context
│   ├── theme-toggle.tsx      # Dark mode toggle
│   └── providers.tsx         # Auth provider
├── lib/
│   ├── auth.ts               # Auth.js config
│   ├── prisma.ts             # Prisma client
│   └── utils.ts              # Utilities
├── prisma/
│   └── schema.prisma         # Database schema
└── .env.example              # Environment template
```

---

## 🎨 Component Examples

### Stats Card
```tsx
<StatsCard
  title="Total Users"
  value="2,543"
  icon={Users}
  trend="+12%"
  trendUp={true}
/>
```

### Bar Chart
```tsx
<BarChart
  data={monthlyData}
  dataKey="sales"
  xAxisKey="month"
  barColor="#8884d8"
/>
```

### Data Table
```tsx
const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
];

<DataTable columns={columns} data={users} />
```

### Status Badge
```tsx
<StatusBadge status="confirmed" />
<StatusBadge status="pending" />
<StatusBadge status="cancelled" />
```

### Unified Input Field
```tsx
import InputField from "@/components/AppInputFields/InputField";

// Text Input
<InputField name="email" label="Email" type="email" />

// Rich Text Editor with AI
<InputField 
  name="content" 
  label="Blog Post" 
  type="editor" 
  generationPrompt="Write a blog post about..." 
/>

// Image Upload with Cropping
<InputField 
  name="avatar" 
  label="Profile Picture" 
  type="modern-image" 
/>
```

---

## 🏆 Perfect For Hackathons

This template includes everything for common hackathon categories:

| Category | Ready-to-use |
|----------|--------------|
| **Sports Booking** | Dashboard, user management, booking tables, calendar |
| **Travel Planning** | User profiles, itinerary builder, charts, multi-user |
| **Rental System** | Product tables, booking flow, pricing, availability |
| **SaaS Apps** | Auth, payments ready, admin panel, analytics |
| **E-commerce** | Product tables, order management, user dashboard |

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI**: shadcn/ui (new-york style)
- **Auth**: Auth.js v5 (NextAuth)
- **Database**: Prisma ORM + PostgreSQL
- **Tables**: @tanstack/react-table
- **Charts**: Recharts
- **Forms**: react-hook-form + Zod
- **Icons**: Lucide React
- **Theme**: next-themes

---

## 📚 Useful Commands

```bash
# Add shadcn components
npx shadcn@latest add [component-name]

# Prisma commands
pnpm prisma generate      # Generate client
pnpm prisma db push       # Push schema changes
pnpm prisma studio        # Open database GUI
pnpm prisma migrate dev   # Create migration

# Build for production
pnpm build
pnpm start

# Lint
pnpm lint
```

---

## 🔧 Environment Variables

Required variables in `.env`:

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# NextAuth
AUTH_SECRET="run: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:2222"  # Your app URL (for password reset links)

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# SMTP Configuration (for OTP and Password Reset emails)
# Gmail SMTP setup (requires App Password with 2FA enabled)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="465"
SMTP_USER="myabhyasikaofficial@gmail.com"  # Your Gmail address
SMTP_PASSWORD="your-gmail-app-password"    # Gmail App Password (NOT regular password)

# AWS S3 (for avatar uploads)
AWS_REGION="us-east-1"                     # Your S3 bucket region
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
S3_BUCKET_NAME="your-bucket-name"          # S3 bucket with public read access
```

### 📧 Gmail SMTP Setup
1. Enable 2-Factor Authentication on your Google Account
2. Go to Google Account > Security > App Passwords
3. Generate an App Password for "Mail"
4. Use this 16-character password as `SMTP_PASSWORD`

### 🪣 AWS S3 Setup
1. Create an S3 bucket with public read access
2. Create IAM user with S3 write permissions
3. Generate access keys for the IAM user
4. Add bucket policy for public read:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

---

## 🎯 Hackathon Tips

1. **Start with the dashboard** - Customize sidebar links and pages
2. **Use the data table** - Perfect for any list view
3. **Leverage charts** - Instant analytics/reports
4. **Copy example pages** - Users and Settings pages are templates
5. **Focus on your unique idea** - Auth, UI, and DB are done!

---

## 🚀 Deploy

```bash
# Deploy to Vercel (recommended)
vercel

# Or push to GitHub and connect to Vercel dashboard
```

---

**Good luck with your hackathon! 🎉**

Built with ❤️ for rapid prototyping

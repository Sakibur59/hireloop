# 🔁 Hireloop

> A full-stack, role-based job portal platform connecting job seekers and recruiters — with admin oversight, subscription plans, and Stripe-powered payments.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [User Roles](#user-roles)
- [Subscription Plans](#subscription-plans)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [License](#license)

---

## 🧩 Overview

**Hireloop** is a full-stack job portal application with three distinct user roles: **Admin**, **Job Seeker**, and **Recruiter**. Recruiters can create company profiles and post jobs — but every job post requires **admin approval** before going live. Job seekers can browse, filter, and apply for jobs, with access gated by subscription tier.

---

## ✨ Features

### 👤 Job Seeker
- Register and create a profile
- Browse and search job listings
- Filter jobs by **type**, **category**, and **keyword search**
- Save jobs and track applications
- Subscription-based application limits (Free / Pro / Premium)

### 🏢 Recruiter
- Register and create a **company profile**
- Post job listings (pending admin approval)
- Manage active job posts
- Track applicants via dashboard
- Subscription-based job post limits (Free / Growth / Enterprise)

### 🛡️ Admin
- Full admin panel
- Approve or reject recruiter company registrations
- Approve or reject job posts before they go live
- Manage users, subscriptions, and platform activity

### 💳 Payments
- Stripe integration for subscription checkout
- Plan upgrade/downgrade support
- Webhook handling for payment lifecycle events

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js / Next.js |
| Backend | Node.js / Express (or Next.js API Routes) |
| Database | MongoDB / PostgreSQL |
| Auth | JWT / NextAuth |
| Payments | Stripe |
| Styling | Tailwind CSS |
| Admin Panel | Custom Dashboard |

> Update this table to match your actual stack.

---

## 👥 User Roles

### 🔴 Admin
- Manages the entire platform
- Approves companies and job posts
- Access to analytics and user management

### 🟢 Job Seeker
- Browses and applies to approved job listings
- Subject to subscription plan limits

### 🔵 Recruiter
- Creates a company (requires admin approval)
- Posts jobs after company is approved (each post requires admin approval)
- Manages applicants

---

## 💰 Subscription Plans

### For Job Seekers

| Plan | Price | Features |
|------|-------|----------|
| **Free** | $0 / forever | Browse & save up to 10 jobs, apply to 3 jobs/month, basic profile, standard email alerts |
| **Pro** ⭐ | $19 / month | Apply to 30 jobs/month, unlimited saved jobs, advanced tracking dashboard, salary insights |
| **Premium** | $39 / month | Everything in Pro + unlimited applications, profile boost to recruiter feeds, early job access, 24/7 priority support |

### For Recruiters

| Plan | Price | Features |
|------|-------|----------|
| **Free** | $0 / forever | 3 active job posts, basic applicant pipeline, standard visibility, great for first-year hiring |
| **Growth** 🚀 | $49 / month | 10 active job posts, automated ATS workflow, performance metrics & analytics, email support |
| **Enterprise** | $149 / month | 50 active job posts, interactive analytics dashboard, featured listing boosts, multi-user seats, custom branding, dedicated account manager |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.x
- npm or yarn
- MongoDB / PostgreSQL instance
- Stripe account (for payments)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/hireloop.git
cd hireloop

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# App
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key

# Database
DATABASE_URL=your_database_connection_string

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx

# Stripe Price IDs (Job Seekers)
STRIPE_PRICE_PRO=price_xxxxxxxxxxxx
STRIPE_PRICE_PREMIUM=price_xxxxxxxxxxxx

# Stripe Price IDs (Recruiters)
STRIPE_PRICE_GROWTH=price_xxxxxxxxxxxx
STRIPE_PRICE_ENTERPRISE=price_xxxxxxxxxxxx
```

---

## 🗂️ Project Structure

```
hireloop/
├── app/                    # Next.js App Router (or pages/)
│   ├── (auth)/             # Login, Register
│   ├── admin/              # Admin panel routes
│   ├── seeker/             # Job seeker dashboard
│   ├── recruiter/          # Recruiter dashboard
│   └── api/                # API routes
│       ├── auth/
│       ├── jobs/
│       ├── companies/
│       ├── applications/
│       └── stripe/
│           └── webhook/
├── components/             # Reusable UI components
├── lib/                    # DB, Stripe, Auth utilities
├── models/                 # Database models/schemas
├── prisma/ or mongoose/    # ORM schema
├── public/                 # Static assets
├── .env.local              # Environment variables
└── README.md
```

---

## 🔄 Workflow

```
Recruiter Registers
        ↓
Admin Approves Company
        ↓
Recruiter Posts a Job
        ↓
Admin Approves Job Post
        ↓
Job Goes Live → Seekers Can Apply
        ↓
Recruiter Reviews Applicants
```

---

## 📸 Screenshots

### Job Seeker — Pricing Plans
![Seeker Plans](./screenshots/seeker-plans.png)

### Recruiter — Pricing Plans
![Recruiter Plans](./screenshots/recruiter-plans.png)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

Built with ❤️ — [Md Sakibur Rahman](https://github.com/Sakibur59)

> Feel free to star ⭐ the repo if you find it useful!
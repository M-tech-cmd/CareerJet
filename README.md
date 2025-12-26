# 💼 CareerJet — Job Board SaaS Platform

## 🌍 Overview

**CareerJet** is a full‑featured Job Board SaaS that connects employers and job seekers through a clean, fast, and secure platform. It supports paid job postings, role‑based onboarding, background workflows, and enterprise‑grade security — all optimized for performance and scalability.

Designed as a real‑world SaaS product, CareerJet demonstrates advanced full‑stack engineering patterns, modern UI/UX, and cloud‑native deployment.

---

## ✨ Key Features

### 🔐 Authentication & Onboarding

* OAuth authentication with **Google & GitHub** via **Auth.js**
* Role‑based onboarding:

  * **Organizations**: company details & logo upload
  * **Job Seekers**: profile setup & CV (PDF) upload

---

### 📝 Job Management

* Create, edit, view, and delete job listings (CRUD)
* Rich job descriptions using **Tiptap** editor
* Custom **salary range slider**
* Smooth image uploads
* Job durations: **30 / 60 / 90 days**
* Automatic job expiration handling

---

### 💳 Payments & Monetization

* **Stripe payment integration** for paid job postings
* Secure Stripe webhooks
* Automatic activation and expiration after payment

---

### 📬 Background Workflows (Inngest)

* Scheduled background jobs
* Sends job summary emails **every 2 days for 30 days**
* Reliable, serverless event processing

---

### 🛡️ Security & Protection (Arcjet)

* Protection against:

  * XSS attacks
  * SQL injection
  * Abuse & bot traffic
* Custom rate limiting:

  * Higher limits for authenticated users
  * Bot protection for public routes

---

### 📄 User Experience

* Fully responsive design (mobile → desktop)
* Index page with:

  * Filtering
  * Pagination
  * React Suspense
* Job detail pages with **Apply** actions
* Favorites route to save jobs

---

## 🛠️ Tech Stack

| Category        | Technology                          |
| --------------- | ----------------------------------- |
| Framework       | **Next.js 15**                      |
| Styling         | **Tailwind CSS**, **Shadcn UI**     |
| Auth            | **Auth.js** (Google & GitHub OAuth) |
| Background Jobs | **Inngest**                         |
| Security        | **Arcjet**                          |
| Payments        | **Stripe**                          |
| ORM             | **Prisma**                          |
| Database        | **Neon (Postgres)**                 |
| File Uploads    | **UploadThing**                     |
| Validation      | **Zod**                             |
| Deployment      | **Vercel**                          |

---

## 📂 Project Structure

```bash
careerjet/
├─ app/                # App Router pages
├─ components/         # Reusable UI components
├─ lib/                # Utilities & configs
├─ prisma/             # Database schema
├─ public/             # Static assets
├─ inngest/            # Background workflows
├─ middleware.ts       # Arcjet & rate limiting
├─ package.json
└─ README.md
```

---

## ⚙️ Environment Variables

```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
UPLOADTHING_SECRET=
ARCJET_KEY=
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/yourusername/careerjet.git
cd careerjet
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

Open: `http://localhost:3000`

---

## 🚀 Deployment

CareerJet is optimized for **Vercel**:

* Automatic CI/CD
* Edge‑ready middleware
* Secure webhook handling

---

## 🔮 Future Enhancements

* Resume parsing & AI matching
* Employer dashboards & analytics
* Job alerts via email & notifications
* Admin moderation panel
* Multi‑currency support

---

## 👨‍💻 Developer

Built with precision by **M-tech-cmd**

### 🔗 Connect

* **LinkedIn:** [https://linkedin.com/in/manuel-kim-6b1472382](https://linkedin.com/in/manuel-kim-6b1472382)
* **X (Twitter):** [https://x.com/M_tech_cmd](https://x.com/M_tech_cmd)
* **Instagram:** [https://instagram.com/m_tech_cmd](https://instagram.com/m_tech_cmd)
* **Facebook Page:** [https://facebook.com/M-tech-cmd](https://facebook.com/M-tech-cmd)
* **Email:** [kimaniemma20@gmail.com](mailto:kimaniemma20@gmail.com)

---

⭐ If you like this project, consider giving it a star!

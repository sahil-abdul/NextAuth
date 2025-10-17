# 🔐 Simple Email Authentication App (Next.js)

A minimal authentication app built with **Next.js** that uses secure **email verification links** (magic links) for passwordless login. Ideal for MVPs, prototypes, and internal tools.

## ✨ Features

- ✅ Passwordless login with magic links
- 📧 Email-based user authentication
- 🔗 One-time, time-limited login links
- ⚙️ Built with Next.js API routes and React
- 🧼 Simple, clean UI
- 🔒 Secure token handling (e.g. JWT)

## 🚀 How It Works

1. User enters their email on the login page.
2. A secure one-time login link is sent to their email.
3. The user clicks the link and is authenticated.
4. The app sets a session or token for future access.

## 🧱 Tech Stack

- **Next.js** (API Routes + Pages)
- **NodeMailer** or any email service (e.g. Resend, SendGrid)
- **JWT** or secure tokens for authentication
- Optional: **NextAuth.js** for extended auth handling


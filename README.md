# [Shopper - A shopping website using Next.js](https://shopper.io.vn)

(Website is still in development)

A shopping website using Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, external API from [Spacedev](https://spacedev.vn), Figma design from [F8](https://fullstack.edu.vn), and deployed on VPS.

<img alt="Shopper" src="https://github.com/user-attachments/assets/23e79ca5-f5e1-4b58-be34-ae69012c9704" width="100%" />

## 📋 Table of Contents

1. 🤖 [Introduction](#-introduction)
2. 🚀 [Deploy](#-deploy)
3. ⚙️ [Tech Stack](#%EF%B8%8F-tech-stack)
4. 🔋 [Features](#-features)
5. 🤸 [Quick Start](#-quick-start)

## 🤖 Introduction

The website is a shopping platform that allows users to view products, add products to the cart, checkout, and review orders. Users can also create an account, log in, change profile information, view order history, and much more. The website is responsive and includes a dark mode.

## 🚀 Deploy

Check out the website at [Shopper](https://shopper.io.vn)

- Email: `vevguj@office365.io.vn`
- Password: `Demo12345@#`
- Or you can create your own account.

## ⚙️ Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- zustand
- react-hook-form
- Framer Motion
- And much more...

## 🔋 Features

- User authentication: Register, verify email, login, logout, forgot password, reset password. Also handles refresh token, access token, and user authentication using localStorage and cookies.
- User profile: Change profile information, change password, change avatar, manage addresses, manage payment methods, and view order history.
- Product: View products, search products, filter products, view product details, add products to the cart, remove products from the cart, change quantity of products in the cart, view cart, checkout, review order, and view order history.
- Favorite: Add products to favorites, remove products from favorites, view favorite products.
- Responsive: The website is responsive, includes a dark mode, and adheres to the design from [Figma](https://www.figma.com/design/OWZNClBu3xjkOf6KfxTmYG)
- High performance: The website using server-side rendering much as possible, optimized images using next/image, and optimized bundle size.
- SEO: The website includes meta tags, open graph tags, and structured data.
- And much more...

## 🤸 Quick Start

Follow these steps to set up the project locally on your machine.

**Clone the repository**

```bash
git clone git@github.com:nboraxxd/shopper-next.git
cd shopper-next
```

**Install dependencies**
Install the dependencies using npm:

```bash
npm install --force
```

**Environment Variables**
Create a `.env.local` file in the root directory and add the following environment variables:

```bash
NEXT_PUBLIC_API_ENDPOINT=
NEXT_PUBLIC_URL=
NEXT_PUBLIC_REFRESH_TOKEN_CHECK_INTERVAL=
NEXT_PUBLIC_VIETNAM_PROVINCES_API_ENDPOINT=
```

**Runnning the project**

```bash
npm run dev
```

The project will be running at `http://localhost:3000`

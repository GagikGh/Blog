# Blog Platform with Next.js

Welcome to the **Blog Platform project** — a modern, full-stack blogging application built with **Next.js**. This platform allows users to create, read, update, and delete blog posts, providing a seamless and dynamic blogging experience.

---

## Features

- **Create, Edit, and Delete Posts**: Manage your blog content effortlessly.
- **Dynamic Routing**: Utilize Next.js dynamic routes for individual blog posts.
- **Responsive Design**: Smooth experience across all devices.
- **Image Optimization**: Leverage Next.js `Image` component for optimized images.
- **Client-Side Interactivity**: Enhance user experience with React hooks and client-side rendering.

---

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: MockAPI (for development purposes)
- **Deployment**: Vercel (recommended for Next.js applications)

---

## Getting Started

### 1. Clone the Repository

git clone https://github.com/GagikGh/Blog.git
cd Blog

### 2. Install Dependencies
npm install
# or
yarn install
# or
pnpm install

### 3. Configure Environment Variables
Create a .env.local file in the root directory:

env
NEXT_PUBLIC_BBC_API_KEY=your_mockapi_key_here

### 4. Run the Development Server
npm run dev
# or
yarn dev
# or
pnpm dev
Open http://localhost:3000 in your browser to view the app.

### Folder Structure
bash
Copy code
/app
  /components
    /ui
      Button.tsx
      Modal.tsx
      Form.tsx
    Blogs.tsx
    Post.tsx
  /helpers
    formatDate.ts
  /posts
    /[id]
      page.tsx
  layout.tsx
  page.tsx
  globals.css
/next.config.js
/package.json
/.env

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# RevoShop

RevoShop is a simple e-commerce web application built with Next.js, TypeScript, Tailwind CSS, Axios, and Bun.

The project fetches product data from the EscuelaJS API and displays product information in a responsive product listing page.

---

## Tech Stack

- Next.js 15
- React
- TypeScript
- Bun
- Tailwind CSS
- Axios

---

## Project Structure

```text
src/
├── app/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── products/
│   │   ├── [id]/
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── NavigationBar.tsx
│   └── ProductCard.tsx
│
└── types/
    └── index.ts
```

---

## Features

### Current Features

- Navigation Bar component
- Product listing page
- Fetch products from external API
- Loading state handling
- Error state handling
- Responsive product grid layout
- TypeScript type definitions

### Planned Features

- Product detail page
- Login page functionality
- Dashboard page
- Product card component integration
- Search and filtering
- Shopping cart

---

## API

This project uses the EscuelaJS API:

```text
https://api.escuelajs.co/api/v1/products
```

Example request:

```ts
const response = await axios.get(
  "https://api.escuelajs.co/api/v1/products"
);
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Move into the project folder:

```bash
cd revoshop
```

Install dependencies:

```bash
bun install
```

---

## Running the Development Server

Start the development server:

```bash
bun run dev
```

Open:

```text
http://localhost:3000
```

---

## Type Definitions

Example product interface:

```ts
export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
```

---

## Pages

### Home Page

Route:

```text
/
```

Displays the main landing page and navigation bar.

### Products Page

Route:

```text
/products
```

Displays all products fetched from the API.

### Product Detail Page

Route:

```text
/products/[id]
```

Displays details of a selected product.

### Login Page

Route:

```text
/login
```

User authentication page.

### Dashboard Page

Route:

```text
/dashboard
```

Administrative dashboard.

---

## Error Handling

The application handles:

- API request failures
- Loading states
- Retry functionality through refresh button

Example:

```ts
if (error) {
  return (
    <div>
      <h1>Error Loading Page</h1>
      <button onClick={() => getProductsAll()}>
        Refresh Page
      </button>
    </div>
  );
}
```

---

## Author

Created as part of a Next.js learning project using:

- Next.js
- TypeScript
- Bun
- Tailwind CSS
- Axios
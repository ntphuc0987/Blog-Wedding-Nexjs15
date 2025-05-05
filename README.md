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

### Install Prisma

pnpm i -D prisma
pnpm i -D prisma/client
pnpm dlx prisma init

## Create a model

model BlogPost {
  id          String   @id @default(uuid())
  title       String
  content     String
  imageUrl    String
  authorId    String
  authorName  String
  authorImage String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}


 pnpm dlx prisma db push
 pnpm dlx prisma studio

## create utils -> db.ts

{
    import { PrismaClient } from "@prisma/client";
    const globalForPrisma = global as unknown as { prisma: PrismaClient };
    export const prisma = globalForPrisma.prisma || new PrismaClient();
    if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
}

## create dashboard

1 dasboard/page.tsx


## Install Kinde
npx nypm add @kinde-oss/kinde-auth-nextjs

## setup key  Kinde API
KINDE_CLIENT_ID=<your_kinde_client_id>
KINDE_CLIENT_SECRET=<your_kinde_client_secret>
KINDE_ISSUER_URL=https://<your_kinde_subdomain>.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard
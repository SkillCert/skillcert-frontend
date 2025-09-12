## Description.

Skillcert is platform for issuing NFT-based digital certificates on the Stellar blockchain, ensuring authenticity, traceability, and instant verification. It also features an educational marketplace for courses with automated validated certification.

We are currently in the integration phase between the Web3 logic and the frontend application. The majority of the smart contract functions and blockchain interaction logic have already been implemented and tested on the Web3 side. On the frontend, all core views and components have been developed, and the UI/UX structure is stable. At this stage, we are focusing on wiring together the frontend interfaces with the Web3 functionalities—enabling user actions in the UI to trigger the corresponding smart contract calls and ensuring data from the blockchain is properly rendered on the client side. This step is essential to achieve full system functionality and user interaction flow.

## 📌 Roadmap

The project roadmap is available in Notion:  
🔗 [View Roadmap in Notion](https://www.notion.so/Skillcert-240bfdf2613c805898c9c91f0990600e)

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

## 🛠 Development Guidelines

### Code Quality & Linting

This project enforces strict code quality standards through ESLint configuration:

- **Console Statements**: Console logs are **warnings** in development but **errors** in production builds
- **Production Builds**: Will fail if any `console.log`, `console.error`, `console.warn`, etc. statements are present
- **Development**: Console statements are allowed with warnings for debugging purposes

#### Linting Commands

```bash
# Development linting (warnings for console statements)
pnpm run lint

# Production linting (errors for console statements)
NODE_ENV=production pnpm run lint

# Production build (will fail if console statements exist)
NODE_ENV=production pnpm run build
```

#### Console Log Policy

- ✅ **Development**: Use console statements for debugging, but clean them up before committing
- ❌ **Production**: No console statements allowed - use proper error handling and logging
- 🔧 **Error Handling**: Replace console.error with proper error throwing or user-friendly error messages
- 📝 **Debugging**: Use browser dev tools or proper logging libraries for production debugging

### Best Practices

1. **Remove console statements** before committing code
2. **Use proper error handling** instead of console.error
3. **Implement user-friendly error messages** for production
4. **Use TypeScript** for better type safety
5. **Follow Next.js conventions** for optimal performance

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

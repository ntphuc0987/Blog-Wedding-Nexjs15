import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth(
  async function middleware(req) {
    // You can add custom logic here if needed
    // For example, you can check the request URL or headers
    // and perform actions based on that.
    console.log("Middleware is running for:", req.nextUrl.pathname);
  },
  {
    // Middleware still runs on all routes, but doesn't protect the blog route
    publicPaths: ["/"],
  }
);

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
}
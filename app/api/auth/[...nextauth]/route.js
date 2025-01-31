import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin", // Optional custom sign-in page
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub; // Store user ID in session
      return session;
    },
  },
};

const handler = NextAuth(options);

export const GET = handler;
export const POST = handler;

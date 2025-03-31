import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Mobile", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await dbConnect();
          const { identifier, password } = credentials;

          // Find user by email or phone
          const user = await User.findOne({
            $or: [{ email: identifier }, { phoneNumber: identifier }],
          });

          if (!user) {
            throw new Error("Invalid credentials");
          }

          if (!user.password) {
            throw new Error(
              "This account uses Google login. Please sign in with Google."
            );
          }

          // Verify password
          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            throw new Error("Invalid credentials");
          }

          return {
            id: user._id,
            email: user.email,
            phoneNumber: user.phoneNumber,
            name: user.name,
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phoneNumber = user.phoneNumber;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.phoneNumber = token.phoneNumber;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Only allow redirects to the same domain
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
  },
  events: {
    async signIn({ user, account }) {
      // Log successful sign-ins
      console.log(`User ${user.email} signed in via ${account.provider}`);
    },
    async signOut({ user }) {
      // Log sign-outs
      console.log(`User ${user.email} signed out`);
    },
  },
  debug: process.env.NODE_ENV === "development",
};

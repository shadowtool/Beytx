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
          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            throw new Error("Invalid credentials");
          }
          return {
            id: user._id.toString(),
            email: user.email,
            phoneNumber: user.phoneNumber,
            name: user.name,
          };
        } catch (error) {
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      // For Google sign-in, find or create the user in MongoDB
      if (account?.provider === "google") {
        try {
          await dbConnect();
          const existingUser = await User.findOne({ email: user.email });

          if (existingUser) {
            // Update user info with the MongoDB _id
            user.id = existingUser._id.toString();
            return true;
          } else {
            // Create a new user with Google info
            const newUser = await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              // No password for Google users
            });
            user.id = newUser._id.toString();
            return true;
          }
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.phoneNumber = user.phoneNumber || null;
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
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
  },
  events: {},
  debug: process.env.NODE_ENV === "development",
};

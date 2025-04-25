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
          }).lean();

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
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber || null,
            role: user.role || "user",
            image: user.image || null,
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
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await dbConnect();
          let existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            existingUser = await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
            });
          }

          user.id = existingUser._id.toString();
          user.role = existingUser.role || "user";
          user.phoneNumber = existingUser.phoneNumber || null;
          user.image = existingUser.image;

          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id) {
        await dbConnect();
        const dbUser = await User.findById(token.id).lean();

        if (dbUser) {
          const { password, _id, ...rest } = dbUser;
          session.user = {
            id: _id.toString(),
            ...rest,
          };
        }
      }

      return session;
    },

    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },

  events: {},
  debug: process.env.NODE_ENV === "development",
};

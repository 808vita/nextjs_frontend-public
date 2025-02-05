import { connectDB } from "../lib/mongodb";
import User from "../models/Users";
import type { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        if (!user) throw new Error("Wrong Email");

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!passwordMatch) throw new Error("Wrong Password");
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },

  callbacks: {
    session: async ({ session, token }) => {
      session.user = token;
      return session;
    },
    jwt: async ({ token, user, session }) => {
      // console.log("callback jwt", token, user, session);
      return { ...token, ...user };
    },
  },
};

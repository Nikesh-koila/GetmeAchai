import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import connectDb from "@/db/dbConnect";
import User from "@/models/User";

const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const isAllowedProvider = ["google", "github", "facebook"];
      
      if (isAllowedProvider.includes(account.provider)) {
        await connectDb();
        const currentUser = await User.findOne({ email: user.email });
        if (!currentUser) {
          await User.create({
            username: user.name.split(/[\s-]+/)[0],
            email: user.email,
            profilepic: user.image,
          });
        }
        return true;
      } else {
        return false; 
        
      }
    },
    async session({ session, token, user }) {
      const dbUser = await User.findOne({ email: session.user.email });
      session.user = dbUser;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, 
};

export default (req, res) => NextAuth(req, res, authOptions); 

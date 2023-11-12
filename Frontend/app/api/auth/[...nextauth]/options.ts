import type { NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import axios from "axios";
export const options: NextAuthOptions = {
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID as string,
            clientSecret: process.env.TWITTER_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                  return null;
                }
                const Fetcheduser :any = await axios.get(`http://localhost:3000/api/user?email=${credentials.email}`)
                const userData = Fetcheduser.data;
                const users = [
                  {  email: userData.data.id, password: "nextauth" },
                ];

                const user = users.find(
                  (user) =>
                    user.email === credentials.email && user.password === credentials.password
                );
            
                if (user) {
                  return { ...user, id: user.email };
                } else {
                  return null;
                }
              }
        })
    ],
}
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
export const options: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
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
            
                // Replace this with your actual authentication logic.
                // For example, you might want to query a database to check if the credentials are valid.
                // Assuming you have a database of users:
                const users = [
                  { username: "dave", email: "dave@example.com", password: "nextauth" },
                  // Add more user objects here
                ];
            
                // Find the user that matches the provided email and password
                const user = users.find(
                  (user) =>
                    user.email === credentials.email && user.password === credentials.password
                );
            
                if (user) {
                  return { ...user, id: user.email }; // Return the user object with an ID
                } else {
                  return null; // Return null if authentication failed
                }
              }
        })
    ],
}
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
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "your name"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "**********"
                },
                async authorize(credentials: any) {
                    const user = { id: 42, name: "dave", password: "nextauth" }
                    const { username, password } = credentials as {
                        username: string,
                        password: string
                    }
                    if (username === user.name && password === user.password) {
                        return user;
                    }
                    else {
                        return { id: "0", name: "empty", password: "notused" };
                    }
                }
            }
        })
    ],
}
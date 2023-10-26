'use client'
import { useSession } from 'next-auth/react'
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link';
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export default function Page() {
    const { data: session } = useSession()
    if (session) {
        console.log("this is session ", session);
        return (
            <>
                Signed in as {session.user?.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <div>
            <Header />
            <div className='flex flex-col lg:max-w-[35%] md:max-w-[50%]  m-auto'>
                <h1 className='m-auto md:text-2xl lg:text-3xl font-bold text-blue-950 my-5'>Get unlimited access to the key ideas of
                    6,500+ non-fiction bestsellers</h1>
                <input type="email" name="email" id="email" placeholder='Email' className='border-2 m-2 border-gray-700 p-2' />
                <input type="password" name="password" id="password" placeholder='Password' className='border-2 m-2 border-gray-700 p-2' />
                <button className='m-2 bg-green-400 rounded p-2 border-0'>Create Account</button>
                <div className='flex'>
                    <button className='flex-grow text-white m-2 bg-[#3a579d] rounded p-2 border-0' onClick={() => {
                        signIn("github");
                    }}>Signup with FaceBook</button>
                    <button className='flex-grow text-white m-2 bg-[#4285f4] rounded p-2 border-0' onClick={() => {
                        signIn("google");
                    }}>Signup with Google</button>
                </div>
                <button className='flex-grow m-2 mb-8 bg-white border-black border-2 rounded p-2' onClick={() => {
                    signIn("twitter");
                }}>Log in with Twitter</button>
                <Link href={"/login"} className='m-auto text-[#4274f4]'>Already have an account? </Link>
            </div>
            <Footer />
        </div>
    )
}

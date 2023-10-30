'use client'
import Link from 'next/link'
import React, { useState } from 'react'

export default function TableComponents({summaryLength, title}:{summaryLength:number,title:string}) {
    const [showTableContent,setShowtableContent]=useState(false);
    return (
        <div className='flex flex-col gap-5'>
            <button className='font-bold text-sm text-start text-blue-950' onClick={() => (setShowtableContent(!showTableContent))}>Table of Contents</button>
            {showTableContent && <div className='underline text-sm flex flex-col gap-2'>
                <Link href={"#summary"}>{`${title} Summary of ${summaryLength} key ideas`}</Link>
                <Link href={"#aboutbook"}>{`What is ${title} about`}</Link>
                <Link href={"#bestquotes"}>{`Best quotes from ${title}`}</Link>
                <Link href={"#whoshouldread"}>{`Who should read ${title} ?`}</Link>
                <Link href={"#aboutauthor"}>{`About the Author`}</Link>
                <Link href={"#bookslike"}>{`Books like ${title}`}</Link>
                <Link href={"#peopleAlsoLiked"}>{`People Also Liked`}</Link>
            </div>}
        </div>
    )
}

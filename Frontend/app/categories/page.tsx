'use client'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import Link from 'next/link'

export default function page() {
    const categories = [
        "Biography & Memoir",
        "Career & Success",
        "Communication Skills",
        "Corporate Culture",
        "Creativity",
        "Economics",
        "Education",
        "Entrepreneurship",
        "Health & Nutrition",
        "History",
        "Management & Leadership",
        "Marketing & Sales",
        "Mindfulness & Happiness",
        "Money & Investments",
        "Motivation & Inspiration",
        "Nature & the Environment",
        "Parenting",
        "Personal Development",
        "Philosophy",
        "Politics",
        "Productivity",
        "Psychology",
        "Religion & Spirituality",
        "Science",
        "Sex & Relationships",
        "Society & Culture",
        "Technology & the Future"
    ];
    return (
        <div>
            {/* <Header /> */}
            <div className='md:p-[18px] p-8 md:py-16 lg:w-[60%] m-auto'>
                <div className='flex text-sm'>
                    <Link className='text-[#4e83fe]' href={"/categories"}>{"Categories >"}</Link>
                </div>
                <div className='text-3xl font-bold text-blue-950 my-5'>
                    Categories
                </div>
                <div className='text-[#3a4649] text-md'>
                    <p>{`Discover titles and shows in ${categories.length} categories`}</p>
                </div>
                <div className='flex md:flex-wrap overflow-x-auto overflow-y-hidden p-1 cursor-pointer gap-6 whitespace-nowrap my-8'>
                    {
                        categories.length > 0 && categories.map((topic, key) => {
                            return (
                                <Link href={`/categories/${topic}`} className='text-center w-[30%] flex-grow bg-[#f1f6f4] p-3 border-2 border-transparent hover:border-green-400 hover:rounded-md'>
                                    <p  key={key} className=''>{topic}</p>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

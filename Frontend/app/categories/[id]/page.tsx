'use client'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import Link from 'next/link'

export default function page({ params }: { params: { id: string } }) {
    const data = {
        category: params.id,
        slogan: "Mandela to Marie Curie, Steve Jobs to Toussaint L’Ouverture—learn the life lessons of giants.",
        topics: ['Biographies books',
            'Memoirs books',
            'Autobiographies books',
            'Alternative Perspectives books',
            'Entrepreneurial Stories books',
            'Bedtime Biographies books',
            'Political Figures books',
            'Simplify Podcast books',
            "Women's Stories books",
            'US Presidents books']
    }
    return (
        <div className='w-full'>
            <Header />
            <div className='md:p-[18px] p-8 md:py-16 lg:w-[60%] m-auto'>
                <div className='flex text-sm'>
                    <Link className='text-[#4e83fe]' href={"/categories"}>{"Categories >"}</Link>
                    <div>{data.category}</div>
                </div>
                <div className='text-3xl font-bold text-blue-950 my-5'>
                    {data.category}
                </div>
                <div className='text-[#3a4649] text-md'>
                    <p>{data.slogan}</p>
                </div>
                <div className='flex flex-col'>
                    <div className='text-xl font-bold text-blue-950 my-5'>
                        Topics
                    </div>
                    <div className='flex md:flex-wrap overflow-x-auto overflow-y-hidden gap-6 whitespace-nowrap'>
                        {
                            data.topics && data.topics.map((topic, key) => {
                                return (
                                    <div className='my-2'>
                                        <span key={key} className='bg-[#f1f6f4] p-3 border-2 border-transparent hover:border-green-400 hover:rounded-md'>{topic}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='text-xl font-bold text-blue-950 my-4'>
                        Popular
                    </div>
                    <div className='text-[#3a4649] text-md mb-4'>
                        <p>{`What’s popular with the Blinkist community in Biography & Memoir`}</p>
                    </div>
                    <div className='flex md:flex-wrap overflow-x-auto overflow-y-hidden gap-6 whitespace-nowrap'>
                        {
                            data.topics && data.topics.map((topic, key) => {
                                return (
                                    <div className='my-2'>
                                        <span key={key} className='bg-[#f1f6f4] p-3 border-2 border-transparent hover:border-green-400 hover:rounded-md'>{topic}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div>
                    
                </div>
            </div>
            <Footer />
        </div>
    )
}

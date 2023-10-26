import Link from 'next/link';
import React from 'react'
import { useState } from 'react'
export default function Header() {
    // Array 1: Explore by category
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

    const [explore, setExplore] = useState(false);
    return (
        <div className=' border-b relative'>
            {
                explore &&
                <div className='absolute top-[73px] bg-[#f1f6f4] w-full'>
                    <div className='lg:w-[60%] m-auto p-[18px]  flex justify-between items-center border-b-2'>
                        <button style={{ color: "#0365f2" }} className='font-semibold'>Explore by category</button>
                        <button className='font-semibold' >See recently added titles</button>
                        <button className='font-semibold'>See popular titles</button>
                    </div>
                    <div className='flex flex-wrap lg:w-[60%] m-auto p-[18px] cursor-pointer gap-6 whitespace-nowrap my-8'>
                        {
                            categories.length > 0 && categories.map((topic, key) => {
                                return (
                                    <Link href={`/categories/${topic}`} className='w-[30%] hover:text-blue-600 flex-grow'>
                                        <p key={key} className=''>{topic}</p>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            }
            <div className='lg:w-[60%] m-auto p-[18px]  flex justify-between items-center'>
                <div className='flex gap-5'>
                    <div>Logo</div>
                    <div>Search</div>
                    <button className='md:block hidden' onClick={() => { setExplore(!explore) }}>Explore</button>
                </div>
                <div className='flex text-sm'>
                    {/* <button className='p-2 bg-green-400 rounded border-0'>Start Free Trial</button> */}
                    <Link href={"/login"} className='p-2 border-0 bg-green-400 rounded'>Log in</Link>
                </div>
            </div>
        </div>
    )
}

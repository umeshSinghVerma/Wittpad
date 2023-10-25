import React from 'react'

export default function Header() {
    return (
        <div className='w-screen border-b '>
            <div className='lg:w-[60%] m-auto p-[18px]  flex justify-between items-center'>
                <div className='flex gap-5'>
                    <div>Logo</div>
                    <div>Search</div>
                    <div className='md:block hidden'>Explore</div>
                </div>
                <div className='flex text-sm'>
                    {/* <button className='p-2 bg-green-400 rounded border-0'>Start Free Trial</button> */}
                    <button className='p-2 border-0 bg-green-400 rounded'>Log in</button>
                </div>
            </div>
        </div>
    )
}

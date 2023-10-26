import React from 'react'
import {useState} from 'react'
export default function Header() {
    const [explore,setExplore]=useState(false);
    const [exploreOptions,setExploreOptions]=useState('Explore by category');
    return (
        <div className=' border-b relative'>
            {explore && <div className='absolute top-[73px] bg-[#f1f6f4] w-full'>
                <div className='lg:w-[60%] m-auto p-[18px]  flex justify-between items-center border-b-2'>
                    <button style={exploreOptions=='Explore by category' ? {color:"#0365f2"}:{}} className='font-semibold' onClick={()=>{setExploreOptions('Explore by category')}}>Explore by category</button>
                    <button style={exploreOptions=='See recently added titles' ? {color:"#0365f2"}:{}} className='font-semibold' onClick={()=>{setExploreOptions('See recently added titles')}}>See recently added titles</button>
                    <button style={exploreOptions=='See popular titles' ? {color:"#0365f2"}:{}} className='font-semibold' onClick={()=>{setExploreOptions('See popular titles')}}>See popular titles</button>
                </div>
            </div>}
            <div className='lg:w-[60%] m-auto p-[18px]  flex justify-between items-center'>
                <div className='flex gap-5'>
                    <div>Logo</div>
                    <div>Search</div>
                    <button className='md:block hidden' onClick={()=>{setExplore(!explore)}}>Explore</button>
                </div>
                <div className='flex text-sm'>
                    {/* <button className='p-2 bg-green-400 rounded border-0'>Start Free Trial</button> */}
                    <button className='p-2 border-0 bg-green-400 rounded'>Log in</button>
                </div>
            </div>
        </div>
    )
}

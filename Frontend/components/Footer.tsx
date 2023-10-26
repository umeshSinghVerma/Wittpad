import React from 'react'

export default function Footer() {
    return (
        <div className='bg-[#f1f6f4]'>
            <div className='mt-16 p-[3rem] flex flex-col lg:w-[60%] m-auto'>
                <div>
                    <h1 className='m-auto text-xl font-bold text-blue-950 my-5'>Discover the Wittpad catalogue</h1>
                </div>
                <div className='flex overflow-x-auto gap-9 justify-between'>
                    <div>
                        <h1 className='m-auto font-bold text-blue-950 my-5'>Popular titles</h1>
                        <div className='text-[#3a4649] text-sm whitespace-nowrap'>
                            Atomic habits
                        </div>
                    </div>
                    <div>
                        <h1 className='m-auto font-bold text-blue-950 my-5'>Popular categories</h1>
                        <div className='text-[#3a4649] text-sm whitespace-nowrap'>
                            Atomic habits
                        </div>
                    </div>
                    <div>
                        <h1 className='m-auto font-bold text-blue-950 my-5'>Popular topics</h1>
                        <div className='text-[#3a4649] text-sm whitespace-nowrap'>
                            Atomic habits
                        </div>
                    </div>
                    <div>
                        <h1 className='m-auto font-bold text-blue-950 my-5'>Trending topics</h1>
                        <div className='text-[#3a4649] text-sm whitespace-nowrap'>
                            Atomic habits
                        </div>
                    </div>
                </div>
                <div className='flex flex-wrap items-center gap-9 justify-between my-5'>
                    <div>Logo</div>
                    <div>
                        <h1 className='m-auto font-semibold text-sm text-blue-950 my-5'>Editorial</h1>
                        <div className='text-[#3a4649] text-sm whitespace-nowrap'>
                            Atomic habits
                        </div>
                    </div>
                    <div>
                        <h1 className='m-auto font-semibold text-sm text-blue-950 my-5'>Useful Links</h1>
                        <div className='text-[#3a4649] text-sm whitespace-nowrap'>
                            Atomic habits
                        </div>
                    </div>
                    <div>
                        <h1 className='m-auto font-semibold text-sm text-blue-950 my-5'>Company</h1>
                        <div className='text-[#3a4649] text-sm whitespace-nowrap'>
                            Atomic habits
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

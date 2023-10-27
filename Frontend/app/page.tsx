'use client'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Header />
      <div className='lg:w-[65%] m-auto p-[18px]'>
        <div>
          <div className='text-center md:text-3xl font-bold text-blue-950 mb-5'>
            Understand books & podcasts in 15 minutes
          </div>
          <div className='flex flex-wrap justify-between'>
            <div className='flex md:flex-col gap-5 md:gap-0 items-center justify-center md:max-w-[200px]'>
              <img src="/keyIdeas.svg" alt="" width={80} height={50} />
              <div>
                <div className=' md:text-xl font-bold text-blue-950 md:mb-5'>
                  Read or listen
                </div>
                <div className='text-sm md:text-base text-blue-950 mb-5'>
                  Get the key ideas from nonfiction bestsellers in minutes, not hours.
                </div>
              </div>
            </div>
            <div className='flex md:flex-col gap-5 md:gap-0 items-center justify-center md:max-w-[200px]'>
              <img src="/bulb.svg" alt="" width={80} height={50} />
              <div>
                <div className=' md:text-xl font-bold text-blue-950 md:mb-5'>
                  Find your next read
                </div>
                <div className='text-sm md:text-base text-blue-950 mb-5'>
                  Get book lists curated by experts and personalized recommendations.
                </div>
              </div>
            </div>
            <div className='flex md:flex-col gap-5 md:gap-0 items-center justify-center md:max-w-[200px]'>
              <img src="/shortcast.svg" alt="" width={80} height={50} />
              <div>
                <div className=' md:text-xl font-bold text-blue-950 md:mb-5'>
                  Shortcasts
                </div>
                <div className='text-sm md:text-base text-blue-950 mb-5'>
                  {`We've teamed up with podcast creators to bring you key insights from podcasts.`}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex w-full flex-col md:flex-row my-16 gap-3 justify-between'>
          <div className='md:text-3xl text-xl font-bold text-gray-500 whitespace-nowrap gap-3 flex flex-col'>
            <p className='text-blue-950'>Be more knowledgeable</p>
            <p>Be more successful</p>
            <p>Be healthier</p>
            <p>Be a better parent</p>
            <p>Be happier</p>
            <p>Be your best self!</p>
          </div>
          <div className='bg-[#f1f6f4] px-6 py-12 md:max-w-[50%] text-sm md:text-xl flex flex-col text-gray-700 justify-between items-center'>
            <div className='flex gap-3'>
              <span className='text-blue-600 font-bold'>95%</span>
              <div>of Blinkist members <span className='font-bold'>read significantly more</span> than before*</div>
            </div>
            <div className='flex gap-3'>
              <span className='text-blue-600 font-bold'>95%</span>
              <div>of Blinkist members <span className='font-bold'>read significantly more</span> than before*</div>
            </div>
            <div className='flex gap-3'>
              <span className='text-blue-600 font-bold'>95%</span>
              <div>of Blinkist members <span className='font-bold'>read significantly more</span> than before*</div>
            </div>
          </div>
        </div>
        <div className='flex w-full flex-col md:flex-row my-16 justify-around gap-12 md:items-center'>
          <div>
            <img src="https://www.blinkist.com/packs/static/use-cases/images/image_en@2x-31f2ab90ccaaf56e5713.png" alt="" className='max-h-[400px]' />
          </div>
          <div className='md:text-3xl text-xl font-bold text-gray-500 whitespace-nowrap gap-3 flex flex-col'>
            <p className='text-blue-950'>Feed your brain while</p>
            <p>Driving</p>
            <p>Commuting</p>
            <p>Doing housework</p>
            <p>Walking</p>
            <p>Relaxing</p>
            <div className='my-4'>
              <Link href={"/login"} className='py-3 px-10 font-semibold text-base text-blue-950 md:inline hidden border-0 bg-green-400 rounded'>Log in to Listen Audio</Link>
            </div>
          </div>
        </div>
        <div className='text-center md:text-3xl font-bold text-blue-950 mb-5'>
          What our members say
        </div>
      </div>
      <Footer />
    </div>
  )
}

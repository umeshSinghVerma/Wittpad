'use client'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function page() {
    const data = {
        slogan: 'The Lord of the Rings #0',
        title: 'THE HOBBIT',
        author: 'J.R.R. Tolkien, Douglas A. Anderson, Michael Hague (Illustrator)',
        imgUrl: 'https://biblioreads.eu.org/img?url=https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546071216i/5907.jpg&output=webp&maxage=30d',
        rating:'8.6 / 10',
        RatingReview:"3,783,925 Ratings & 66,969 Reviews",
        description:"In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.Written for J.R.R. Tolkien’s own children, The Hobbit met with instant critical acclaim when it was first published in 1937. Now recognized as a timeless classic, this introduction to the hobbit Bilbo Baggins, the wizard Gandalf, Gollum, and the spectacular world of Middle-earth recounts of the adventures of a reluctant hero, a powerful and dangerous ...read more.",
        Genres:"Fantasy, Classics, Fiction, Adventure, Young Adult, High Fantasy, Science Fiction Fantasy",
        Summary:"This is the Summary",
        BookEdition:"366 pages, Paperback",
        MoreEditionLink:"#",
        PublishingDate:"First published September 21, 1937"
    }
    return (
        <div>
            <Header />
            <div className='flex flex-wrap'>
                <div className='lg:w-[50%] w-full p-8 md:p-20 flex flex-col gap-5 items-center'>
                    <div className='italic underline'>{data?.slogan}</div>
                    <h1 className='text-2xl font-bold'>{data?.title}</h1>
                    <div className='text-center'><span className='font-bold'>By: </span>{data?.author}</div>
                    <Image src={data.imgUrl} alt={data.title} width={390} height={962} className='rounded-2xl border-2 mx-auto shadow-2xl drop-shadow-xl' />
                </div>
                <div className='lg:w-[50%] w-full p-8 md:p-20 flex flex-col items-center justify-center gap-8'>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-2xl font-bold'>Ratings:</h1>
                        <p>{data.rating}</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-2xl font-bold'>Number Of Ratings & Reviews:</h1>
                        <p>{data.RatingReview}</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-2xl font-bold'>Description:</h1>
                        <p className='text-center'>{data.description}</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-2xl font-bold'>Summary:</h1>
                        <p className='text-center'>{data.Summary}</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-2xl font-bold'>Genres:</h1>
                        <p className='text-center'>{data.Genres}</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-2xl font-bold'>Book Edition:</h1>
                        <p className='text-center'>{data.BookEdition}</p>
                        <Link href={data.MoreEditionLink} className="underline m-3">{`View more Editions >`}</Link>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-2xl font-bold'>Publishing Date:</h1>
                        <p className='text-center'>{data.PublishingDate}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

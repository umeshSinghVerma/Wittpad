import client from '@/sanity/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PortableText } from '@portabletext/react'
import TableComponents from '@/components/TableComponents'
async function getdata(id: string) {
    const beta = await client.fetch(`*[_type == "book" && title == "${id}" ]`, { cache: 'no-store' });
    if (beta.length == 0) {
        throw Error("this book is not available");
    }
    const data = JSON.parse(JSON.stringify(beta));

    const book = await data[0];

    let authors = "";
    let aboutAuthorArray: Array<string> = [];
    for (const a of book.book_author) {
        const rawdata: any = await client.getDocument(a._ref);
        authors = authors + " " + rawdata.authorName;
        console.log("Rawdata: ", { authors, aboutAuthorArray, rawdata });
        const authortext = JSON.stringify(rawdata.aboutAuthor);
        aboutAuthorArray.push(authortext);
    }


    let bookCategory: Array<string> | undefined = [];
    for (const a of book.categories) {
        const rawCategory: any = await client.getDocument(a._ref);
        bookCategory?.push(rawCategory.name);
    }

    let bookImageUrl: string | undefined = "";
    const imageData: any = book.book_image.asset._ref;
    const rawImage: any = await client.getDocument(imageData);
    bookImageUrl = rawImage.url;

    const ratingArray = book.book_ratingsReceived;
    const ratingNumber = ratingArray.length;
    let rating = 0;
    ratingArray.map((obj: any) => {
        rating = rating + obj.starRating;
    })
    rating = rating / ratingNumber;



    const alpha = {
        aboutBook: book.about,
        time: book.book_timeToRead,
        topics: book.book_topic,
        title: book.title,
        author: authors,
        category: bookCategory,
        imgUrl: bookImageUrl,
        slogan: book.book_tagline,
        bestQuote: book.book_bestQuote,
        rating: rating,
        RatingReview: `${ratingNumber} Ratings`,
        summary: book.wholeSummary,
        aboutAuthor: aboutAuthorArray
    }


    return alpha;

}

export default async function page({ params }: { params: { id: string } }) {
    const bookTitle: string = decodeURIComponent(params.id)
    const data = await getdata(bookTitle);
    // console.log("this is the data we show ", data);
    return (
        <div>
            <div className='lg:w-[60%] m-auto p-[18px]'>
                <div className='gap-1 text-sm hidden md:flex my-3'>
                    <Link className='text-blue-600' href={'/categories'}>{`Categories >`}</Link>
                    <Link className='text-blue-600' href={`/categories/${data.category[0]}`}>{`${data.category[0]} >`}</Link>
                    <p>{data.title}</p>
                </div>
                <div className='flex flex-col-reverse md:flex-row justify-between'>
                    <div>
                        <p className='text-[#6d787e] mt-12 mb-4 md:my-4 font-semibold'>Better than a summary</p>
                        <div className='text-3xl font-bold text-blue-950 mb-5'>
                            {data.title}
                        </div>
                        <div className='font-bold text-blue-950 mb-5 whitespace-break-spaces text-sm'>
                            {data.author}
                        </div>
                        <div className='my-4'>
                            {data.slogan}
                        </div>
                        <div className='flex gap-4 flex-wrap'>
                            <div className='flex items-center text-sm my-3 gap-2'>
                                <img src="/star.svg" alt="" height={30} width={30} />
                                <span className='mb-2'>{data.rating}</span>
                                <span className='whitespace-nowrap mb-2'>{`(${data.RatingReview})`}</span>
                            </div>
                            <div className='flex items-center text-sm my-3 '>
                                <img src="/clock.svg" alt="" height={30} width={30} />
                                <span className='mb-2'>{data.time} min</span>
                            </div>
                        </div>
                        <div className='my-4'>
                            <Link href={"/login"} className='py-3 px-10 font-semibold text-blue-950 md:inline hidden border-0 bg-green-400 rounded'>Log in to Listen Audio</Link>
                        </div>
                        <div className='flex flex-col-reverse md:flex-col my-4'>
                            <div className='flex flex-col'>
                                <div className='font-bold text-sm text-blue-950 my-5'>
                                    Topics
                                </div>
                                <div className='flex flex-wrap  p-1 cursor-pointer gap-6 whitespace-nowrap mb-8'>
                                    {
                                        data.topics.length > 0 && data.topics.map((topic: string, key: number) => {
                                            return (
                                                <Link href={`#`} className='text-center min-w-min md:w-[30%] flex-grow bg-[#f1f6f4] p-3 border-2 border-transparent hover:border-green-400 hover:rounded-md'>
                                                    <p key={key} className=''>{topic}</p>
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <TableComponents summaryLength={data.summary.length} title={data.title} />
                        </div>
                    </div>
                    <div className='mt-4 flex items-center justify-center bg-[#ebd6c6]  -m-[18px] p-10 h-min'>
                        <Image src={data.imgUrl || ""} width={200} height={400} alt={data.title} />
                    </div>
                </div>
                <div className='my-4'>
                    <Link href={"/login"} className='py-3 px-10 font-semibold text-blue-950 block text-center md:hidden border-0 bg-green-400 rounded'>Log in to Listen Audio</Link>
                </div>
                <div id='summary' className='flex flex-col gap-3 mb-8'>
                    <p className='md:text-xl font-bold text-blue-950'>Summary</p>
                    {
                        data.summary.map((obj: any, key: number) => {
                            return (
                                <div key={key} className='my-4'>
                                    <div className='md:text-xl font-bold text-blue-950 my-2'>{obj.keyidea}</div>
                                    <PortableText value={obj.summary} />
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <div className='text-center md:text-3xl font-bold text-blue-950 mb-5'>
                        More Knowledge in less time
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
                    <div id='aboutbook' className='my-10'>
                        <span className='md:text-xl font-bold text-blue-950'>What is</span>
                        <span className='md:text-xl italic text-blue-950 mx-1'>{data.title}</span>
                        <span className='md:text-xl font-bold text-blue-950'>about ?</span>
                        <p className='text-blue-950 my-4'>{data.aboutBook}</p>
                    </div>
                    <div id='bestquotes' className='my-10'>
                        <span className='md:text-xl font-bold text-blue-950'>Best quote from</span>
                        <span className='md:text-xl italic text-blue-950 mx-1'>{data.title}</span>
                        <p className='text-blue-950 my-4'>{data.bestQuote}</p>
                    </div>
                    <div id='aboutauthor' className='my-10'>
                        <span className='md:text-xl font-bold text-blue-950'>About the Author</span>
                        <div className='my-4'>
                            {
                                data.aboutAuthor.map((data: string, key: number) => {
                                    return (
                                        <p className='text-blue-950 my-1'>{data}</p>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div id='bestquotes' className='my-10'>
                        <span className='md:text-xl font-bold text-blue-950'>Categories with</span>
                        <span className='md:text-xl italic text-blue-950 ml-2'>{data.title}</span>
                        <div className='flex flex-wrap  p-1 cursor-pointer gap-6 whitespace-nowrap my-8'>
                            {
                                data.category.length > 0 && data.category.map((topic: string, key: number) => {
                                    return (
                                        <Link href={`/categories/${topic}`} className='text-center min-w-min md:w-[30%] flex-grow bg-[#f1f6f4] p-3 border-2 border-transparent hover:border-green-400 hover:rounded-md'>
                                            <p key={key} className=''>{topic}</p>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

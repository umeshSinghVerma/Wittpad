import client from '@/sanity/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PortableText } from '@portabletext/react'
async function getdata() {
    const beta = await client.fetch('*[_type == "book" && title == "THE HOBBIT" ]',{ cache: 'no-store' });
    const data = JSON.parse(JSON.stringify(beta));
    console.log("this is data obtained ", data[0]);
    const book = await data[0];
    let authors = "";
    book.book_author.map(async (author: any) => {
        const rawdata: any = await client.getDocument(author._ref);
        authors = authors + " " + rawdata.authorName;
    })
    let bookCategory: Array<string> | undefined = [];
    book.categories.map(async (category: any) => {
        const rawCategory: any = await client.getDocument(category._ref);
        bookCategory?.push(rawCategory.name);
    })

    let bookImageUrl: string | undefined = "";
    const imageData: any = book.book_image.asset._ref;
    const rawImage: any = await client.getDocument(imageData);
    bookImageUrl = rawImage.url;


    const alpha = {
        description: book.about,
        time: book.book_timeToRead,
        topics: book.book_topic,
        title: book.title,
        author: authors,
        category: bookCategory,
        imgUrl: bookImageUrl,
        slogan: 'The Lord of the Rings #0',
        rating: '4.7',
        RatingReview: "3,783,925 Ratings",
        Genres: "Fantasy, Classics, Fiction, Adventure, Young Adult, High Fantasy, Science Fiction Fantasy",
        summary: book.wholeSummary,
        BookEdition: "366 pages, Paperback",
        MoreEditionLink: "#",
        PublishingDate: "First published September 21, 1937",
        aboutAuthor: `Ryan Holiday is an American author, media strategist, and bookstore owner. He's also the host of the Daily Stoic podcast. His other books include Lives of the Stoics, Courage is Calling, and The Obstacle is the Way.
        Stephen Hanselman is a publisher and literary agent. He studied at Fresno Pacific University and obtained a Master's degree from Harvard Divinity School. The Daily Stoic is his first book as an author.`
    }


    return alpha;

}

export default async function page() {

    const initalData = {
        category: 'Personal Development',
        slogan: 'The Lord of the Rings #0',
        title: 'sdkjf',
        time: "33 min",
        author: 'J.R.R. Tolkien, Douglas A. Anderson, Michael Hague (Illustrator)',
        imgUrl: 'https://images.blinkist.io/images/books/5b73f3aab238e100073cda34/1_1/470.jpg',
        rating: '4.7',
        RatingReview: "3,783,925 Ratings",
        description: "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.Written for J.R.R. Tolkien's own children, The Hobbit met with instant critical acclaim when it was first published in 1937. Now recognized as a timeless classic, this introduction to the hobbit Bilbo Baggins, the wizard Gandalf, Gollum, and the spectacular world of Middle-earth recounts of the adventures of a reluctant hero, a powerful and dangerous ...read more.",
        Genres: "Fantasy, Classics, Fiction, Adventure, Young Adult, High Fantasy, Science Fiction Fantasy",
        Summary: ["This is the Summary"],
        BookEdition: "366 pages, Paperback",
        MoreEditionLink: "#",
        PublishingDate: "First published September 21, 1937",
        topics: ['Biographies books',
            'Memoirs books'],
        aboutAuthor: `Ryan Holiday is an American author, media strategist, and bookstore owner. He's also the host of the Daily Stoic podcast. His other books include Lives of the Stoics, Courage is Calling, and The Obstacle is the Way.
        Stephen Hanselman is a publisher and literary agent. He studied at Fresno Pacific University and obtained a Master's degree from Harvard Divinity School. The Daily Stoic is his first book as an author.`
    }
    const data = await getdata();
    console.log(data.summary);
    // const [data, setData] = useState(initalData)
    // window.data = data;

    // const [showTableContent, setShowTableContent] = useState(false);
    const showTableContent = false;
    return (
        <div>
            <div className='lg:w-[60%] m-auto p-[18px]'>
                <div className='gap-1 text-sm hidden md:flex'>
                    <Link className='text-blue-600' href={'/categories'}>{`Categories >`}</Link>
                    <Link className='text-blue-600' href={`/categories/${data.category[0]}`}>{`${data.category[0]} >`}</Link>
                    <p>{data.title}</p>
                </div>
                <div className='flex flex-col-reverse md:flex-row justify-between'>
                    <div>
                        <p className='text-[#6D787E] mt-12 mb-4 md:my-4 font-bold'>Better than a summary</p>
                        <div className='text-3xl font-bold text-blue-950 mb-5'>
                            {data.title}
                        </div>
                        <div className='font-bold text-blue-950 mb-5'>
                            {data.author}
                        </div>
                        <div>
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
                                <span className='mb-2'>{data.time}</span>
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
                                                <Link href={`/categories/${topic}`} className='text-center min-w-min md:w-[30%] flex-grow bg-[#f1f6f4] p-3 border-2 border-transparent hover:border-green-400 hover:rounded-md'>
                                                    <p key={key} className=''>{topic}</p>
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='flex flex-col gap-5'>
                                <button className='font-bold text-sm text-start text-blue-950'>Table of Contents</button>
                                {showTableContent && <div className='underline text-sm flex flex-col gap-2'>
                                    <Link href={"#summary"}>{`${data.title} Summary of ${data.summary.length} key ideas`}</Link>
                                    <Link href={"#aboutbook"}>{`What is ${data.title} about`}</Link>
                                    <Link href={"#bestquotes"}>{`Best quotes from ${data.title}`}</Link>
                                    <Link href={"#whoshouldread"}>{`Who should read ${data.title} ?`}</Link>
                                    <Link href={"#aboutauthor"}>{`About the Author`}</Link>
                                    <Link href={"#bookslike"}>{`Books like ${data.title}`}</Link>
                                    <Link href={"#peopleAlsoLiked"}>{`People Also Liked`}</Link>
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div className='mt-4 flex items-center justify-center bg-[#ebd6c6]  -m-[18px] p-10 h-min'>
                        <Image src={data.imgUrl || ""} width={200} height={400} alt={data.title} />
                    </div>
                </div>
                <div className='my-4'>
                    <Link href={"/login"} className='py-3 px-10 font-semibold text-blue-950 block text-center md:hidden border-0 bg-green-400 rounded'>Log in to Listen Audio</Link>
                </div>
                <div id='summary' className='flex flex-col gap-3'>
                    {
                        data.summary.map((obj: any, key: number) => {
                            return (
                                <div key={key}>
                                    <div className='md:text-xl font-bold text-blue-950'>{obj.keyidea}</div>
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
                        <p className='text-blue-950 my-4'>{data.description}</p>
                    </div>
                    <div id='bestquotes' className='my-10'>
                        <span className='md:text-xl font-bold text-blue-950'>Best quote from</span>
                        <span className='md:text-xl italic text-blue-950 mx-1'>{data.title}</span>
                        <p className='text-blue-950 my-4'>{data.description}</p>
                    </div>
                    <div id='bestquotes' className='my-10'>
                        <span className='md:text-xl font-bold text-blue-950'>About the Author</span>
                        <p className='text-blue-950 my-4'>{data.aboutAuthor}</p>
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

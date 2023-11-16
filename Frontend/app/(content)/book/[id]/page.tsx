
import client from '@/sanity/client'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import TableComponents from '@/components/TableComponents'
import Categories from '@/components/Categories'
import AboutAuthor from '@/components/AboutAuthor'
import Summary from '@/components/Summary'
import BestQuote from '@/components/BestQuote'
import Topics from '@/components/Topics'
import axios from 'axios'
import Favourite from '@/components/Favourite'
import { getServerSession } from "next-auth"

async function getStatus(user: any,bookTitle: string,bookAuthor:string,bookImg:string) {
    const previousData = await axios.get(`https://wittpad-alpha.vercel.app/api/user?email=${user?.email}`, {
        headers: {
            Authorization: `Bearer ${user?.name}`
        }
    });
    const oldData = { ...previousData.data.data };
    const oldSavedBooks = oldData?.savedBooks;
    console.log(oldSavedBooks);
    if(oldData?.savedBooks){
        const obj = {author:bookAuthor,title:bookTitle,img:bookImg};
        let flag = 0;
        for(let i=0;i<oldSavedBooks.length;i++){
            let element = oldSavedBooks[i];
            console.log('elements ',element);
            if(element.author === obj.author && element.title === obj.title && element.img === obj.img){
                flag=1;
                return true
            }
        };
    }else{
        return false;
    }
}
async function uploadData(data: any, id: string) {
    const doc = {
        _type: 'book',
        slug: id,
        title: data.title,
        imgUrl: data.imgUrl,
        book_author: data.author,
        book_tagline: data.slogan,
        about: data.description,
        book_rating: data.rating
    }
    client.create(doc).then((res) => {
        console.log(`Book is created, document ID is ${res._id}`)
    })
}


async function getdata(id: string) {
    const beta = await client.fetch(`*[_type == "book" && slug == "${id}" ]`, { cache: 'no-store' });
    if (beta.length == 0) {
        const scrapedData = await getScrapedData(id);
        const data = {
            time: "",
            topics: [],
            category: [],
            bestQuote: "",
            summary: [],
            RatingReview: ``,
            aboutAuthor: '',
            ...scrapedData
        }
        return data;

    }
    const book = await beta[0];

    if (book.title == null) {
        console.log("I am coming here");
        const scrapedData = await getScrapedData(id);
        const data = {
            time: "",
            topics: [],
            category: [],
            bestQuote: "",
            summary: [],
            RatingReview: ``,
            aboutAuthor: '',
            ...scrapedData
        }
        return data;

    } else {

        // let authors = "";
        // let aboutAuthorArray: Array<string> = [];
        // for (const a of book.book_author) {
        //     const rawdata: any = await client.fetch(`*[ _id == "${a._ref}" ]`, { cache: 'no-store' });
        //     authors = authors + " " + rawdata[0].authorName;
        //     console.log("Rawdata: ", { authors, aboutAuthorArray, rawdata });
        //     const authortext = JSON.stringify(rawdata[0].aboutAuthor);
        //     aboutAuthorArray.push(authortext);
        // }


        // let bookCategory: Array<string> | undefined = [];
        // for (const a of book.categories) {
        //     const rawCategory: any = await client.getDocument(a._ref);
        //     bookCategory?.push(rawCategory.name);
        // }

        // let bookImageUrl: string | undefined = "";
        // const imageData: any = book.book_image.asset._ref;
        // const rawImage: any = await client.getDocument(imageData);
        // bookImageUrl = rawImage.url;

        // const ratingArray = book.book_ratingsReceived;
        // const ratingNumber = ratingArray.length;
        // let rating = 0;
        // ratingArray.map((obj: any) => {
        //     rating = rating + obj.starRating;
        // })
        // rating = rating / ratingNumber;

        const alpha = {
            description: book?.about || "",
            time: book?.book_timeToRead || "",
            topics: book?.book_topic || [],
            category: book?.categories || [],
            bestQuote: book?.book_bestQuote || "",
            summary: book?.wholeSummary || [],

            aboutAuthor: book?.book_aboutAuthor || "",

            title: book?.title || "",
            author: book?.book_author || "",
            imgUrl: book?.imgUrl || "",
            slogan: book?.book_tagline || "",
            rating: book?.book_rating || "",
            RatingReview: `${5} Ratings`
        }


        return alpha;
    }

}
async function getScrapedData(id: string) {
    const bookUrl = `https://biblioreads.eu.org/book/show/${id}`;
    let scrapedData = [];
    try {
        const searchData = await axios.post('https://ystgfrwnmuf3ckhfiugrcopjye0wrtzs.lambda-url.us-east-2.on.aws/', {
            getBook: bookUrl
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000,https://wittpad-alpha.vercel.app',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
                }
            })
        scrapedData = searchData.data;
        uploadData(scrapedData, id);
        return scrapedData;
    }
    catch (e) {
        console.log(e)
    }
    return scrapedData;
}

export default async function Page({ params }: { params: { id: string } }) {
    const bookTitle: string = decodeURIComponent(params.id)
    const data = await getdata(bookTitle);
    
    const alpha = await getServerSession();
    const bookStatus = await getStatus(alpha?.user,data.title,data.author,data.imgUrl);

    return (
        <div>
            <div className='lg:w-[60%] m-auto md:p-[18px] pt-0 px-[18px]'>
                <div className='gap-1 text-sm hidden md:flex my-3 text-blue-600'>
                    <Link className='text-blue-600' href={'/categories'}>{`Categories`}</Link>
                    <span>{`>`}</span>
                    <Categories bookName={data.title} authorName={data.author} type={'breadcrumb'} />
                    <span>{`>`}</span>
                    <p className='text-black'>{data.title}</p>
                </div>
                <div className='flex flex-col-reverse md:flex-row md:gap-10 justify-between'>
                    <div>
                        <p className='text-[#6d787e] mt-12 mb-4 md:my-4 font-semibold'>Better than a summary</p>
                        <div className='flex gap-5'>
                            <div className='text-3xl font-bold text-blue-950 mb-5 '>
                                {data.title}
                            </div>
                            <Favourite bookTitle={data.title} bookImg={data.imgUrl} bookAuthor={data.author} initialStatus={bookStatus}/>
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
                                <div className='flex flex-wrap  p-1 cursor-pointer gap-6 whitespace-nowrap md:mb-8'>
                                    {/* {
                                        data.topics.length > 0 && data.topics.map((topic: string, key: number) => {
                                            return (
                                                <Link href={`#`} className='text-center min-w-min md:w-[30%] flex-grow bg-[#f1f6f4] p-3 border-2 border-transparent hover:border-green-400 hover:rounded-md'>
                                                    <p key={key} className=''>{topic}</p>
                                                </Link>
                                            )
                                        })
                                    } */}
                                    <Topics bookName={data.title} authorName={data.author} />
                                </div>
                            </div>
                            <TableComponents summaryLength={data.summary.length} title={data.title} />
                        </div>
                    </div>
                    <div className='md:mt-4 flex items-center justify-center bg-[#ebd6c6]  -mx-[18px] p-10 h-min'>
                        <Image src={data.imgUrl || ""} width={200} height={400} alt={data.title} />
                    </div>
                </div>
                <div className='my-4'>
                    <Link href={"/login"} className='py-3 px-10 font-semibold text-blue-950 block text-center md:hidden border-0 bg-green-400 rounded'>Log in to Listen Audio</Link>
                </div>
                <div id='summary' className='flex flex-col gap-3 mb-8'>
                    <p className='md:text-xl font-bold text-blue-950'>Summary</p>
                    <Summary bookName={data.title} authorName={data.author} />
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
                        {/* <p className='text-blue-950 my-4'>{data.bestQuote}</p> */}
                        <BestQuote bookName={data.title} authorName={data.author} />
                    </div>
                    <div id='aboutauthor' className='my-10'>
                        <span className='md:text-xl font-bold text-blue-950'>About the Author</span>
                        {/* <div className='my-4'>
                            {
                                data.aboutAuthor.map((data: any, key: number) => {
                                    return (
                                        <div>
                                            <p className='text-blue-950 my-1'>{data.authorName}</p>
                                            <p className='text-blue-950 my-1'>{data.about}</p>
                                        </div>
                                    )
                                })
                            }
                        </div> */}
                        <AboutAuthor authorName={data.author} bookName={data.title} />
                    </div>
                    <div id='bestquotes' className='my-10'>
                        <span className='md:text-xl font-bold text-blue-950'>Categories with</span>
                        <span className='md:text-xl italic text-blue-950 ml-2'>{data.title}</span>
                        <Categories bookName={data.title} authorName={data.author} type={'list'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

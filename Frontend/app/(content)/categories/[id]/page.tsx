import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import client from '@/sanity/client'

async function getData(category:string){
    const data = await client.fetch(`*[_type == "category" && name=="${category}"]`)
    const newData = JSON.parse(JSON.stringify(data[0]));
    return newData;
}
export default async function page({ params }: { params: { id: string } }) {
    const categoryThing:string =  decodeURIComponent(params.id)
    const alpha:any = await getData(categoryThing);
    const data = {
        category: decodeURIComponent(params.id),
        slogan: "Mandela to Marie Curie, Steve Jobs to Toussaint L'Ouverture—learn the life lessons of giants.",
        topics: alpha.topics,
        popularBooks:[
            {
                imgUrl:"https://images.blinkist.io/images/books/5f8962c26cee070007a86bae/1_1/470.jpg",
                title:"Perfectly Confident",
                author:"Don A. Moore",
                slogan:"How to Calibrate Your Decisions Wisely",
                audioTime:"19 min",
                rating:"4.1"
            },
            {
                imgUrl:"https://images.blinkist.io/images/books/5f8962c26cee070007a86bae/1_1/470.jpg",
                title:"Perfectly Confident",
                author:"Don A. Moore",
                slogan:"How to Calibrate Your Decisions Wisely",
                audioTime:"19 min",
                rating:"4.1"
            },
            {
                imgUrl:"https://images.blinkist.io/images/books/5f8962c26cee070007a86bae/1_1/470.jpg",
                title:"Perfectly Confident",
                author:"Don A. Moore",
                slogan:"How to Calibrate Your Decisions Wisely",
                audioTime:"19 min",
                rating:"4.1"
            },
            {
                imgUrl:"https://images.blinkist.io/images/books/5f8962c26cee070007a86bae/1_1/470.jpg",
                title:"Perfectly Confident",
                author:"Don A. Moore",
                slogan:"How to Calibrate Your Decisions Wisely",
                audioTime:"19 min",
                rating:"4.1"
            },
            {
                imgUrl:"https://images.blinkist.io/images/books/5f8962c26cee070007a86bae/1_1/470.jpg",
                title:"Perfectly Confident",
                author:"Don A. Moore",
                slogan:"How to Calibrate Your Decisions Wisely",
                audioTime:"19 min",
                rating:"4.1"
            },
            {
                imgUrl:"https://images.blinkist.io/images/books/5f8962c26cee070007a86bae/1_1/470.jpg",
                title:"Perfectly Confident",
                author:"Don A. Moore",
                slogan:"How to Calibrate Your Decisions Wisely",
                audioTime:"19 min",
                rating:"4.1"
            },
            {
                imgUrl:"https://images.blinkist.io/images/books/5f8962c26cee070007a86bae/1_1/470.jpg",
                title:"Perfectly Confident",
                author:"Don A. Moore",
                slogan:"How to Calibrate Your Decisions Wisely",
                audioTime:"19 min",
                rating:"4.1"
            },
            {
                imgUrl:"https://images.blinkist.io/images/books/5f8962c26cee070007a86bae/1_1/470.jpg",
                title:"Perfectly Confident",
                author:"Don A. Moore",
                slogan:"How to Calibrate Your Decisions Wisely",
                audioTime:"19 min",
                rating:"4.1"
            },
        ],
        newest:[
            {
                imgUrl:"https://images.blinkist.io/images/books/5f8962c26cee070007a86bae/1_1/470.jpg",
                title:"Perfectly Confident",
                author:"Don A. Moore",
                slogan:"How to Calibrate Your Decisions Wisely",
                audioTime:"19 min",
                rating:"4.1"
            },
            {
                imgUrl:"https://images.blinkist.io/images/books/5f8962c26cee070007a86bae/1_1/470.jpg",
                title:"Perfectly Confident",
                author:"Don A. Moore",
                slogan:"How to Calibrate Your Decisions Wisely",
                audioTime:"19 min",
                rating:"4.1"
            },
            {
                imgUrl:"https://images.blinkist.io/images/books/5f8962c26cee070007a86bae/1_1/470.jpg",
                title:"Perfectly Confident",
                author:"Don A. Moore",
                slogan:"How to Calibrate Your Decisions Wisely",
                audioTime:"19 min",
                rating:"4.1"
            },
            {
                imgUrl:"https://images.blinkist.io/images/books/5f8962c26cee070007a86bae/1_1/470.jpg",
                title:"Perfectly Confident",
                author:"Don A. Moore",
                slogan:"How to Calibrate Your Decisions Wisely",
                audioTime:"19 min",
                rating:"4.1"
            },
            {
                imgUrl:"https://images.blinkist.io/images/books/5f8962c26cee070007a86bae/1_1/470.jpg",
                title:"Perfectly Confident",
                author:"Don A. Moore",
                slogan:"How to Calibrate Your Decisions Wisely",
                audioTime:"19 min",
                rating:"4.1"
            },
            {
                imgUrl:"https://images.blinkist.io/images/books/5f8962c26cee070007a86bae/1_1/470.jpg",
                title:"Perfectly Confident",
                author:"Don A. Moore",
                slogan:"How to Calibrate Your Decisions Wisely",
                audioTime:"19 min",
                rating:"4.1"
            },
            {
                imgUrl:"https://images.blinkist.io/images/books/5f8962c26cee070007a86bae/1_1/470.jpg",
                title:"Perfectly Confident",
                author:"Don A. Moore",
                slogan:"How to Calibrate Your Decisions Wisely",
                audioTime:"19 min",
                rating:"4.1"
            },
            {
                imgUrl:"https://images.blinkist.io/images/books/5f8962c26cee070007a86bae/1_1/470.jpg",
                title:"Perfectly Confident",
                author:"Don A. Moore",
                slogan:"How to Calibrate Your Decisions Wisely",
                audioTime:"19 min",
                rating:"4.1"
            },
        ]
    }
    return (
        <div className='w-full'>
            <div className='md:p-[18px] p-8 md:py-16 lg:w-[60%] m-auto'>
                <div className='flex text-sm'>
                    <Link className='text-[#4e83fe] mr-2' href={"/categories"}>{"Categories >"}</Link>
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
                    <div className='flex md:flex-wrap overflow-x-auto overflow-y-hidden p-1 cursor-pointer gap-6 whitespace-nowrap'>
                        {
                            data.topics && data.topics.map((topic:any, key:number) => {
                                return (
                                    <div className='my-2'>
                                        <span key={key} className='bg-[#f1f6f4] p-3 border-2 border-transparent hover:border-green-400 hover:rounded-md'>{topic}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='flex flex-col mt-10'>
                    <div className='text-xl font-bold text-blue-950 my-4'>
                        Popular
                    </div>
                    <div className='text-[#3a4649] text-md mb-4'>
                        <p>{`What’s popular with the Blinkist community in ${data.category}`}</p>
                    </div>
                    <div className='flex md:flex-wrap overflow-x-auto overflow-y-hidden gap-6 whitespace-nowrap'>
                        {
                            data.popularBooks && data.popularBooks.map((book, key) => {
                                return (
                                    <div className='my-2 flex flex-col w-[200px]'>
                                        <Image src={book.imgUrl} alt={book.title} width={150} height={100}/>
                                        <div className='font-bold text-sm text-blue-950 my-2'>{book.title}</div>
                                        <div className='text-[#515b5e] font-bold text-sm mb-2'>{book.author}</div>
                                        <div className='text-[#515b5e] text-sm mb-2 w-full whitespace-break-spaces'><p>{book.slogan}</p></div>
                                        <div className='flex gap-5 text-sm text-[#515b5e]'>
                                            <div>{book.audioTime}</div>
                                            <div>{book.rating}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='flex flex-col mt-10'>
                    <div className='text-xl font-bold text-blue-950 my-4'>
                        Newest
                    </div>
                    <div className='text-[#3a4649] text-md mb-4'>
                        <p>Nothing but the freshest additions to the catalogue</p>
                    </div>
                    <div className='flex md:flex-wrap overflow-x-auto overflow-y-hidden gap-6 whitespace-nowrap'>
                        {
                            data.newest && data.newest.map((book, key) => {
                                return (
                                    <div className='my-2 flex flex-col w-[200px]'>
                                        <Image src={book.imgUrl} alt={book.title} width={150} height={100}/>
                                        <div className='font-bold text-sm text-blue-950 my-2'>{book.title}</div>
                                        <div className='text-[#515b5e] font-bold text-sm mb-2'>{book.author}</div>
                                        <div className='text-[#515b5e] text-sm mb-2 w-full whitespace-break-spaces'><p>{book.slogan}</p></div>
                                        <div className='flex gap-5 text-sm text-[#515b5e]'>
                                            <div>{book.audioTime}</div>
                                            <div>{book.rating}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}
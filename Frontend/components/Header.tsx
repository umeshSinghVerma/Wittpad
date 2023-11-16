'use client'
import Link from 'next/link';
import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import CircularProgress from '@mui/joy/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { signOut, useSession } from 'next-auth/react'
export default function Header() {
    const { data: session } = useSession()
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
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    async function getSearchResults() {
        try {
            if (search != '') {
                setLoading(true);
                const url = 'https://ystgfrwnmuf3ckhfiugrcopjye0wrtzs.lambda-url.us-east-2.on.aws/';
                const searchData = await axios.post('https://ystgfrwnmuf3ckhfiugrcopjye0wrtzs.lambda-url.us-east-2.on.aws/',{
                    searchBook:search
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://localhost:3000,https://wittpad-alpha.vercel.app',
                        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
                    }
                })
                setSearchResult(searchData.data.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className=' border-b relative z-50'>
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
            {
                searchResult.length != 0 &&
                <div className='absolute top-[73px] bg-[#f1f6f4] w-full'>
                    <button className='p-2 border-0 md:text-base text-xs m-3 bg-green-400 rounded' onClick={() => {
                        setSearch("");
                        setSearchResult([]);
                    }}>Clear Search</button>
                    <div className='flex flex-col max-h-[500px] overflow-y-auto lg:w-[60%] m-auto p-[10px] whitespace-nowrap'>
                        {
                            searchResult.map((book: any, key) => {
                                let link = book.link;
                                link = link.replace("/show", "");
                                return (
                                    <Link href={`${link}`} className='hover:text-blue-600' onClick={() => { setSearchResult([]) }}>
                                        <div className='text-xs flex my-3 w-full h-min bg-white p-3 gap-5 justify-center items-center'>
                                            <div>
                                                <img src={book.coverImage} alt="" className='max-h-[60px]' />
                                            </div>
                                            <div className='flex flex-col w-full'>
                                                <p key={key} className='whitespace-break-spaces'>{book?.title}</p>
                                                <p key={key} className='whitespace-break-spaces'>{book?.author}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            }
            <div className='lg:w-[60%] m-auto p-[18px] md:text-base text-xs  flex justify-between items-center'>
                <div className='flex gap-5 items-center'>
                    <Link href={'/'} className='font-bold text-2xl text-blue-950'>Wittpad</Link>
                    <TextField
                        id="Search book"
                        label="Search book"
                        variant="filled"
                        size="small"
                        onChange={(e) => { setSearch(() => (e.target.value)) }}
                        onKeyDown={(e) => {
                            if (e.key == 'Enter') {
                                getSearchResults();
                            }
                        }}
                        value={search}
                    />
                    {loading ?
                        <div className='flex items-center justify-center'>
                            <CircularProgress size="sm" />
                        </div>
                        :
                        <div className='flex items-center justify-center'>
                            <IconButton aria-label="search-book" size="small" onClick={() => { getSearchResults() }}>
                                <SearchIcon />
                            </IconButton>
                        </div>
                    }
                    <div className='md:flex hidden items-center justify-center cursor-pointer ' onClick={() => { setExplore(!explore) }}>
                        <span>Explore</span>
                        {
                            explore ? (
                                <ArrowDropUpIcon />
                            ) : (
                                <ArrowDropDownIcon />
                            )
                        }
                    </div>
                </div>
                <div className='flex text-sm'>
                    <Link href={session ? "/savedBooks":"/login"} className='p-2 border-0 md:text-base text-xs px-4 bg-green-400 rounded'>{session ? "Saved Books":`Log in`}</Link>
                    {
                        session && <button className='text-md text-blue-950 m-3' onClick={()=>{
                            signOut();
                        }}>Logout</button>
                    }
                </div>
            </div>
        </div>
    )
}

'use client'
import openai from "@/openAi";
import client from "@/sanity/client";
import { useEffect, useState } from 'react'
import React from 'react'
async function updateAboutAuthor(bookName:string,aboutAuthor:string) {
    client
        .patch({ query: `*[ _type == 'book' && title == "${bookName}" ]` }) // Document ID to patch
        .set({ book_aboutAuthor: aboutAuthor })
        .commit()
        .then((updatedBike) => {
        })
        .catch((err) => {
            console.error('the update failed: ', err.message)
        })
}
async function getAboutTheAuthorFromSanity(bookName:string,setAboutAuthor:React.Dispatch<React.SetStateAction<string>>,authorName:string){
    const beta = await client.fetch(`*[_type == "book" && title == "${bookName}" ]{book_aboutAuthor}`, { cache: 'no-store' });
    if(beta.length==0){
        getAboutTheAuthor(authorName,setAboutAuthor,bookName)
    }
    else{
        if(beta[0].book_aboutAuthor==null){
            getAboutTheAuthor(authorName,setAboutAuthor,bookName)
        }else{
            setAboutAuthor(beta[0].book_aboutAuthor);
        }
    }
}
async function getAboutTheAuthor(authorName: string,setAboutAuthor:React.Dispatch<React.SetStateAction<string>>,bookName:string) {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: `I will provide the list of authors, you have to give a short about each author`
            },
            {
                role: "assistant",
                content: "Sure provide the name and the author of the book I will give you the topics seperated by comma"
            },
            {
                role: 'user',
                content: `
                Authors name :  ${authorName}
                `
            },
            {
                role: "assistant",
                content: ""
            }

        ],
        stream: true,
    });
    let aboutAuthorString = '';
    for await (const chunk of completion) {
        if (chunk.choices[0].delta.content) {
            const data = chunk.choices[0].delta.content;
            aboutAuthorString+=data;
            setAboutAuthor((prev:any)=>prev+data);
        }
    }
    updateAboutAuthor(bookName,aboutAuthorString);        
}
export default function AboutAuthor({bookName,authorName}:{bookName:string,authorName:string}) {
    const [aboutAuthor, setAboutAuthor] = useState('');

    useEffect(()=>{
        if(bookName && authorName){
            getAboutTheAuthorFromSanity(bookName,setAboutAuthor,authorName);
        }
    },[bookName,authorName])
    return (
        <div>
            <p>{aboutAuthor}</p>
        </div>
    )
}


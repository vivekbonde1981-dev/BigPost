import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { useSelector } from 'react-redux';
import Hero from './Hero';

function Home() {
    const [posts, setPosts] = useState([])
    const authStatus=useSelector((state)=>state.auth.status)

    useEffect(() => {              
        if(authStatus){
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })}else{
            setPosts([])
        }
    }, [authStatus])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                               { !authStatus?<p>Login to read posts</p>:<p>Loading posts...</p>}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
       <Hero></Hero>
    )

   
}

export default Home
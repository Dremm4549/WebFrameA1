/*
* FILE :    RedditData.js
* PROJECT : Advanced Web Frameworks - Assignment #1
* PROGRAMMER : Michael Dremo
* FIRST VERSION : 2023-03-06
* DESCRIPTION : This file takes care of fetching data from the reddit api
                It displays each post like title possible text or image

*/

import React,{useEffect, useState} from 'react';

function RedditData({subRedditName, likedRedditPosts, addToLikedPosts}) {
    const url = `https://api.reddit.com/r/${subRedditName}/hot/`
    
    const[redditPostData, setRedditPostData] = useState([]);
    const[likeBtnVisability, setLikeBtnVisability] = useState([]); 
    
    const [likedPosts, setLikedPosts] = useState(() => {
        const storedLikedPosts = localStorage.getItem('likedRedditPostIdss');
        return storedLikedPosts ? JSON.parse(storedLikedPosts) : [];
    });

    useEffect(() => {
        fetch(`${url}`).then(
            res => res.json()
        ).then(
            data => {
                setRedditPostData(data)      
            }
        )
    },[url]);

    const handleLikeClick = (post) => {
        addToLikedPosts(post.id);
    
        setLikeBtnVisability((prevState) => ({
          ...prevState,
          [post.id]: true,
        }));
      
        setLikedPosts((prevLikedPosts) => [...prevLikedPosts, post.id]);
      };
      

    return (
        <div className='Reddit-Searches'>
            {(typeof redditPostData.data === 'undefined') ? (
                <div>
                    <p>Data is loading...</p>
                </div>
            ):(
                <div>            
                    {redditPostData.data.children.slice(0,10).map((child) => (
                        <div key={child.data.id} className={`reddit-post ${likeBtnVisability[child.data.id] ? 'reddit-liked-post' : ""}`}>
                            <h3>Post Name: {child.data.title}</h3>
                            <p>Score: {child.data.score}</p>
                            {child.data.thumbnail !== 'self' ? (
                                <img src={child.data.thumbnail} alt={child.data.title}></img>
                            ): (
                                <>
                                    <p>{child.data.selftext}</p>
                                </>
                            )}

                           {likedPosts.includes(child.data.id) ? (
                                <button className="Like-Button" disabled>Liked</button>
                            ) : (
                                <button className="Like-Button" onClick={() => handleLikeClick(child.data)}>Like</button>
                            )}
                            <a href={`https://www.reddit.com${child.data.permalink}`} className='Comment-Link'>View Comments</a>
                        </div>                            
                    ))}
                </div>
            )}
        </div>
    );
}

export default RedditData
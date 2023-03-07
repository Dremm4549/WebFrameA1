/*
* FILE :    Header.js
* PROJECT : Advanced Web Frameworks - Assignment #1
* PROGRAMMER : Michael Dremo
* FIRST VERSION : 2023-03-06
* DESCRIPTION : This file represents and houses elements to search and view liked reddit posts

*/

import React, {useState} from 'react';
import Button from './Button'
import RedditData from './RedditData';

const Header = ({title}) => {
    const [subRedditName, setSubRedditName] = useState('');
    const [inputName, setInputName] = useState('');

    const [likedPostIDInfo, setlikedPostIDInfo] = useState([]);
    
    const [ShowFetchPage, setFetchPage] = useState(true);
    
    const click = () =>{
        setSubRedditName(inputName)
    }

    const change = event => {
        setInputName(event.target.value)
    }

    const changePage = () => {
        setFetchPage(!ShowFetchPage);
        if(ShowFetchPage){        
            const likedPosts = JSON.parse(localStorage.getItem('likedRedditPostIdss')) || [];

            const postInfo = [];
            const fetchPromises = likedPosts.map(postId => {
            return fetch(`https://www.reddit.com/comments/${postId}/.json`)
                .then(response => response.json())
                .then(data => {
                const id = data[0].data.children[0].data.id;
                const title = data[0].data.children[0].data.title;
                const score = data[0].data.children[0].data.score;
                const thumbnail = data[0].data.children[0].data.thumbnail;
                const content = data[0].data.children[0].data.selftext;
                const comments = data[0].data.children[0].data.permalink;
                postInfo.push({ id, title,score,thumbnail,content,comments });
                })
                .catch(error => console.error(error));
            });
            Promise.all(fetchPromises).then(() => {
            setlikedPostIDInfo(postInfo);
            });
            
        }
        else{
            setlikedPostIDInfo([])
        }
        setInputName('');
        setSubRedditName('');

        //line 43
        //  likedPosts.forEach(postId => {
        //         fetch(`https://www.reddit.com/comments/${postId}/.json`)
        //           .then(response => response.json())
        //           .then(data => {
        //             setlikedPostIDInfo(prevState => [...prevState, {
        //                 id: data[0].data.children[0].data.id, 
        //                 title: data[0].data.children[0].data.title,
        //                 score: data[0].data.children[0].data.score,
        //                 thumbnail: data[0].data.children[0].data.thumbnail,
        //                 content: data[0].data.children[0].data.selftext
        //             }])
        //           })
        //           .catch(error => console.error(error));
        //       });
    }

    const addToLikedPosts = (post) => {
        console.log( "Liked "  + post);
        const likeddPostss = JSON.parse(localStorage.getItem('likedRedditPostIdss')) || [];
        likeddPostss.push(post)
        localStorage.setItem('likedRedditPostIdss', JSON.stringify(likeddPostss));

        console.log("maybe " + likedPostIDInfo)

      };
      
      const removeLikedPost = (postId) => {
        const likedPostIds = JSON.parse(localStorage.getItem('likedRedditPostIdss'));
        const updatedLikedPostIds = likedPostIds.filter((id) => id !== postId);
        localStorage.setItem('likedRedditPostIdss', JSON.stringify(updatedLikedPostIds));
        setlikedPostIDInfo(prevLikedRedditPosts => prevLikedRedditPosts.filter(post => post.id !== postId));
      };   
         
    return(
        <div>
            {ShowFetchPage ? (
                <div className='header'> 
                <div className='Header-Content'>
                    <h1 className='Title-Header'>{title}</h1>           
                    <input 
                    onChange={change}
                    type="text" 
                    className='Search-Box' 
                    placeholder='Enter a subreddit'
                    value={inputName}
                    />
                    <Button classN={'Search-Button'} text={"Retrieve top 10 posts"} colour={"red"} onClick={click}/>
                    <Button classN={'Liked-Posts-Button'} text={"Show liked Posts"} colour={"white"} onClick={changePage}/>
                </div>
                    <div className='Reddit-Content'>
                        {subRedditName && <RedditData subRedditName={subRedditName} addToLikedPosts={addToLikedPosts} likedRedditPosts={likedPostIDInfo}/>}
                    </div>
            </div>
            ) : (
                <>
                     <Button className='Liked-Posts-Button'text={"Fetch More Reddit Posts"} colour={"white"} onClick={changePage}/>
                     <div className='Reddit-Content'>
                     {likedPostIDInfo.map((post) => {
                    return (
                        <div key={post.id} className='reddit-liked-post'>
                            <p>{post.title}</p>
                            <p>Score: {post.score}</p>
                            
                            {post.thumbnail !== 'self' ? (
                                <img src={post.thumbnail} alt={post.title}></img>
                                ): (
                                <p>{post.selftext}</p>
                                )}
                            <a href={`https://www.reddit.com${post.comments}`} className='Comment-Link'>View Comments</a>
                            <button className='Remove-Liked-Post' onClick={() => removeLikedPost(post.id)}>Remove from Liked</button>
                        </div>
                    );
                })}


                        {/* {likedPostIDInfo.map((post) => {
                        if (post.title) {
                            return (
                            <div key={post.id} className='reddit-liked-post'>
                                <h3>Post Name: {post.title}</h3>
                                <p>Score: {post.score}</p>

                                {post.thumbnail !== 'self' ? (
                                <img src={post.thumbnail} alt={post.title}></img>
                                ): (
                                <p>{post.selftext}</p>
                                )}

                                <button className='Remove-Liked-Post' onClick={() => removeLikedPost(post.id)}>Remove from Liked</button>
                                <a href={`https://www.reddit.com${post.permalink}`} className='Comment-Link'>View Comments</a>
                            </div>
                            );
                        }
                        })} */}
                        
                     </div>
                </>
            )}
        </div>

    )
}

Header.defaultProps={
    title: 'Reddit Hotness Grabber'
}
export default Header;
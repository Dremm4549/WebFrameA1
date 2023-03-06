import React,{useEffect, useState} from 'react';

function RedditData({subRedditName, likedRedditPosts, addToLikedPosts}) {
    const url = `https://api.reddit.com/r/${subRedditName}/hot/`
    const[redditPostData, setRedditPostData] = useState([{}]);
    const[likeBtnVisability, setLikeBtnVisability] = useState([]); 

    useEffect(() => {
        fetch(`${url}`).then(
            res => res.json()
        ).then(
            data => {
                setRedditPostData(data)
                console.log(data)
            }
        )
    },[url]);

    const handleLikeClick = (post) =>{
        addToLikedPosts(post);
        setLikeBtnVisability((prevState) => ({
            ...prevState,
            [post.id]: true,
        }));
    }

    

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
                            {child.data.thumbnail !== 'self' ? (
                                <img src={child.data.thumbnail} alt={child.data.title}></img>
                            ): (
                                <p>{child.data.selftext}</p>
                            )}
                              {likedRedditPosts.some(post => post.id === child.data.id) ? (
                                <button className="Like-Button" disabled>Liked</button>
                            ) : (
                                <button className="Like-Button" onClick={() => handleLikeClick(child.data)}>Like</button>
                            )}
                            {/* {!likeBtnVisability[child.data.id] ? (
                                <button className="Like-Button" onClick={() => handleLikeClick(child.data)}>Like</button>
                                 ) : (
                                <button className="Like-Button" disabled>Liked</button>
                            )}
                            {likedRedditPosts.some(post => post.id === child.data.id) && <p>Post {child.data.id} is currently liked!</p>} */}
                        </div>                            
                    ))}
                </div>
            )}
        </div>
    );
}

export default RedditData
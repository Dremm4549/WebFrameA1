import React, {useState} from 'react';
import Button from './Button'
import RedditData from './RedditData';

const Header = ({title}) => {
    const [subRedditName, setSubRedditName] = useState('');
    const [inputName, setInputName] = useState('');
    
    const [likedRedditPosts, setLikedRedditPosts] = useState(() => {
        const storedLikedRedditPosts = JSON.parse(localStorage.getItem('likedRedditPostIds')) || [];
        return storedLikedRedditPosts;
      });
      
    
    const [ShowFetchPage, setFetchPage] = useState(true);
    
    const click = () =>{
        setSubRedditName(inputName)
    }

    const change = event => {
        setInputName(event.target.value)
    }

    const changePage = () => {
        setFetchPage(!ShowFetchPage);
        setInputName('');
        setSubRedditName('');
    }

    const addToLikedPosts = (post) => {
        setLikedRedditPosts((prevLikedRedditPosts) => {
            const newLikedRedditPosts = prevLikedRedditPosts.concat(post);
            localStorage.setItem('likedRedditPostIds', JSON.stringify(newLikedRedditPosts));
            return newLikedRedditPosts;
          });
      };
      
      const removeLikedPost = (postId) => {

        setLikedRedditPosts((prevLikedRedditPosts) =>
          prevLikedRedditPosts.filter((post) => post.id !== postId)       
        );

        localStorage.setItem(
            "likedRedditPostIds",
            JSON.stringify(
              likedRedditPosts.filter((post) => post.id !== postId).map((post) => post.id)
            )
        );
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
                        {subRedditName && <RedditData subRedditName={subRedditName} addToLikedPosts={addToLikedPosts} likedRedditPosts={likedRedditPosts}/>}
                    </div>
            </div>
            ) : (
                <>
                     <Button className='Liked-Posts-Button'text={"Fetch More Reddit Posts"} colour={"white"} onClick={changePage}/>
                     <div className='Reddit-Content'>
                        {likedRedditPosts.map((post) => (
                            <div key={post.id} className='reddit-liked-post'>
                                <h3>Post Name: {post.title}</h3>

                                {likedRedditPosts.thumbnail !== 'self' ? (
                                <img src={post.thumbnail} alt={likedRedditPosts.title}></img>
                                ): (
                                    <p>{post.selftext}</p>
                                )}

                                <button className='Remove-Liked-Post' onClick={() => removeLikedPost(post.id)}>Remove from Liked</button>
                            </div>
                        ))}
                        
                            {/* // <div key={likedRedditPosts.id} className='reddit-post'>
                            //     <h3>Post Name: {likedRedditPosts.title}</h3>
                            //     <p>Post ID: {likedRedditPosts.id}</p>
                                {likedRedditPosts.thumbnail !== 'self' ? (
                                <img src={likedRedditPosts.thumbnail} alt={likedRedditPosts.title}></img>
                                ): (
                                    <p>{likedRedditPosts.selftext}</p>
                                )}
                            //     <button className='Remove-Liked-Post' onClick={removeLikedPost}>Remove from Liked</button>                      
                            // </div> */}
                        
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
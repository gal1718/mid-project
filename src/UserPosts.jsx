
import * as React from 'react'
import { useState } from 'react'
import Post from './Post'

const UserPosts = ({ user, AddNewPostUser }) => {

    const [userPosts, setUserPosts] = useState(user.posts)
    const [addPost, setAddPost] = useState(false);
    const [newPostTitle,setNewPostTitle] = useState("");
    const [newPostBody,setNewPostBody] = useState("");

   

    const handleNewPost = () => {

        const biggestId = Math.max(...userPosts.map((post) => post.id), 0);
        const newPost = { userId: user.id, id: biggestId + 1 , title: newPostTitle, body: newPostBody}
        setUserPosts([...userPosts,newPost]);
        setAddPost(false)
        AddNewPostUser(user.id,newPost);
        //add new post to DB
    }




    return (
        <div className="UserPosts">
            <strong>Posts - User {user.id}</strong> <button onClick={() => setAddPost(true)}>Add</button> <br/> <br/> <br/>

            {!addPost && userPosts.map((post) => {

                return <Post key={post.id} post={post}></Post> 

            })
            }

            {addPost &&

                <div>
                    <strong>Title: <input value={newPostTitle} onChange={(event) => setNewPostTitle(event.target.value)} type="text"></input></strong>
                    <strong>Body: <input value={newPostBody} onChange={(event) => setNewPostBody(event.target.value)} type="text"></input></strong>
                    <button onClick={() => setAddPost(false)}>Cancel</button>
                    <button onClick={() => handleNewPost()}>Add</button>
                </div>

            }



        </div>

    )

}

export default UserPosts


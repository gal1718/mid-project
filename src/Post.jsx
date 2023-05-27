const Post = ({post}) => {


    return (
        <div style={{border: "2px solid black", marginBottom: "3px"}} className="Post">

            <strong> Title: {post.title}</strong><br />
            <strong> Body: {post.body}</strong><br />
          

        </div>

    )

}

export default Post


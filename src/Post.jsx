const Post = ({ post }) => {


    return (
        <div style={{ border: "2px solid black", marginBottom: "3px", padding: "inherit" }} className="Post">
            <strong> Title: </strong>{post.title}<br/><br/>
            <strong> Body:</strong> {post.body}<br /><br/>
        </div>

    )

}

export default Post


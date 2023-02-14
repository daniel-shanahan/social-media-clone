function Feed({ posts }) {
    const feedPosts = posts.map(post =>
        <div key={post.id}>
            <div>{post.user}</div>
            <p>{post.text}</p>
        </div>
    );

    return (
        <div>
            {feedPosts}
        </div>
    );
}

export default Feed;
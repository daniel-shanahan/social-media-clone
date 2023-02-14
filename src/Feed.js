function Feed({ posts }) {
    const feedPosts = posts.map(post =>
        <div key={post.id} className='feed-item'>
            <div className="font-semibold text-gray-500">{post.user}</div>
            <p className="mt-3">{post.text}</p>
        </div>
    );

    return (
        <div className="flex flex-col gap-3">
            {feedPosts}
        </div>
    );
}

export default Feed;
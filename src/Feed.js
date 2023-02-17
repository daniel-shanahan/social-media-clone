import Post from "./Post";

function Feed({ posts }) {
    const feedPosts = posts.map(post =>
        <Post post={post} />
    );

    return (
        <div className="flex flex-col gap-6">
            {feedPosts}
        </div>
    );
}

export default Feed;
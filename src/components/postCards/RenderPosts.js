import PostCard from "../postCards/PostCard";

export default function RenderPosts({ posts }) {

    return (
        <>
            {posts.map(post => {
                return (<PostCard key={post.post_id} author_pic={post.picture_url} author={post.username} description={post.description} url={post.url}></PostCard>
                )
            })}
        </>

    )
};

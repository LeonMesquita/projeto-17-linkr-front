import PostCard from "../postCards/PostCard";
import PostSkeleton from "../skeletonComponents/PostSkeleton";
import StatusCodeScreen from "../timelines/StatusCodeScreen";

export default function RenderPosts({ isLoading, posts, statusCode }) {
    console.log(posts)
    return (
        <>
            {
                isLoading
                    ? <PostSkeleton />
                    :   statusCode
                        ?    <StatusCodeScreen statusCode={statusCode} />
                        :
                            posts?.map(post => {
                                return (<PostCard key={post.post_id} author_pic={post.picture_url} author={post.username} description={post.description} url={post.url}></PostCard>
                                )
                            })
            }

        </>

    )
};

import PostCard from "../postCards/PostCard";
import PostSkeleton from "../skeletonComponents/PostSkeleton";
import StatusCodeScreen from "../timelines/StatusCodeScreen";
import useLocalStorage from "../../hooks/useLocalStorage";
import UserContext from "../../contexts/UserContext";
import { useContext, useEffect } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import handleGetPostsRefresh from "../../handlers/handleGetPostsRefresh";


export default function RenderPosts({ posts, isLoading, statusCode, isRefreshing  }) {
    const linkirUser = useLocalStorage("linkrUser", "");
    const { url } = useContext(UserContext);
    // async function onClickUser(userId){
    //     try{
    //         const promise = await axios.get(`${url}/user/${userId}`, linkirUser.token);
    //         setClickedUseName(promise.data[0].username);
    //         setClickedUserPicture(promise.data[0].picture_url);
    //         setPosts(promise.data);
    //         setIsUserPosts(true);
    //     }catch(e){
    //         Swal.fire({
    //             icon: 'error',
    //             titleText: `Falha de autenticação`,
    //             text: `Você precisa estar logado!`,
    //             color: `#FFFFFF`,
    //             background: `#333333`,
    //             confirmButtonColor:`#1877F2`,
    //             padding: `10px`,
    //             timer: 4000,
    //             timerProgressBar: true,
    //             timerProgressBar: `#ffffff`
    //         })
    //     }

    // }

    console.log(posts)

    return (
        <>
            {
                isLoading 
                    ? <PostSkeleton />
                    : statusCode
                        ?   <StatusCodeScreen statusCode={statusCode} />
                        :    posts?.map(post => {
                            return (<PostCard
                                key={post.post_id}
                                postId={post.post_id}
                                userId={linkirUser.userId}
                                username={post.username}
                                pictureUrl={post.picture_url}
                                description={post.description}
                                likes={post.likes}
                                preview={post.preview}
                            />)
                            })

            }

        </>

    )
};

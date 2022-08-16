import PostCard from "../postCards/PostCard";
import PostSkeleton from "../skeletonComponents/PostSkeleton";
import StatusCodeScreen from "../timelines/StatusCodeScreen";
import useLocalStorage from "../../hooks/useLocalStorage";
import UserContext from "../../contexts/UserContext";
<<<<<<< HEAD
import { useContext, useEffect } from "react";
=======
import ClickedUserContext from "../../contexts/ClickedUserContext";
import Swal from "sweetalert2";
import { useContext } from "react";
>>>>>>> 1acf95fb4fe0acb44c8562e26b3db3c720255521

import InfiniteScroll from "react-infinite-scroll-component";
import handleGetPostsRefresh from "../../handlers/handleGetPostsRefresh";


<<<<<<< HEAD
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
=======
export default function RenderPosts({ posts, isLoading, statusCode, setPosts, isRefreshing}) {

    const [linkirUser, setLinkirUser] = useLocalStorage("linkrUser", "");
    const { url, user } = useContext(UserContext);
    const {clickedUserPicture, setClickedUserPicture, clickedUseName, setClickedUseName,
        clickedUserId, setClickedUserId, followersList, setFollowersList, setIsUserPosts, isFollowed, setIsFollowed} = useContext(ClickedUserContext);


    async function getUserFollowers(followedId){
       try{
        const resp = await axios.get(`${url}/follow/${followedId}`);
        setFollowersList(resp.data);
        if(resp.data.find(follower => follower.follower_id === linkirUser.userId)){
            setIsFollowed(true);
        }
        else setIsFollowed(false);
       }catch(err){
        console.log(err);
       }
    }


    async function onClickUser(userId){

        try{
            const promise = await axios.get(`${url}/user/${userId}`, linkirUser.token);
            setClickedUseName(promise.data[0].username);
            setClickedUserPicture(promise.data[0].picture_url);
            setClickedUserId(promise.data[0].user_id);
            setPosts(promise.data);
            setIsUserPosts(true);
            getUserFollowers(promise.data[0].user_id);
            


           
        }catch(e){
            Swal.fire({
                icon: 'error',
                titleText: `Falha de autenticação`,
                text: `Você precisa estar logado!`,
                color: `#FFFFFF`,
                background: `#333333`,
                confirmButtonColor:`#1877F2`,
                padding: `10px`,
                timer: 4000,
                timerProgressBar: true,
                timerProgressBar: `#ffffff`
            })
        }
       
    }

>>>>>>> 1acf95fb4fe0acb44c8562e26b3db3c720255521

    // }


    return (
        <>
            {
                isLoading 
                    ? <PostSkeleton />
<<<<<<< HEAD
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
=======
                    :   statusCode
                        ?    <StatusCodeScreen statusCode={statusCode} />
                        :
                            posts?.map(post => {
                               
                                return (
                                    <PostCard
                                        key={post.post_id}
                                        postId={post.post_id}
                                        userId={linkirUser.userId}
                                        username={post.username}
                                        pictureUrl={post.picture_url}
                                        description={post.description}
                                        likes={post.likes}
                                        preview={post.preview}
                                        onclick={() => onClickUser(post.user_id)}
                                     />
                                )
>>>>>>> 1acf95fb4fe0acb44c8562e26b3db3c720255521
                            })

            }

        </>

    )
};

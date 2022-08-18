import { useState, useEffect, useContext, useRef, useCallback } from "react";//useContext,

import PostCard from "../postCards/PostCard";
import PostSkeleton from "../skeletonComponents/PostSkeleton";
import StatusCodeScreen from "../timelines/StatusCodeScreen";
import useLocalStorage from "../../hooks/useLocalStorage";
import UserContext from "../../contexts/UserContext";
import ClickedUserContext from "../../contexts/ClickedUserContext";
import Swal from "sweetalert2";
import axios from "axios";

import styled from "styled-components";
import usePostSearch from "../../hooks/usePostSearch";
import { TailSpin} from "react-loader-spinner";

export default function RenderPosts({setIsPostLoaded, isPageLoaded, endPoint }) {

    const [linkirUser, setLinkirUser] = useLocalStorage("linkrUser", "");
    const { url, user } = useContext(UserContext);
    // const {clickedUserPicture, setClickedUserPicture, clickedUseName, setClickedUseName,
    //     clickedUserId, setClickedUserId, followersList, setFollowersList, setIsUserPosts, isFollowed, setIsFollowed} = useContext(ClickedUserContext);


    // async function getUserFollowers(followedId){
    //    try{
    //     const resp = await axios.get(`${url}/follow/${followedId}`);
    //     setFollowersList(resp.data);
    //     if(resp.data.find(follower => follower.follower_id === linkirUser.userId)){
    //         setIsFollowed(true);
    //     }
    //     else setIsFollowed(false);
    //    }catch(err){
    //     console.log(err);
    //    }
    // }


    // async function onClickUser(userId){

    //     try{
    //         const promise = await axios.get(`${url}/user/${userId}`, linkirUser.token);
    //         setClickedUseName(promise.data[0].username);
    //         setClickedUserPicture(promise.data[0].picture_url);
    //         setClickedUserId(promise.data[0].user_id);
    //         setPosts(promise.data);
    //         setIsUserPosts(true);
    //         getUserFollowers(promise.data[0].user_id);
            
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
    const [pageNumber, setPageNumber] = useState(0);

    const observer = useRef();

    const  {refresh, error, posts, hasMore} = usePostSearch(endPoint, pageNumber, setIsPostLoaded);

    const lastPostElementRef = useCallback( node => {
        if (refresh) return 
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore){
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            };
        })
        if(node) observer.current.observe(node);

    }, [refresh, hasMore]);

    return (
        <>
            {
                !isPageLoaded
                ? <PostSkeleton />
                :
                <>
                    {posts?.map( (post) => {
                        return(
                            <PostCard
                                key={post.post_id}
                                postId={post.post_id}
                                userId={linkirUser.userId}
                                username={post.username}
                                pictureUrl={post.picture_url}
                                description={post.description}
                                likes={post.likes}
                                preview={post.preview}
                                // onclick={() => onClickUser(post.user_id)}
                            />
                        )
                    })}
                    {/* <StatusCodeScreen statusCode={statusCode}/> */}
                    {
                        !error
                        ?
                        <RefreshContainer ref={lastPostElementRef}>
                            <LoadingContainer>
                                <TailSpin
                                    height="110"
                                    width="110"
                                    color="#6D6D6D"
                                />
                                <LinkrLogo>
                                    lkr
                                </LinkrLogo>
                            </LoadingContainer>

                            Loading more posts...
                         </RefreshContainer>
                        :
                        <RefreshContainer>
                            That's all the posts from your friends
                        </RefreshContainer>
                    }
                </>
            }
        </>

    )
};

const LoadingContainer = styled.div`
    display:flex;
    position: relative;
    align-items:center;
    justify-content:center;
    margin-bottom: 20px;
`

const LinkrLogo = styled.div`
    display:flex;
    position:absolute;
    font-family: 'Passion One';
    font-style: normal;
    font-weight: 700;
    font-size: 50px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
`


const RefreshContainer = styled.section`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction: column;
    margin: 50px 0;
    text-align: center;
    font-weight: 400;
    font-size: 22px;
    line-height: 26px;
    letter-spacing: 0.05em;
    color: #6D6D6D;
    word-break: break-word;
`
import { useState, useEffect, useContext, useRef, useCallback, useLayoutEffect } from "react";
import PostCard from "../postCards/PostCard";
import PostSkeleton from "../skeletonComponents/PostSkeleton";
import StatusCodeScreen from "../timelines/StatusCodeScreen";
import useLocalStorage from "../../hooks/useLocalStorage";
import UserContext from "../../contexts/UserContext";
import styled from "styled-components";
import usePostSearch from "../../hooks/usePostSearch";
import { TailSpin} from "react-loader-spinner";
import LoadNewPosts from "../timelines/LoadNewPosts";
import useInterval from "react-useinterval";
import useNewPostsSearch from "../../hooks/useNewPostsSearch";

export default function RenderPosts({setIsPostLoaded, isPageLoaded, endPoint, params, page, setPage }) {
    const { url } = useContext(UserContext);
    const linkrUser = useLocalStorage("linkrUser", "")[0]
    const token = linkrUser.token;
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    //Refresh Hook
    const { newPosts, haveNewPosts, setRefreshLastPost, setToggleRefresh, toggleRefresh, setPostsRefreshed } = useNewPostsSearch( url, endPoint, token, params );

    const FIFTEEN_SECONDS = 15000;
    useInterval(() => setToggleRefresh(!toggleRefresh), FIFTEEN_SECONDS);

    //Infinite Hook
    const {
        refresh, error, posts, hasMore, statusCode, setPosts
    } = usePostSearch(
        endPoint, page , setIsPostLoaded, params, setRefreshLastPost
    );

    const observer = useRef();
    const lastPostElementRef = useCallback( node => {
        if (refresh) return 
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore){
                setPage(prevPageNumber => prevPageNumber + 1)
            };
        })
        if(node) observer.current.observe(node);
    }, [refresh, hasMore]);

    // Refresh Function
    const refreshPosts = () => {
        setPosts( ( loadedPosts ) => ([...newPosts, ...loadedPosts]) )
        scrollToTop();
        setRefreshLastPost(newPosts[0].id)
        setPostsRefreshed( (toggle) => !toggle);
    }

    return (
        <>
            {
                !isPageLoaded
                ? <PostSkeleton />
                :
                statusCode
                ? <StatusCodeScreen statusCode={statusCode} />
                :
                <>  
                    {
                        haveNewPosts
                        ?   <LoadNewPosts refreshClick={refreshPosts} number={newPosts.length}/>
                        :   <></>
                    }
                    {posts?.map( (post) => {
                        console.log(post);
                        return(
                            <PostCard
                                key={post.id}
                                postId={post.post_id}
                                userId={post.user_id}
                                username={post.username}
                                pictureUrl={post.picture_url}
                                description={post.description}
                                likes={post.likes}
                                preview={post.preview}
                                post={post}
                                repost={ post.repost_post ? {
                                    repostUserId: post.repost_user,
                                    repostUsername: post.repost_username
                                } : false}
                                repostCount={post.reposts_count}
                                // onclick={() => onClickUser(post.user_id)}
                            />
                        )
                    })}
                    {
                        !error
                        ?
                        <RefreshContainer >
                            <LoadingContainer>
                                <TailSpin
                                    height="110"
                                    width="110"
                                    color="#6D6D6D"
                                />
                                <LinkrLogo ref={lastPostElementRef}>
                                    lkr
                                </LinkrLogo>
                            </LoadingContainer>
                            Loading more posts...
                         </RefreshContainer>
                        :
                        <RefreshContainer>
                            That's all the posts from your friends
                            <ScrollToTopButton onClick={scrollToTop}>
                                Back to top
                            </ScrollToTopButton>
                        </RefreshContainer>
                    }
                </>
            }
        </>

    )
};

const ScrollToTopButton = styled.button`
    display:flex;
    align-items:center;
    justify-content:center;
    margin: 10px 0px;
    height: 40px;
    width: 150px;
    background-color: #1877F2;
    border-radius: 10px;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
`

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
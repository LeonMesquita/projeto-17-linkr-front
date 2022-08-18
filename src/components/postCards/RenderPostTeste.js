import { useState, useEffect, useContext, useRef, useCallback } from "react";//useContext,

import PostCard from "./PostCard";
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

export default function RenderPostsTeste({setIsPostLoaded, isPageLoaded, endPoint }) {

    const [linkirUser, setLinkirUser] = useLocalStorage("linkrUser", "");
    const { url, user } = useContext(UserContext);
    const [pageNumber, setPageNumber] = useState(0);
    const [ lastPost, setLastPost ] = useState(undefined);

    const observer = useRef();

    const  {refresh, error, posts, hasMore} = usePostSearch(endPoint, pageNumber,lastPost, setLastPost, setIsPostLoaded);

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

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
        behavior: "smooth"
        });
    }

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
import PostCard from "../postCards/PostCard";
import PostSkeleton from "../skeletonComponents/PostSkeleton";
import StatusCodeScreen from "../timelines/StatusCodeScreen";
import useLocalStorage from "../../hooks/useLocalStorage";
import UserContext from "../../contexts/UserContext";
import { useContext, useEffect } from "react";
import ClickedUserContext from "../../contexts/ClickedUserContext";
import Swal from "sweetalert2";
import axios from "axios";
import styled from "styled-components";
export default function RenderPosts({isLoading, statusCode, isRefreshing}) {
    const {isUserPosts} = useContext(ClickedUserContext);
    const {posts} = useContext(UserContext);
    return (
        <MarginContainer isUserPosts={isUserPosts}>
            {
                isLoading 
                    ? <PostSkeleton />
                    :   statusCode
                        ?    <StatusCodeScreen statusCode={statusCode} />
                        :
                            posts?.map(post => {
                                console.log(post)
                               
                                return (
                                    <PostCard
                                        key={post.post_id}
                                        postId={post.post_id}
                                        username={post.username}
                                        pictureUrl={post.picture_url}
                                        description={post.description}
                                        likes={post.likes}
                                        preview={post.preview}
                                        poster_id={post.user_id}
                                     />
                                )
                            })

            }

        </MarginContainer>

    )
};


const MarginContainer = styled.div`
    margin-top: ${props => (props.isUserPosts ? `30px` : `250px`)};

@media (max-width: 611px){
    margin-top: ${props => (props.isUserPosts ? `0` : `360px`)};
}
`
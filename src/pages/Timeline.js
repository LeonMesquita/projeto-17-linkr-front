import { useState, useEffect } from "react";//useContext,
//import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

//import TokenContext from "../contexts/TokenContext";
//import UserContext from "../contexts/UserContext";

import Header from "../components/Header.js";
import PostCard from "../components/postCards/PostCard.js";
import PublishCard from "../components/postCards/PublishCard.js";

export default function Timeline(){

    const [ posts, setPosts ] = useState([]);
    // const { token, setToken } = useContext(TokenContext);

     const { url, user, setUser } = useContext(UserContext);
     console.log(user);

    // const navigate = useNavigate();
    // pass the link directly

    useEffect(() => {
        const promise = axios.get(`https://linkr-back-api.herokuapp.com/posts`);
        promise.then((res)=>{
            setPosts(res.data);
        });
        promise.catch(() => {

        });
    }, []);

    return(
        <>
            <Header>
            </Header>
            
            <Feed>
                <Title>
                    timeline
                </Title>
                <PublishCard></PublishCard>
                {posts.map((post)=>{
                    return  <PostCard key={post.created_at} description={post.description} url={post.url}></PostCard>
                    }
                )};

            </Feed>
           
        </>
    )
};

const Feed = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Title = styled.div`
    display:flex;
    width: 611px;

    justify-content: left;

    margin-top: 82px;
    margin-bottom: 25px;
    margin-left: 0px;
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;

    /* identical to box height */

    color: #FFFFFF;

    @media screen and (max-width: 630px){
        margin-left: 25px;
        width: 100%;
    }
`;
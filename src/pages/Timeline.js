import { useState, useEffect } from "react";//useContext,

//import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

//import TokenContext from "../contexts/TokenContext";
//import UserContext from "../contexts/UserContext";

import TrendingSideBar from "../components/TrendingSidebar";
import Header from "../components/Header.js";
import PostCard from "../components/postCards/PostCard.js";
import PublishCard from "../components/postCards/PublishCard.js";

export default function Timeline(){

    const [ posts, setPosts ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    // const { token, setToken } = useContext(TokenContext);
    //const { url, user, setUser } = useContext(UserContext);
     
    // const navigate = useNavigate();
    // pass the link directly
    
    useEffect(() => {
        const promise = axios.get(`https://linkr-back-api.herokuapp.com/posts`);
        promise.then((res)=>{
            setPosts(res.data);
            setIsLoading(false);
        });
        promise.catch((e) => {
            alert(e)
        });
    }, []);
//           // ADICIONAR TRENDINGS NA SIDEBAR 
    return(
        <>
            <Header/>
            <Container>
            {isLoading ?
                (<Title>Loading . . .</Title>)
                :
                (<>{posts.length > 0 ?  
                    (<>
                    <Feed>
                        <Title>
                            timeline
                        </Title>
                        <PublishCard/>
                        {posts.map( post => {
                            return (<PostCard key={post.post_id} author_pic={post.picture_url} author={post.username} description={post.description} url={post.url}></PostCard>
                            )
                            })  }  
                    </Feed>
                    <TrendingSideBar trendings={["arroz","react","driven"]}/> 
                    </>)
                    :
                    (<Title>There are no posts yet . . .</Title>) 
                }</>)
            }
            </Container>
        </>
    )
};

const Container =styled.div`
    display: flex;
    justify-content: center;
`
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
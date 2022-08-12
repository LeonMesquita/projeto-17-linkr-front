import { useState, useEffect, useContext } from "react";//useContext,

//import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";

import TokenContext from "../contexts/TokenContext";
import UserContext from "../contexts/UserContext";

import TrendingSideBar from "../components/TrendingSidebar";
import Header from "../components/Header.js";
import PostCard from "../components/postCards/PostCard.js";
import PublishCard from "../components/postCards/PublishCard.js";

export default function Timeline(){

    const [ posts, setPosts ] = useState([]);
     const { token, setToken, authorization } = useContext(TokenContext);
    const { url, user, setUser } = useContext(UserContext);
    const [isUserPosts, setIsUserPosts] = useState(false);
    const [clickedUserPicture, setClickedUserPicture] = useState('');
    const [clickedUseName, setClickedUseName] = useState('');

    // const navigate = useNavigate();
    // pass the link directly
    let isLoading;
    useEffect(() => {
        isLoading=true;
        const promise = axios.get(`${url}/posts`);
        promise.then((res)=>{
            setPosts(res.data);
            console.log(res.data)
            isLoading=false;
        });
        promise.catch((e) => {
           // alert(e)
        });
    }, []);
//           // ADICIONAR TRENDINGS NA SIDEBAR 
//
    async function onClickUser(userId){
        try{
            const promise = await axios.get(`${url}/user/${userId}`, authorization);
            setClickedUseName(promise.data[0].username);
            setClickedUserPicture(promise.data[0].picture_url);
            setPosts(promise.data);
            setIsUserPosts(true);
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
                    {isUserPosts ? null
                    :
                        <Title>
                            timeline
                        </Title>
                    }
                        {isUserPosts ? 
                        <UserTitle>
                            <img src={clickedUserPicture} alt=""/>
                            <h1>{clickedUseName}'s posts</h1>
                        </UserTitle>
                         : 
                        <PublishCard/>}
                        {posts.map( post => {
                            return (<PostCard key={post.post_id} author_pic={post.picture_url} author={post.username} description={post.description} postUrl={post.url} postId={post.post_id} userId={user.userId} onclick={() => onClickUser(post.user_id)}></PostCard>
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

    input{
    background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
}
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


const UserTitle = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: 10px;
    margin-top: 130px;
    margin-bottom: 20px;

    img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 20px;
    }

    h1{
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        color: #FFFFFF;
    }
`
import { useState, useEffect, useContext } from "react";//useContext,
import { useNavigate } from "react-router-dom";
import axios from "axios";

import UserContext from "../contexts/UserContext";

import handleGetTrendings from "../handlers/handleGetTrendings";
import handleTokenVerify from "../handlers/handleGetToken";
import handleAlertNotifications from "../handlers/handleAlertNotifications";

import Header from "../components/Header"
import PageTitle from "../components/timelines/titlePage";
import PublishCard from "../components/postCards/PublishCard"
import RenderPosts from "../components/postCards/RenderPosts";
import TrendingSideBar from "../components/TrendingSidebar";

import { Body, Main, Feed, LeftSide, RightSide } from "../components/timelines/style";

export default function Timeline() {
    const { url } = useContext(UserContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const [posts, setPosts] = useState([]);
    const [trendings, setTrendings] = useState([])
    const [statusCode, setStatusCode] = useState(false);

    const [isUserPosts, setIsUserPosts] = useState(false);
    const [clickedUserPicture, setClickedUserPicture] = useState('');
    const [clickedUseName, setClickedUseName] = useState('');

    // //           // ADICIONAR TRENDINGS NA SIDEBAR 
    // //
    // async function onClickUser(userId) {
    //     try {
    //         const promise = await axios.get(`${url}/user/${userId}`, authorization);
    //         setClickedUseName(promise.data[0].username);
    //         setClickedUserPicture(promise.data[0].picture_url);
    //         setPosts(promise.data);
    //         setIsUserPosts(true);
    //     } catch (e) {
    // }

    const returnToLogin = (result) => {
        if((result.isConfirmed === true || result.isDismissed === true)) return navigate("/");
    }

    const handleGetPost =  (token) => { //Recebe os Posts
        const promise = axios.get(`${url}/posts`);
        promise.then( (res) => {
            setPosts(res.data)
            handleGetTrendings(url, token, setTrendings, setIsLoading) //Recebe os Trendigs, e tbm o loading, por ser o último a carregar, ele receber o setIsLoading, para a página inteira carregar junto!
        })
        promise.catch( (e) => {
            console.log(e)
            setStatusCode(e.response.status)
            handleGetTrendings(url, token, setTrendings, setIsLoading)
        });
    }

    useEffect(() => {
        const token = handleTokenVerify()
        if (!token) return handleAlertNotifications(
            'error', 
            `Aparentemente você não esta logado(a) :(`,
            `Retornando para a página de login`, 
            4000
            ).then(returnToLogin)
        handleGetPost(token)
    }, []);

    return (
        <Body>
            <Header isLoading={isLoading}/>
            <Main>
                <PageTitle title={isUserPosts ? `${clickedUseName}'s posts` : "timeline"} isLoading={isLoading} isUserPosts={isUserPosts} clickedUserPicture={clickedUserPicture}/>
                <Feed>
                    <LeftSide>
                        {isUserPosts ? null : <PublishCard isLoading={isLoading}/>}
                        
                        <RenderPosts isLoading={isLoading} posts={posts} statusCode={statusCode} setClickedUseName={setClickedUseName}
                        setClickedUserPicture={setClickedUserPicture} setPosts={setPosts} setIsUserPosts={setIsUserPosts}/>
                    </LeftSide>
                    <RightSide>
                        <TrendingSideBar trendings={trendings} isLoading={isLoading} />
                    </RightSide>
                </Feed>
            </Main>
        </Body>
    )
};


{/* <Feed>
<LeftSide>
    {
        isLoading
            ?
            <>
                <PostSkeleton />
            </>
            : statusCode
                ? <StatusCodeScreen statusCode={statusCode} />
                : <RenderPosts posts={posts} />
    }
</LeftSide>
<RightSide>
    <TrendingSideBar trendings={trendings} isLoading={isLoading} />
</RightSide>
</Feed> */}
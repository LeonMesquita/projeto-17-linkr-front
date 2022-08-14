import { useState, useEffect, useContext } from "react";//useContext,
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import TokenContext from "../contexts/TokenContext";
import UserContext from "../contexts/UserContext";

import handleGetTrendings from "../handlers/handleGetTrendings";
import handleTokenVerify from "../handlers/handleGetToken";
import handleAlertNotifications from "../handlers/handleAlertNotifications";

import Header from "../components/Header.js";
import TimelineTitleSkeleton from "../components/timelines/titlePage";
import PostSkeleton from "../components/postCards/Skeletons/PostSkeleton";
import PublishSkeleton from "../components/postCards/Skeletons/PublishSkeleton";
import PublishCard from "../components/postCards/PublishCard"
import StatusCodeScreen from "../components/timelines/StatusCodeScreen";
import RenderPosts from "../components/postCards/RenderPosts";
import TrendingSideBar from "../components/TrendingSidebar";

import { Body, Main, TimelineTitle, Feed, LeftSide, RightSide } from "../components/timelines/style";


export default function Timeline() {

    const { url } = useContext(UserContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const [posts, setPosts] = useState([]);
    const [trendings, setTrendings] = useState([])
    const [statusCode, setStatusCode] = useState(false);






    // const [isUserPosts, setIsUserPosts] = useState(false);
    // const [clickedUserPicture, setClickedUserPicture] = useState('');
    // const [clickedUseName, setClickedUseName] = useState('');

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

    const AlertNotification = handleAlertNotifications(
            'error', 
            `Aparentemente você não esta logado(a) :(`,
            `Retornando para a página de login`, 
            4000, 
            'ToSignIn'
        ).then( (result) => {
            if((result.isConfirmed === true || result.isDismissed === true)) return navigate("/");
        });

    const handleGetPost = async (token) => { //Recebe os Posts
        const promise = await axios.get(`${url}/posts`);
        promise.then( (res) => {
            setPosts(promise.data)
            handleGetTrendings(url, token, setTrendings, setIsLoading) //Recebe os Trendigs, e tbm o loading, por ser o último a carregar, ele receber o setIsLoading, para a página inteira carregar junto!
        })
        promise.catch( (e) => AlertNotification);
    }

    useEffect(() => {
        const token = handleTokenVerify()
        if (!token) return AlertNotification
        handleGetPost(token)
    }, []);

    return (
        <Body>
            {/* {
                 isLoading
               ?  <></>
                 : <Header />
            }  */}
            <Main>
                {
                    isLoading
                        ? <TimelineTitleSkeleton />
                        : <TimelineTitle>timeline</TimelineTitle>
                }
                <Feed>
                    <LeftSide>
                        {
                            isLoading
                                ?
                                <>
                                    <PublishSkeleton />
                                    <PostSkeleton />
                                </>
                                : statusCode
                                    ?
                                    <>
                                        <StatusCodeScreen statusCode={statusCode} />
                                    </>
                                    :
                                    <>
                                        <PublishCard />
                                        <RenderPosts posts={posts} />
                                    </>
                        }
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
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import UserContext from "../contexts/UserContext";
import handleAlertNotifications from "../handlers/handleAlertNotifications";
import handleGetTrendings from "../handlers/handleGetTrendings";
import handleTokenVerify from "../handlers/handleGetToken";

import Header from "../components/Header";
import PageTitle from "../components/timelines/titlePage";
import RenderPosts from "../components/postCards/RenderPosts";
import TrendingSideBar from "../components/TrendingSidebar";

import { Body, Main, Feed, LeftSide, RightSide } from "../components/timelines/style";

export default function HashtagTimeline() {
    const { url } = useContext(UserContext);
    const { hashtag } = useParams();
    const navigate = useNavigate()
    const [posts, setPosts] = useState([]);
    const [trendings, setTrendings] = useState([])
    const [statusCode, setStatusCode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleGetPosts = (token) => {
        console.log(token)
        setIsLoading(true);
        const promisse = axios.get(`${url}/hashtag/${hashtag}`, token)
        const ONE_SECOND = 1000;
        promisse.then((res) => {
            setPosts(res.data);
            handleGetTrendings(url, token, setTrendings, setIsLoading)
        })
        promisse.catch((e) => {
            setStatusCode(e.response.status)
            handleGetTrendings(url, token, setTrendings, setIsLoading)
        });
    }

    const returnToLogin = (result) => {
        if((result.isConfirmed === true || result.isDismissed === true)) return navigate("/");
    }
    useEffect(() => {
        const token = handleTokenVerify()
        if (!token) return handleAlertNotifications(
            'error', 
            `Aparentemente você não esta logado(a) :(`,
            `Retornando para a página de login`, 
            4000
            ).then(returnToLogin)
        handleGetPosts(token)

    }, [hashtag]);



    return (
        <Body>
            <Header isLoading={isLoading}/>
            <Main>
                <PageTitle title={`# ${hashtag}`} isLoading={isLoading}/>
                <Feed>
                    <LeftSide>
                        <RenderPosts isLoading={isLoading} posts={posts} statusCode={statusCode}/>
                    </LeftSide>
                    <RightSide>
                        <TrendingSideBar trendings={trendings} isLoading={isLoading} />
                    </RightSide>
                </Feed>
            </Main>
        </Body>
    )
};


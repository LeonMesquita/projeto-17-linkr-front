import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import UserContext from "../contexts/UserContext";
import handleGetTrendings from "../handlers/handleGetTrendings";
import handleAlertNotifications from "../handlers/handleAlertNotifications";
import handleTokenVerify from "../handlers/handleGetToken";

import PageTitle from "../components/timelines/titlePage";
import RenderPosts from "../components/postCards/RenderPosts";
import TrendingSideBar from "../components/TrendingSidebar";

import { Body, Main, Feed, LeftSide, RightSide } from "../components/timelines/style";
import Header from "../components/Header";

export default function UserTimeline(){
    const { url } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)
    const [trendings, setTrendings] = useState([]);
    const [posts, setPosts] = useState([]);
    const [statusCode, setStatusCode] = useState(false);

    const handleGetUserPosts = (token) => {
        const promisse = axios.get(`${url}/user/${id}`, token);
        promisse.then((res) => {
            setPosts(res.data);
            handleGetTrendings(url, token, setTrendings, setIsLoading);
        });
        promisse.catch((e) => {
            setStatusCode(e.response.status)
            handleGetTrendings(url, token, setTrendings, setIsLoading)
            setIsLoading(false);
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
        handleGetUserPosts(token);
    }, []);

    return(
        <Body>
            <Header isLoading={isLoading} />
            <Main>
                <PageTitle title={posts[0]?.username} isLoading={isLoading}/>
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


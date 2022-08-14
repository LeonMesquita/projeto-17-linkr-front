import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import UserContext from "../contexts/UserContext";

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
    const handleGetTrendings = (token) => {
        const promise = axios.get(`${url}/trendings`, token);
        promise.then((res) => {
            setTrendings(res.data);
            setIsLoading(false)
        });
    };

    const [posts, setPosts] = useState([]);
    const [statusCode, setStatusCode] = useState(false);
    const handleGetUserPosts = (token) => {
        const promisse = axios.get(`${url}/user/${id}`, token);
        promisse.then((res) => {
            setPosts(res.data);
            handleGetTrendings(token);
        });
        promisse.catch((e) => {
            setStatusCode(e.response.status)
            handleGetTrendings(token)
            setIsLoading(false);
        });
    }

    useEffect(() => {
        const linkrStorage = JSON.parse(localStorage.getItem("linkrUser")).token
        if(linkrStorage.length === 0) return navigate(`${url}/singin`);
        handleGetUserPosts(linkrStorage);
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


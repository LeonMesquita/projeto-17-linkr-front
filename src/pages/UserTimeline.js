import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import UserContext from "../contexts/UserContext";

import PostSkeleton from "../components/postCards/Skeletons/PostSkeleton";
import StatusCodeScreen from "../components/timelines/StatusCodeScreen";
import RenderPosts from "../components/postCards/RenderPosts";
import TrendingSideBar from "../components/TrendingSidebar";

import { Body, Main, TimelineTitle, Feed, LeftSide, RightSide } from "../components/timelines/style";

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
        <Main>
            <TimelineTitle># {posts[0].username}</TimelineTitle>
            <Feed>
                <LeftSide>
                    {
                        isLoading
                            ?
                            <>
                                <PostSkeleton />
                            </>
                            :   statusCode
                                ?  <StatusCodeScreen statusCode={statusCode}/>
                                :  <RenderPosts posts={posts}/>
                    }
                </LeftSide>
                <RightSide>
                    <TrendingSideBar trendings={trendings} isLoading={isLoading}/>
                </RightSide>
            </Feed>
        </Main>
    </Body>)
};


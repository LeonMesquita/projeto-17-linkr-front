import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import UserContext from "../contexts/UserContext";

import Header from "../components/Header";
import RenderPosts from "../components/postCards/RenderPosts";
import TrendingSideBar from "../components/TrendingSidebar";
import PostSkeleton from "../components/postCards/Skeletons/PostSkeleton";
import StatusCodeScreen from "../components/timelines/StatusCodeScreen";

import { Body, Main, TimelineTitle, Feed, LeftSide, RightSide } from "../components/timelines/style";

export default function HashtagTimeline() {
    const linkrStorage = JSON.parse(localStorage.getItem("linkrUser")).token
    const { url } = useContext(UserContext);
    const { hashtag } = useParams();

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
            handleGetTrendings(token)
        })
        promisse.catch((e) => {
            setStatusCode(e.response.status)
            handleGetTrendings(token)
            setIsLoading(false);
        });
    }

    const handleGetTrendings = (token) => {
        console.log(linkrStorage)
        const promise = axios.get(`${url}/trendings`, token);
        promise.then((res) => {
            console.log(res)
            setTrendings(res.data);
            setIsLoading(false)
        })
    }

    useEffect(() => {
        handleGetPosts(linkrStorage)
    }, []);

    return (
        <Body>
            <Header />
            <Main>
                <TimelineTitle># {hashtag}</TimelineTitle>
                <Feed>
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
                </Feed>
            </Main>
        </Body>
    )
};


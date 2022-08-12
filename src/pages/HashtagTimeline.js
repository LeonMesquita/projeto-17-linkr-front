import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import TokenContext from "../contexts/TokenContext";
import UserContext from "../contexts/UserContext";

import Header from "../components/Header";
import PublishCard from "../components/postCards/PublishCard";
import RenderPosts from "../components/postCards/RenderPosts";
import TrendingSideBar from "../components/TrendingSidebar";

import { Body, Main, TimelineTitle, Feed, LeftSide,RightSide}from "../components/timelines/style";

export default function HashtagTimeline(){

    const { url } = useContext(UserContext);
    const { token } = useContext(TokenContext);

    const {hashtag} = useParams();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleGetPosts = () => {
        //Quando rotas linkadas mudar para
        //const promisse = axios.get(`${url}/hashtag/${hashtag}`, token)
        setIsLoading(true);
        const promisse = axios.get(`https://linkr-back-api.herokuapp.com/posts`);
        promisse.then((res) => {
            setPosts(res.data);
            setIsLoading(false);
        })
        promisse.catch((e) => {
            alert(e)
            setIsLoading(false);
        });
    }

    useEffect( () => {
        handleGetPosts()
    }, []);

    return(
        <Body>
            <Header/>
            <Main>
                <TimelineTitle>{hashtag}</TimelineTitle>
                <Feed>
                    <LeftSide>
                        <PublishCard />
                        <RenderPosts posts={posts}/>
                    </LeftSide>
                    <RightSide>
                        <TrendingSideBar/>
                    </RightSide>
                </Feed>
            </Main>
        </Body>
    )
};


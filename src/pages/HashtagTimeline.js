import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import TokenContext from "../contexts/TokenContext";
import UserContext from "../contexts/UserContext";

import Header from "../components/Header";
import PublishCard from "../components/postCards/PublishCard";
import RenderPosts from "../components/postCards/RenderPosts";
import TrendingSideBar from "../components/TrendingSidebar";

import { Body, Main, TimelineTitle, Feed, LeftSide,RightSide, PostSection}from "../components/timelines/style";

export default function HashtagTimeline(){
    const {hashtag} = useParams();
    const array = [];
    // const { token, setToken } = useContext(TokenContext);
    // const { url, setUrl, user, setUser } = useContext(UserContext);
    // const navigate = useNavigate();


    // useEffect(() => {
    //     const promisse = axios.(`${url}/`, );
    //     promisse.then((res)=>{

    //     });
    //     promisse.catch(() => {

    //     });
    // }, []);

    return(
        <Body>
            <Header/>
            <Main>
                <TimelineTitle>{hashtag}</TimelineTitle>
                <Feed>
                    <LeftSide>
                        <PublishCard />
                        <RenderPosts posts={array}/>
                    </LeftSide>
                    <RightSide>
                        <TrendingSideBar/>
                    </RightSide>
                </Feed>
            </Main>
        </Body>
    )
};


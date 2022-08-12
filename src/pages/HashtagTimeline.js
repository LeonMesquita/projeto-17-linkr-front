import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import TokenContext from "../contexts/TokenContext";
import UserContext from "../contexts/UserContext";

import Header from "../components/Header";
import PublishCard from "../components/postCards/PublishCard";
import TrendingSideBar from "../components/TrendingSidebar";

import { Body, Main, Feed, TimelineTitle } from "../components/timelines/style";

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
                    <div className="leftSide">
                        <PublishCard />
                    </div>
                    <div className="rightSide">
                        <TrendingSideBar/>
                    </div>
                </Feed>
            </Main>
        </Body>
    )
};


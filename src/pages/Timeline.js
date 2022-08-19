import { useState, useEffect, useContext, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAlert from "../hooks/useAlert";


import handleTokenVerify from "../handlers/handleGetToken";

import Header from "../components/Header"
import PageTitle from "../components/timelines/titlePage";
import PublishCard from "../components/postCards/PublishCard"
import RenderPosts from "../components/postCards/RenderPosts";
import TrendingSideBar from "../components/TrendingSidebar";
import ClickedUserContext from "../contexts/ClickedUserContext";


import { Body, Main, Feed, LeftSide, RightSide } from "../components/timelines/style";
import styled from "styled-components";



export default function Timeline() {

    const [ isHashtagLoaded, setIsHashtagLoaded] = useState(false);
    const [ isPostLoaded, setIsPostLoaded ] = useState(false);
    const [ isPageLoaded, setIsPageLoaded ] = useState(false)
    const [ page, setPage ] = useState(0);
    const {setIsUserPosts} = useContext(ClickedUserContext);
    const navigate = useNavigate();

    const InvalidTokenAlert = () => useAlert({
        icon:"error", 
        titleText:"Aparentemente você não esta logado(a) :(",
        text:"Retornando para a página de login"
    }, "timer", {
        timer: 4000
    }).then( result => {
        if((result.isConfirmed === true || result.isDismissed === true)) return navigate("/");
    })

    useEffect(() => {
        const token = handleTokenVerify();
        if (!token) return InvalidTokenAlert();
        setIsPageLoaded(false);
        setIsHashtagLoaded(false);
        setIsPostLoaded(false);
        setPage(0);
        setIsUserPosts(false);
    }, [])

    useEffect( () => {
        const HALF_SECOND = 500;
        if(isPostLoaded && isHashtagLoaded){
            setTimeout( () => setIsPageLoaded(true), HALF_SECOND);
        }
    }, [isPostLoaded, isHashtagLoaded])


    return (
        <Body>
            <Header isPageLoaded={isPageLoaded}/>
            <Main>
                <PageTitle 
                    title="timeline" 
                    isPageLoaded={isPageLoaded}
                />
                <Feed>
                    <LeftSide>
                            <PublishCard 
                                isPageLoaded={isPageLoaded}
                            />
                        <RenderPosts 
                            setIsPostLoaded={setIsPostLoaded} 
                            isPageLoaded={isPageLoaded} 
                            endPoint={`timeline/posts`} 
                            page={page} 
                            setPage={setPage}
                        />
                    </LeftSide>
                    <RightSide>
                        <TrendingSideBar 
                            setIsHashtagLoaded={setIsHashtagLoaded} 
                            isPageLoaded={isPageLoaded} 
                        />
                    </RightSide>
                </Feed>
            </Main>
        </Body>
    )
};



const FixedPublishContainer = styled.div`
    position: fixed;
    z-index: 1;
    top: 0;
    background-color: #333333;
    padding-top: 100px;
    max-width: 611px;

    @media screen and (max-width: 611px){
        width: 100%;
  
    }
    
`
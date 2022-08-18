import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAlert from "../hooks/useAlert";

import UserContext from "../contexts/UserContext";
import handleTokenVerify from "../handlers/handleGetToken";

import Header from "../components/Header";
import PageTitle from "../components/timelines/titlePage";
import RenderPosts from "../components/postCards/RenderPosts";
import TrendingSideBar from "../components/TrendingSidebar";

import { Body, Main, Feed, LeftSide, RightSide } from "../components/timelines/style";

export default function HashtagTimeline() {
    const { hashtag } = useParams();
    const navigate = useNavigate()

    const [ isHashtagLoaded, setIsHashtagLoaded] = useState(false);
    const [ isPostLoaded, setIsPostLoaded ] = useState(false);
    const [ isPageLoaded, setIsPageLoaded ] = useState(false)
    const [ page, setPage ] = useState(0)

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
    }, [hashtag])

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
                <PageTitle title={`# ${hashtag}`} isPageLoaded={isPageLoaded}/>
                <Feed>
                    <LeftSide>
                        <RenderPosts 
                            setIsPostLoaded={setIsPostLoaded}
                            isPageLoaded={isPageLoaded} 
                            endPoint={`hashtag/${hashtag}`} 
                            params={hashtag} 
                            page={page} 
                            setPage={setPage} 
                        />
                    </LeftSide>
                    <RightSide>
                        <TrendingSideBar 
                            setIsHashtagLoaded={setIsHashtagLoaded} 
                            isPageLoaded={isPageLoaded} 
                            params={hashtag} 
                        />
                    </RightSide>
                </Feed>
            </Main>
        </Body>
    )
};


import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAlert from "../hooks/useAlert";

import UserContext from "../contexts/UserContext";
import ClickedUserContext from "../contexts/ClickedUserContext";
import handleTokenVerify from "../handlers/handleGetToken";

import Header from "../components/Header";
import PageTitle from "../components/timelines/titlePage";
import RenderPosts from "../components/postCards/RenderPosts";
import RenderPostsTeste from "../components/postCards/RenderPostTeste";
import TrendingSideBar from "../components/TrendingSidebar";
import useLocalStorage from "../hooks/useLocalStorage";
import { Body, Main, Feed, LeftSide, RightSide } from "../components/timelines/style";

export default function UserTimeline(){
    const { id } = useParams();
    const navigate = useNavigate()
    console.log(id)

    const [ isHashtagLoaded, setIsHashtagLoaded] = useState(false);
    const [ isPostLoaded, setIsPostLoaded ] = useState(false);
    const [ isPageLoaded, setIsPageLoaded ] = useState(false)
    const [ page, setPage ] = useState(0);
    const {clickedUser, setClickedUser, isUserPosts, setIsUserPosts} = useContext(ClickedUserContext);


    const InvalidTokenAlert = () => useAlert({
        icon:"error", 
        titleText:"Aparentemente você não esta logado(a) :(",
        text:"Retornando para a página de login"
    }, "timer", {
        timer: 4000
    }).then( result => {
        if((result.isConfirmed === true || result.isDismissed === true)) return navigate("/");
    });
    const isInvalidClickedUser = () => {
        if(!clickedUser.id) return navigate('/timeline');
    }

    useEffect(() => {
        const token = handleTokenVerify();
        if (!token) return InvalidTokenAlert();
        setIsPageLoaded(false);
        setIsHashtagLoaded(false);
        setIsPostLoaded(false);
        setPage(0);
        isInvalidClickedUser();
    }, [id]);

    useEffect( () => {
        
        setIsUserPosts(true);

        const HALF_SECOND = 500;
        if(isPostLoaded && isHashtagLoaded){
            setTimeout( () => setIsPageLoaded(true), HALF_SECOND);
        }
    }, [isPostLoaded, isHashtagLoaded])

    return (
        <Body>
            <Header isPageLoaded={isPageLoaded}/>
            <Main>
                <PageTitle title={`${clickedUser.username}'s posts`} isPageLoaded={isPageLoaded} userPicture={clickedUser.pictureUrl}/>
                <Feed>
                    <LeftSide>
                        <RenderPosts 
                            setIsPostLoaded={setIsPostLoaded} 
                            isPageLoaded={isPageLoaded} 
                            endPoint={`user/${id}`} 
                            params={id} 
                            page={page} 
                            setPage={setPage} 
                        />
                    </LeftSide>
                    <RightSide>
                    <TrendingSideBar 
                        setIsHashtagLoaded={setIsHashtagLoaded} 
                        isPageLoaded={isPageLoaded} 
                        params={id} 
                    />
                    </RightSide>
                </Feed>
            </Main>
        </Body>
    )
};


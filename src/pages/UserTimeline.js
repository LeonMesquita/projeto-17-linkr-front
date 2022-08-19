import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAlert from "../hooks/useAlert";

import UserContext from "../contexts/UserContext";
import ClickedUserContext from "../contexts/ClickedUserContext";
import handleTokenVerify from "../handlers/handleGetToken";
import axios from 'axios';
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

    const [ isHashtagLoaded, setIsHashtagLoaded] = useState(false);
    const [ isPostLoaded, setIsPostLoaded ] = useState(false);
    const [ isPageLoaded, setIsPageLoaded ] = useState(false)
    const [ page, setPage ] = useState(0);
    const {clickedUser,setClickedUser, setIsUserPosts} = useContext(ClickedUserContext);
    const {url} = useContext(UserContext);
    const [user, setUser] = useState({});

    const InvalidTokenAlert = () => useAlert({
        icon:"error", 
        titleText:"Aparentemente você não esta logado(a) :(",
        text:"Retornando para a página de login"
    }, "timer", {
        timer: 4000
    }).then( result => {
        if((result.isConfirmed === true || result.isDismissed === true)) return navigate("/");
    });


    async function getUserData(){
        try{
            const promise = await axios.get(`${url}/user/data/${id}`);
            console.log(promise.data)
            setUser({
                id: promise.data.id,
                username: promise.data.username,
                pictureUrl: promise.data.picture_url
            });
            setClickedUser({
                id: promise.data.id,
                username: promise.data.username,
                pictureUrl: promise.data.picture_url
            })
        }catch(e){

        }
    }



    useEffect(() => {
        const token = handleTokenVerify();
        if (!token) return InvalidTokenAlert();
        setIsPageLoaded(false);
        setIsHashtagLoaded(false);
        setIsPostLoaded(false);
        setPage(0);
        getUserData();
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
                <PageTitle title={`${clickedUser.username}'s posts`} isPageLoaded={isPageLoaded} userPicture={user.pictureUrl} clickedUser={clickedUser}/>
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


import { useState, useEffect, useContext } from "react";//useContext,
import { useNavigate } from "react-router-dom";
import axios from "axios";

import UserContext from "../contexts/UserContext";
import ClickedUserContext from "../contexts/ClickedUserContext";

import handleGetTrendings from "../handlers/handleGetTrendings";
import handleTokenVerify from "../handlers/handleGetToken";
import handleAlertNotifications from "../handlers/handleAlertNotifications";
//import handleGetPosts from "../handlers/handleGetPosts";

import Header from "../components/Header"
import PageTitle from "../components/timelines/titlePage";
import PublishCard from "../components/postCards/PublishCard"
import RenderPosts from "../components/postCards/RenderPosts";
import TrendingSideBar from "../components/TrendingSidebar";
import WarningPopup from "../components/WarningPopup";
import useLocalStorage from ".././hooks/useLocalStorage";
import useInterval from 'react-useinterval';


import { Body, Main, Feed, LeftSide, RightSide } from "../components/timelines/style";
import styled from "styled-components";

export default function Timeline() {
    const { url, posts, setPosts } = useContext(UserContext);
    const {isUserPosts, setIsUserPosts} = useContext(ClickedUserContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false)

   // const [posts, setPosts] = useState([]);
    const [trendings, setTrendings] = useState([])
    const [statusCode, setStatusCode] = useState(false);
    const [lastPostId, setLastPostId] = useLocalStorage("lastPostId", "");
    const [linkrUser] = useLocalStorage("linkrUser", "");

    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [postsList, setPostsList] = useState([]);




    // //           // ADICIONAR TRENDINGS NA SIDEBAR 
    // //


    const returnToLogin = (result) => {
        if((result.isConfirmed === true || result.isDismissed === true)) return navigate("/");
    }


    async function handleGetPost(token){
        try{
            const promise = await axios.get(`${url}/following`, token, {page: 0});
            return promise.data;
        }catch(e){
            const status = e.response.status;
            setStatusCode({ page:"timeline", status: status})
            handleGetTrendings(url, token, setTrendings, setIsLoading)
        }
    }

    async function createPostsList(){
        const list =  await handleGetPost(handleTokenVerify()) || [];
        if(list.length !== 0){
            setPosts(list);
            setLastPostId(list[0].post_id);
        } else {
            setStatusCode({ page:"timeline", status: 204})
        }
        handleGetTrendings(url, linkrUser.token, setTrendings, setIsLoading)

    }

    async function getIntervalPosts(){
        const list =  await handleGetPost(handleTokenVerify()) || [];           
            if(list.length !== 0){
                let numberOfNewPosts = 0;
                const lastId = list[0].post_id;
                if(lastPostId !== lastId){
                    setPostsList(list);
                    setShowPopup(true);
                    for(let count = 0; count < list.length ; count++){
                        if(list[count].post_id === lastPostId) break;
                        numberOfNewPosts++;
                    }
                    setPopupMessage(`${numberOfNewPosts} new posts, load more!`);
                    setLastPostId(lastId);
                }
           
            }
    }



    function refreshPosts(){
        setPosts([...postsList]);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        }); 
        setShowPopup(!showPopup);
    }



    useEffect(()  => {
        const token = handleTokenVerify()
        if (!token) return handleAlertNotifications(
            'error', 
            `Aparentemente você não esta logado(a) :(`,
            `Retornando para a página de login`, 
            4000
            ).then(returnToLogin);
        setIsUserPosts(false)
        createPostsList();
    }, []);
    useInterval(getIntervalPosts, 15000, 1);


    return (
        <Body>

             <Header isLoading={isLoading}/>

            <Main>
                <Feed>
                    <LeftSide>
                        <FixedPublishContainer isUserPosts={isUserPosts}>
                        <PageTitle title={"timeline"} isLoading={isLoading}/>
                            {isUserPosts ? null :
                            <>
                            <PublishCard isLoading={isLoading}/>
                            {showPopup ?  <WarningPopup warningText={popupMessage} onClickRefresh={refreshPosts} /> : null}

                            </>
                            }
                        </FixedPublishContainer>
                        <RenderPosts isLoading={isLoading} isRefreshing={isRefreshing} statusCode={statusCode}
                        />

                    </LeftSide>
                    <RightSide>
                        <TrendingSideBar trendings={trendings} isLoading={isLoading} />
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
    padding-top: 80px;
    max-width: 611px;


    @media screen and (max-width: 611px){
        width: 100%;
  
    }
    
`
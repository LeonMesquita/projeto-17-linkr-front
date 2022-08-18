import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useAlert from "../hooks/useAlert";

import UserContext from "../contexts/UserContext";
import ClickedUserContext from "../contexts/ClickedUserContext";

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

    const [ isHashtagLoaded, setIsHashtagLoaded] = useState(false);
    const [ isPostLoaded, setIsPostLoaded ] = useState(false);
    const [ isPageLoaded, setIsPageLoaded ] = useState(false)
    const [ page, setPage ] = useState(0);
    const { url } = useContext(UserContext);
    const {clickedUseName,  isUserPosts, setClickedUseName, setClickedUserPicture, setIsUserPosts} = useContext(ClickedUserContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false)

    const [posts, setPosts] = useState([]);
    const [trendings, setTrendings] = useState([])
    const [statusCode, setStatusCode] = useState(false);
    const [lastPostId, setLastPostId] = useLocalStorage("lastPostId", "");
    const [linkrUser] = useLocalStorage("linkrUser", "");

    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [postsList, setPostsList] = useState([]);


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
    })

    useEffect( () => {
        const HALF_SECOND = 500;
        if(isPostLoaded && isHashtagLoaded){
            setTimeout( () => setIsPageLoaded(true), HALF_SECOND);
        }
    }, [isPostLoaded, isHashtagLoaded])

    // async function createPostsList(){
    //     const list =  await handleGetPost(handleTokenVerify()) || [];
    //     if(list.length !== 0){
    //         setPosts(list);
    //         setLastPostId(list[0].post_id);
    //     } else {
    //         setStatusCode({ page:"timeline", status: 204})
    //     }
    //     handleGetTrendings(url, linkrUser.token, setTrendings, setIsLoading)

    // }

    // async function getIntervalPosts(){
    //     const list =  await handleGetPost(handleTokenVerify()) || [];           
    //         if(list.length !== 0){
    //             let numberOfNewPosts = 0;
    //             const lastId = list[0].post_id;
    //             if(lastPostId !== lastId){
    //                 setPostsList(list);
    //                 setShowPopup(true);
    //                 for(let count = 0; count < list.length ; count++){
    //                     if(list[count].post_id === lastPostId) break;
    //                     numberOfNewPosts++;
    //                 }
    //                 setPopupMessage(`${numberOfNewPosts} new posts, load more!`);
    //                 setLastPostId(lastId);
    //             }
    //         }
    // }



    // function refreshPosts(){
    //     setPosts([...postsList]);
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth',
    //     }); 
    //     setShowPopup(!showPopup);
    // }



    // useEffect(()  => {
    //     const token = handleTokenVerify()
    //     if (!token) return handleAlertNotifications(
    //         'error', 
    //         `Aparentemente você não esta logado(a) :(`,
    //         `Retornando para a página de login`, 
    //         4000
    //         ).then(returnToLogin)
    // createPostsList();
    // }, []);
    // useInterval(getIntervalPosts, 15000, 1);





    return (
        <Body>
            <Header isPageLoaded={isPageLoaded}/>
            <Main>
                <PageTitle title={isUserPosts ? `${clickedUseName}'s posts` : "timeline"} isPageLoaded={isPageLoaded}/>
                <Feed>
                    <LeftSide>
                        {isUserPosts ? null :
                        <>

                        <PageTitle title={isUserPosts ? `${clickedUseName}'s posts` : "timeline"} isLoading={isLoading}/>

                        <RenderPosts 
                            setIsPostLoaded={setIsPostLoaded} 
                            isPageLoaded={isPageLoaded} 
                            endPoint={`timeline/posts`} 
                            page={page} 
                            setPage={setPage}
                        />
                        {/* // <FixedPublishContainer isUserPosts={isUserPosts}>
                        //     <PublishCard isPageLoaded={isPageLoaded}/>}
                        //     {showPopup ?  <WarningPopup warningText={popupMessage} onClickRefresh={refreshPosts} /> : null}
                        // </FixedPublishContainer> */}
                        </>
                        }
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
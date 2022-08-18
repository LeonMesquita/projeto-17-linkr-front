import { useState, useEffect, useContext, useRef, useCallback } from "react";//useContext,
import { useNavigate } from "react-router-dom";
import useTrendingSearch from "../hooks/useTrendingSearch";
import useAlert from "../hooks/useAlert";

import axios from "axios";

import UserContext from "../contexts/UserContext";
import ClickedUserContext from "../contexts/ClickedUserContext";

import handleGetTrendings from "../handlers/handleGetTrendings";
import handleTokenVerify from "../handlers/handleGetToken";
import handleAlertNotifications from "../handlers/handleAlertNotifications";

import Header from "../components/Header"
import PageTitle from "../components/timelines/titlePage";
import PublishCard from "../components/postCards/PublishCard"
import RenderPosts from "../components/postCards/RenderPosts";
import TrendingSideBar from "../components/TrendingSidebar";

import { Body, Main, Feed, LeftSide, RightSide } from "../components/timelines/style";



export default function Timeline() {
    const {clickedUseName,  isUserPosts} = useContext(ClickedUserContext);

    const { url } = useContext(UserContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true); //Loading principal da página

    const [ isHashtagLoaded, setIsHashtagLoaded] = useState(false);
    const [ isPostLoaded, setIsPostLoaded ] = useState(false);
    const [ isPageLoaded, setIsPageLoaded ] = useState(false)

    useEffect( () => {
        const HALF_SECOND = 500;
        if(isPostLoaded && isHashtagLoaded){
            setTimeout( () => setIsPageLoaded(true), HALF_SECOND);
        }
    }, [isPostLoaded, isHashtagLoaded])

    const [statusCode, setStatusCode] = useState(false);


    const InvalidTokenAlert = () => useAlert({
        icon:"error", 
        titleText:"Aparentemente você não esta logado(a) :(",
        text:"Retornando para a página de login"
    }, "timer", {
        timer: 4000
    }).then( result => {
        if((result.isConfirmed === true || result.isDismissed === true)) return navigate("/");
    })

    const { trendings } = useTrendingSearch;
    let useroken;
    useEffect(() => {
        const token = handleTokenVerify();
        if (!token) return InvalidTokenAlert();
        useroken = token;
        setIsLoading(false);
    }, []);

    useEffect(() => {
        console.log(`Oi`)
    }, [isLoading])
    
    const [pageNumber, setPageNumber] = useState(0);



    // Essa função quando termina os scrolls

    //           // ADICIONAR TRENDINGS NA SIDEBAR 
    // //
    // async function onClickUser(userId) {
    //     try {
    //         const promise = await axios.get(`${url}/user/${userId}`, authorization);
    //         setClickedUseName(promise.data[0].username);
    //         setClickedUserPicture(promise.data[0].picture_url);
    //         setPosts(promise.data);
    //         setIsUserPosts(true);
    //     } catch (e) {
    // }


    // const handleGetPost =  (token) => {
    //     const promise = axios.get(`${url}/timeline/posts`, token, {page: 0});
    //     promise.then( (res) => {            
    //         if(res.data.length !== 0){
    //             setPosts(res.data)
    //         } else {
    //             setStatusCode({ page:"timeline", status: 204})
    //         }
    //         handleGetTrendings(url, token, setTrendings, setIsLoading)
    //     })
    //     promise.catch( (e) => {
    //         const where = e.response.data
    //         const status = e.response.status;
    //         setStatusCode({ page:"timeline", status: status, where: where})
    //         handleGetTrendings(url, token, setTrendings, setIsLoading)
    //     });
    // }

    // useEffect(() => {
    //     const token = handleTokenVerify()
    //     if (!token) return handleAlertNotifications(
    //         'error', 
    //         `Aparentemente você não esta logado(a) :(`,
    //         `Retornando para a página de login`, 
    //         4000
    //         ).then(returnToLogin)
    //     handleGetPost(token)
    // }, []);


    // const LoadingPage =  (token) => {

    //     const {loading, error, posts, hasMore } = usePostSearch( 
    //         url,
    //         token,
    //         "timeline/posts",
    //         pageNumber
    //     );

    //     const { trendings } = useTrendingSearch(
    //         url,
    //         token,
    //         setIsLoading
    //     )

    //     return { trendings, loading, error, posts, hasMore }
    // }




    return (
        <Body>
            <Header isPageLoaded={isPageLoaded}/>
            <Main>
                <PageTitle title={isUserPosts ? `${clickedUseName}'s posts` : "timeline"} isPageLoaded={isPageLoaded}/>
                <Feed>
                    <LeftSide>
                        {isUserPosts ? null :
                        <PublishCard isPageLoaded={isPageLoaded}/>}
                        <RenderPosts setIsPostLoaded={setIsPostLoaded} isPageLoaded={isPageLoaded} endPoint="timeline/posts" />

                    </LeftSide>
                    <RightSide>
                        <TrendingSideBar setIsHashtagLoaded={setIsHashtagLoaded} isPageLoaded={isPageLoaded} />
                    </RightSide>
                </Feed>
            </Main>
        </Body>
    )
};


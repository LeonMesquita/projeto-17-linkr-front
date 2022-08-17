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

import useLocalStorage from ".././hooks/useLocalStorage";

import { Body, Main, Feed, LeftSide, RightSide } from "../components/timelines/style";

export default function Timeline() {
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



    // //           // ADICIONAR TRENDINGS NA SIDEBAR 
    // //
//     async function onClickUser(userId) {
//         try {
//             const promise = await axios.get(`${url}/user/${userId}`, linkrUser.token);
//             setClickedUseName(promise.data[0].username);
//             setClickedUserPicture(promise.data[0].picture_url);
//             console.log(promise.data)
//             setPosts(promise.data);
//             setIsUserPosts(true);
//         } catch (e) {
//     }
// }

    const returnToLogin = (result) => {
        if((result.isConfirmed === true || result.isDismissed === true)) return navigate("/");
    }

    const handleGetPost =  (token) => {
        const promise = axios.get(`${url}/following`, token, {page: 0});
        promise.then( (res) => {            
            if(res.data.length !== 0){
                setPosts(res.data);
                console.log(res.data[0])
                setLastPostId(res.data[0].post_id)
                
            } else {
                setStatusCode({ page:"timeline", status: 204})
            }
            handleGetTrendings(url, token, setTrendings, setIsLoading)
        })
        promise.catch( (e) => {
            const status = e.response.status;
            setStatusCode({ page:"timeline", status: status})
            handleGetTrendings(url, token, setTrendings, setIsLoading)
        });
    }

    useEffect(() => {
        const token = handleTokenVerify()
        if (!token) return handleAlertNotifications(
            'error', 
            `Aparentemente você não esta logado(a) :(`,
            `Retornando para a página de login`, 
            4000
            ).then(returnToLogin)
        handleGetPost(token)
    }, []);

    return (
        <Body>
            <Header isLoading={isLoading}/>
            <Main>
                <PageTitle title={isUserPosts ? `${clickedUseName}'s posts` : "timeline"} isLoading={isLoading}/>
                <Feed>
                    <LeftSide>
                        {isUserPosts ? null :
                        <PublishCard isLoading={isLoading}/>}
                        <RenderPosts posts={posts} isLoading={isLoading} isRefreshing={isRefreshing} statusCode={statusCode}
                        setPosts={setPosts}
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


import { useState, useEffect, useContext } from "react";//useContext,
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import TokenContext from "../contexts/TokenContext";
import UserContext from "../contexts/UserContext";

import Header from "../components/Header.js";
import TimelineTitleSkeleton from "../components/timelines/titlePage";
import PostSkeleton from "../components/postCards/Skeletons/PostSkeleton";
import StatusCodeScreen from "../components/timelines/StatusCodeScreen";
import RenderPosts from "../components/postCards/RenderPosts";
import TrendingSideBar from "../components/TrendingSidebar";

import { Body, Main, TimelineTitle, Feed, LeftSide, RightSide } from "../components/timelines/style";

export default function Timeline() {

    const { url } = useContext(UserContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);


    // const [posts, setPosts] = useState([]);





    // const [isUserPosts, setIsUserPosts] = useState(false);
    // const [clickedUserPicture, setClickedUserPicture] = useState('');
    // const [clickedUseName, setClickedUseName] = useState('');


    // pass the link directly

    // useEffect(() => {

    //     const promise = axios.get(`${url}/posts`);
    //     promise.then((res) => {
    //         setPosts(res.data);
    //         setIsLoading(false);
    //     });
    //     promise.catch((e) => {
    //         alert("An error occured while trying to fetch the posts, please refresh the page");
    //     });
    // }, []);
    // //           // ADICIONAR TRENDINGS NA SIDEBAR 
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

    // const AlertError = (result) => {
    //     console.log(`Oi`)
    //     console.log(`Oi`)
    //     if (result.isConfirmed === true || result.isDismissed === true) return navigate(`/`)
    // }
    // const Alert = {
    //     icon: 'error',
    //     titleText: `Aparentemente você não esta logado(a) :(`,
    //     text: `Retornando para a página de login`,
    //     color: `#FFFFFF`,
    //     background: `#333333`,
    //     confirmButtonColor: `#1877F2`,
    //     padding: `10px`,
    //     timer: 4000,
    //     timerProgressBar: true,
    //     timerProgressBar: `#ffffff`
    // }

    // const handleGetPost = () => {
    //     const promise = axios.get(`${url}/posts`, token)
    // }




    // const handleTokenVerify = () => {
    //     let linkrStorage = JSON.parse(localStorage.getItem("linkrUser"))
    //     if( linkrStorage === null || linkrStorage.token === undefined ) return false
    //     return linkrStorage.token
    // }
    // const [trendings, setTrendings] = useState([])
    // const handleGetTrendings = (token) => {
    //     const promise = axios.get(`${url}/trendings`, token);
    //     promise.then((res) => {
    //         setTrendings(res.data);
    //         setIsLoading(false)
    //     })
    // }
    // useEffect(() => {
    //     const token = handleTokenVerify()
    //     if(!token) return Swal.fire(Alert).then(AlertError);
    //     handleGetTrendings(token)
    // }, []);

    return (
        <Body>
            {/* {
                 isLoading
               ?  <></>
                 : <Header />
            } 
           <Main>
                {
                  isLoading
                    ?   <TimelineTitleSkeleton />
                 :   <TimelineTitle>timeline</TimelineTitle>
                 }
                 <Feed>
                 <LeftSide>
                     </LeftSide>
                    <RightSide>
                     <TrendingSideBar trendings={trendings} isLoading={isLoading}/>
                    </RightSide>
                </Feed>
            </Main> */}
        </Body>
    )
};


{/* <Feed>
<LeftSide>
    {
        isLoading
            ?
            <>
                <PostSkeleton />
            </>
            : statusCode
                ? <StatusCodeScreen statusCode={statusCode} />
                : <RenderPosts posts={posts} />
    }
</LeftSide>
<RightSide>
    <TrendingSideBar trendings={trendings} isLoading={isLoading} />
</RightSide>
</Feed> */}
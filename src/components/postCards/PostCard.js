import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactTooltip from 'react-tooltip';

import styled from "styled-components";
import { CardContainer, PostContentSide, PostSide } from  "../style.js";
import {IoIosHeartEmpty, IoIosHeart} from "react-icons/io";
import TokenContext from "../../contexts/TokenContext.js";
import UserContext from "../../contexts/UserContext.js";
import useLocalStorage from "../../hooks/useLocalStorage";

import { ReactTagify } from "react-tagify";

export default function PostCard({author,author_pic,description, postUrl, postId, userId, onclick}){
    if(!userId){
        userId = -1;
    }

    
    const navigate = useNavigate();
    
    const { token, setToken, authorization } = useContext(TokenContext);
    const { url, user, setUser } = useContext(UserContext);
    const [isFavorite, setIsFavorite] = useState(false);
    const [numberOfFavorites, setNumberOfFavorites] = useState(0);
    const [linkirUser, setLinkirUser] = useLocalStorage("linkrUser", "");

    const urldata = {
        postUrl: "",
        title: "",
        siteName:"",
        description:"",
        mediaType:"",
        contentType:"",
        images:[],
        favicons:[],
        videos:[]
    }

    const [ data, setData ] = useState(urldata);

    let body={
        "url": postUrl
    }

    async function getFavorites(postId, userId){

        try{
            const promise =  await axios.get(`${url}/posts/favorite/${postId}/${userId}`);
            setNumberOfFavorites(promise.data.favoriteQuantity);
            setIsFavorite(promise.data.isFavorite);

        }catch(e){

        }
    }

    useEffect(() => {
        const promise = axios.post(`${url}/urls`,body); //`https://linkr-back-api.herokuapp.com/urls`
        promise.then((res)=>{
            
            setData(res.data);

           // console.log(data);
        });
        promise.catch(() => {

        });

        getFavorites(postId, userId);
    },[]);

    async function onClickFavorite(){
        try{
            await axios.post(`${url}/posts/favorite`,
            {postId, userId},
            linkirUser.token);

            setIsFavorite(!isFavorite);
            getFavorites(postId, userId);
        }catch(e){

        }
    }


    async function removeFavorite(){
        try{
            await axios.delete(`${url}/posts/favorite/${postId}/${userId}`,
            
            linkirUser.token);
            setIsFavorite(!isFavorite);
            getFavorites(postId, userId);
        }catch(e){
            console.log(e)

        }
    }
    const handleNavigate = (tag) => navigate(`/hashtag/${tag.slice(1)}`);
    const tagStyle = {fontWeight: "700", fontSize: "17px", lineHeight: "20px", color: "#FFFFFF"};
    return(
        <>
        {data ? (
                <CardContainer className="post">
                <PostContentSide>
                    <img src={author_pic} alt="user" />
                </PostContentSide>
                <PostSide>
                    <PostInfos>
                        <p onClick={onclick}>{author}</p>
                        <ReactTagify
                            tagStyle={tagStyle}
                            detectLinks={false}
                            tagClicked={(tag) => handleNavigate(tag)}

                        >
                            <span>{description}</span>
                        </ReactTagify>
                        
                        <a style={{display: "table-cell"}} href = {url} target = "_blank" 
                            rel = "noopener noreferrer"><UrlContainer>
                            <UrlDescriptionSide>
                                <h1>{data.title}</h1>
                                <span>{data.description}</span>
                                <h2>{postUrl}</h2>
                            </UrlDescriptionSide>
                            <UrlImageSide>
                                <img src={data.favicons[0]} alt={data.title}></img>
                            </UrlImageSide>
                            </UrlContainer></a>
                    </PostInfos>
                </PostSide>
                <FavoriteDiv iconColor={isFavorite ? '#AC0C00' : 'white'} data-tip="Curtido por João e outras 100 pessoas">
                    {isFavorite ? <IoIosHeart onClick={removeFavorite}/> : <IoIosHeartEmpty  onClick={onClickFavorite}/>}
                    
                    <h6>{numberOfFavorites} Likes</h6>

                </FavoriteDiv>
                <ReactTooltip  place="bottom" type="dark" effect="float" backgroundColor="#E8E8E8" textColor="#505050"/>
            </CardContainer>
            )
            : (<h1>Loading . . . </h1>)
        }
        </>
    )
};

const PostInfos = styled.div`

    h1,span{font-weight: 400;}
    h1,p{
        margin-bottom: 7px;
        font-size: 19px;
        line-height: 23px;
        color: #FFFFFF;
    }
    span{
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;
    }
    @media screen and (max-width: 431px){
        h1,span,p{font-weight: 400;}
        h1,p{
            font-size: 17px;
            line-height: 20px;
        }
        span{
            font-size: 15px;
            line-height: 18px;
        }
    }

    p{
        cursor: pointer;
        &:hover{
            text-decoration: underline;
        }
    }
`

const UrlContainer = styled.div`
    display:flex;
    width: 100%;
    height: 155px;
    margin-top: 10px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
`

const UrlDescriptionSide = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px 20px;
    h1,span,h2{font-weight: 400;}
    h1{
        margin-bottom: 0px;
        font-size: 16px;
        line-height: 19px;
        color: #CECECE;
    }
    span{
        font-size: 11px;
        line-height: 13px;
        color: #9B9595;
    }
    h2{
        font-size: 11px;
        line-height: 13px;
        color: #CECECE;
    }
    @media screen and (max-width: 431px){
        h1{
            font-size: 11px;
            line-height: 13px;
            color: #CECECE;
        }
        span, h2{
            font-size: 9px;
            line-height: 11px;
            color: #9B9595;
        }
        h2{color: #CECECE;}
    }
`

const UrlImageSide = styled.div`
   img{
    width: 153.44px;
    height: 153.44px;
   }
`

const FavoriteDiv = styled.div`
    position: absolute;
    top: 90px;
    left: 27px;
    text-align: center;
    color: ${props => props.iconColor};
    font-size: 20px;

    h6{
        font-family: 'Lato';
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        color: #FFFFFF;
    }
`
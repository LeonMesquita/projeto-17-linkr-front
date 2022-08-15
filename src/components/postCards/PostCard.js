import { useState, useEffect, useContext, useRef} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ReactTagify } from "react-tagify";
import { IoMdTrash } from 'react-icons/io'
import { TiPencil } from 'react-icons/ti'

import handleDeletePost from "../../handlers/handleDeletePost.js";
import handleEditPost from "../../handlers/handleEditPost.js";

import { CardContainer, PostContentSide, PostSide } from "../style.js";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import TokenContext from "../../contexts/TokenContext.js";
import UserContext from "../../contexts/UserContext.js";

import styled from "styled-components";

export default function PostCard({ author, author_pic, description, postUrl, onclick, postId, userId }) {
    if (!userId) {
        userId = -1;
    }

    const navigate = useNavigate();

    const { authorization } = useContext(TokenContext);
    const { url, user, setUser } = useContext(UserContext);
    const [isFavorite, setIsFavorite] = useState(false);
    const [numberOfFavorites, setNumberOfFavorites] = useState(0);
    const urldata = {
        postUrl: "",
        title: "",
        siteName: "",
        description: "",
        mediaType: "",
        contentType: "",
        images: [],
        favicons: [],
        videos: []
    }
    const linkrUser = JSON.parse(localStorage.getItem("linkrUser"));
    const linkrUserToken = linkrUser.token;
    const linkrUserId = linkrUser.id;

    const [data, setData] = useState(urldata);

    let body = {
        "url": postUrl
    }

    async function getFavorites(postId, userId) {

        try {
            const promise = await axios.get(`${url}/posts/favorite/${postId}/${userId}`);
            setNumberOfFavorites(promise.data.favoriteQuantity);
            setIsFavorite(promise.data.isFavorite);

        } catch (e) {

        }
    }

    useEffect(() => {
        const promise = axios.post(`${url}/urls`, body); //`https://linkr-back-api.herokuapp.com/urls`
        promise.then((res) => {

            setData(res.data);

            // console.log(data);
        });
        promise.catch(() => {

        });

        getFavorites(postId, userId);
    }, []);

    async function onClickFavorite() {
        try {
            await axios.post(`${url}/posts/favorite`,
                { postId, userId },
                authorization);

            setIsFavorite(!isFavorite);
            getFavorites(postId, userId);
        } catch (e) {

        }
    }


    async function removeFavorite() {
        try {
            await axios.delete(`${url}/posts/favorite/${postId}/${userId}`,

                authorization);
            setIsFavorite(!isFavorite);
            getFavorites(postId, userId);
        } catch (e) {
            console.log(e)

        }
    }

    const deletePost = () => handleDeletePost(url, linkrUserToken); //Model para deletar o post!
    const textareaRef = useRef(null);
    const [postDescription, setPostDescription] = useState({ description: description })
    const [canEdit, setCanEdit] = useState(false);
    const [editIsEnabled, setEditIsEnabled] = useState("enabled");
    const handleDescriptionChanges = (e) => setPostDescription({...postDescription, [e.target.name]: e.target.value })
    const EditPost = () => setCanEdit(!canEdit)
    useEffect(() => {
        if(canEdit) {
            textareaRef.current.focus();
        }
    }, [canEdit])
    const handleKeyDown = (e) => handleEditPost(e, setCanEdit, setPostDescription, setEditIsEnabled, description, url, linkrUserToken, postDescription);

    const handleNavigate = (tag) => navigate(`/hashtag/${tag.slice(1)}`);
    const tagStyle = { fontWeight: "700", fontSize: "17px", lineHeight: "20px", color: "#FFFFFF" };
    return (
        <>
            {
                data ? (
                    <CardContainer className="post">
                        <PostContentSide>
                            <img src="https://pbs.twimg.com/media/FP3A-hnWQAMTQuK?format=jpg" alt="user" />
                            <LikeContainer iconColor={isFavorite ? 'AC0C00' : "FFFFFF"}>
                                {isFavorite ? <IoIosHeart onClick={removeFavorite} /> : <IoIosHeartEmpty onClick={onClickFavorite} />}

                                <h6>{numberOfFavorites} Likes</h6>
                            </LikeContainer>
                        </PostContentSide>
                        <PostSide>
                            <PostInfos>
                                <PostOwnerContainer>
                                    {/* <p onClick={onclick}>{author}</p> */}
                                    <p>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>
                                    <InteractionContainer className={linkrUserId === userId ? "" : "notAuthorPost"}>
                                        <TiPencil onClick={EditPost} />
                                        <IoMdTrash onClick={deletePost} />
                                    </InteractionContainer>
                                </PostOwnerContainer>
                                {
                                    canEdit
                                        ?
                                        <TextArea
                                            className={editIsEnabled}
                                            type="text"
                                            placeholder="Digite algo"
                                            id="descriptionInput"
                                            value={postDescription.description}
                                            name="description"
                                            autoSize={{ minRows: 4 }}
                                            ref={textareaRef}
                                            onChange={handleDescriptionChanges}
                                            onKeyDown={handleKeyDown}
                                        />
                                        :
                                        <ReactTagify
                                            tagStyle={tagStyle}
                                            detectLinks={false}
                                            tagClicked={(tag) => handleNavigate(tag)}
                                        >
                                            <span>{postDescription.description}</span>
                                        </ReactTagify>
                                }
                                <LinkPreview
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <PreviewDescription>
                                        <h1>{data.title}</h1>
                                        <span>{data.description}</span>
                                        <h2>{postUrl}</h2>
                                    </PreviewDescription>
                                    <img src="https://pbs.twimg.com/media/FP3A-hnWQAMTQuK?format=jpg" alt={data.title}></img>
                                </LinkPreview>
                            </PostInfos>
                        </PostSide>
                    </CardContainer>
                )
                    : <></>
            }

        </>
    )
};

const TextArea = styled.textarea`
    border-radius: 5px;
    transition: ease all .5s;
    width: 100%;
    background-color: #EFEFEF;
    font-size: 15px;
    line-height: 18px;
    color: #000000;
    max-height: 100%;
    margin-top: 2.5px;
    padding: 10px;
    resize: none;

    &::placeholder{
        color: #949494;
    }
    &.disabled{
        &{
            pointer-events:none;
            overflow: hidden;
            background-color: #e0e0e0;
            color: #AFAFAF;
        }
        &:-webkit-autofill
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus{
            -webkit-text-fill-color: #AFAFAF;
            -webkit-box-shadow: 0 0 0 50px #e0e0e0 inset !important;
        }   
    }
    @media screen and (max-width: 611px){
        font-size: 13px;
        line-height: 16px;
        min-height: 47px;
    }
`

const LikeContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;
    svg{
        width: 25px;
        height: 25px;
        color: #${props => props.iconColor};
        margin-bottom: 10px;
    }
    h6{
        font-family: 'Lato';
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        color: #FFFFFF;
    }
`

const PostInfos = styled.div`

    h1,span{font-weight: 400;}
    h1,p{
        font-size: 19px;
        line-height: 23px;
        color: #FFFFFF;
    }
    h1{
        margin-bottom: 7px;
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

const PostOwnerContainer = styled.div`
    min-height: 23px;
    display:flex;
    margin-bottom: 7px;
    justify-content: space-between;
    p{
        word-break: break-all;
    }
`

const InteractionContainer = styled.div`
    height: 100%;
    display:flex;
    align-items:center;
    svg{
        width: 20px;
        height: 20px;
        color: #FFFFFF;
        margin-left: 5px;
    }
    &.notAuthorPost{
        display:none;
    }
`

const PreviewDescription = styled.div`
    display:flex;
    flex-direction: column;
    width: 100%;
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
`

const LinkPreview = styled.a`
    display:flex;
    align-items:center;
    width: 100%;
    height: 155px;
    margin-top: 10px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    img{
        float: right;
        width: 155px;
        height: 100%;
        border-radius: 0px 10px 10px 0px;
    }
    @media screen and (max-width: 611px){
        ${PreviewDescription}{
            width: 100%;
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
        ${LikeContainer}{
            svg{
                width: 17px;
                height: 17px;
            }
            h6{
                font-size: 9px;
                line-height: 11px;
            }
        }
    }
    @media screen and (max-width: 430px){
        height: 115px;
        img{
            width: 95px;
        }
    }

`
import { useState, useEffect, useContext, useRef} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ReactTagify } from "react-tagify";
import { IoMdTrash } from 'react-icons/io'
import { TiPencil } from 'react-icons/ti'
import ReactTooltip from 'react-tooltip';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { MainContainer } from "../comments/styled.js";
import { BiRepost } from "react-icons/bi";
import ClickedUserContext from "../../contexts/ClickedUserContext.js";

import handleDeletePost from "../../handlers/handleDeletePost.js";
import handleEditPost from "../../handlers/handleEditPost.js";
import { getComments } from "../../handlers/handlerComments.js";
import handleAlertNotifications from '../../handlers/handleAlertNotifications';

import { CardContainer, PostContentSide, PostSide } from "../style.js";
import { IoIosHeartEmpty, IoIosHeart, IoIosSend } from "react-icons/io";
import { AiOutlineComment } from "react-icons/ai";

import UserContext from "../../contexts/UserContext.js";
import useLocalStorage from "../../hooks/useLocalStorage";

import styled from "styled-components";
import RenderComments from "../comments/RenderComments.js";
// import useInterval from 'react-useinterval';
import ScrollToTop from './ScrollTop.js';
import ConfirmationDialog from "../ConfirmationDialog.js";
import useAlert from "../../hooks/useAlert"
import Swal from "sweetalert2";



export default function PostCard({postId, userId,username, pictureUrl, description,likes, preview, post, repost, repostCount}){
    const navigate = useNavigate();
    const { url } = useContext(UserContext);
    const [isFavorite, setIsFavorite] = useState(false);
    const [likers, setLikers] = useState([]);
    const [likedBy, setLikedBy] = useState('');
    const [linkirUser] = useLocalStorage("linkrUser", "");
    const linkrUserToken = linkirUser.token;
    const linkrUserId = linkirUser.userId;
    const [openComments, setOpenComments] = useState(false);
    const [listOfComments, setListOfComments] = useState([]);
    const [isReposted, setIsReposted] = useState(true);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const {clickedUser, setClickedUser, isUserPosts} = useContext(ClickedUserContext);



    const [data, setData] = useState();

    let body = {
        "url": pictureUrl
    }

    async function getFavorites(postId) {
        let str;

        try {
            const promise = await axios.get(`${url}/posts/favorite/${postId}/${userId}`);
            const quantity = promise.data.length;
            const likersList = promise.data;
            setLikers(likersList);
            if(likersList.find(liker => liker.liker_id == userId)){
                const otherLikers = likersList.filter(like => like.liker_id !== userId);
                
                setIsFavorite(true);
                
                if(otherLikers.length > 1){
                    str = `Você, ${otherLikers[0].username}, e outras ${quantity-2} pessoas`
                }
                else if (otherLikers.length === 1){
                    str = `Você e ${otherLikers[0].username} curtiram isso`
                }
                else{
                    str = 'Você curtiu isso'
                }

                setLikedBy(str);

            }

            else{
                if(quantity > 2){
                    str = `${likersList[0].username}, ${likersList[1].username} e outras ${quantity-2} pessoas`
                }
                else if (quantity === 2){
                    str = `${likersList[0].username} e ${likersList[1].username} curtiram isso`
                }
                else if(quantity === 1){
                    str = `${likersList[0].username} curtiu isso`
                }
                setLikedBy(str);
            }

        } catch (e) {

        }
    }



    async function onClickFavorite() {
        try {
            await axios.post(`${url}/posts/favorite`,
            {postId, userId},
            linkirUser.token);

            setIsFavorite(!isFavorite);
            getFavorites(postId);
            
        } catch (e) {

        }
    }



    async function removeFavorite() {
        try {
            await axios.delete(`${url}/posts/favorite/${postId}/${userId}`,linkirUser.token);

            setIsFavorite(false);
            getFavorites(postId);

        } catch (e) {
            console.log(e)

        }
    }
    
   async function callGetComments(){
        const comments = await getComments(url, postId);
        setListOfComments(comments);
    }



    useEffect(() => {
       getFavorites(postId);
       callGetComments()
    }, []);

    const deletePost = () => handleDeletePost(url, linkrUserToken); //Model para deletar o post!
    const textareaRef = useRef(null);
    const [postDescription, setPostDescription] = useState({ description: description })
    const [canEdit, setCanEdit] = useState(false);
    const [editIsEnabled, setEditIsEnabled] = useState("enabled");
    const handleDescriptionChanges = (e) => setPostDescription({...postDescription, [e.target.name]: e.target.value })
    const EditPost = () => {
        setPostDescription({ description: description })
        setCanEdit(!canEdit)
    }
    useEffect(() => {
        if(canEdit) {
            textareaRef.current.focus();
        }
    }, [canEdit])
    const handleKeyDown = (e) => handleEditPost(e, setCanEdit, setPostDescription, setEditIsEnabled, description, url, linkrUserToken, postDescription, postId);

    const handleNavigate = (tag) => navigate(`/hashtag/${tag.slice(1)}`);
    const tagStyle = { fontWeight: "700", fontSize: "17px", lineHeight: "20px", color: "#FFFFFF" };

    const toUserPage = () => {
        //console.log(post)
        setClickedUser({
            id: post.user_id,
            username: post.username,
            pictureUrl: post.picture_url
        });
        navigate(`/user/${post.user_id}`)
    }


    async function sharePost(){
        const repostBody = {
             postId
         }
         try{
             await axios.post(`${url}/reposts`, repostBody, linkrUserToken);
             alert('repostou');
 
         }catch(err){
             console.log(err)
         }
 
     }

    const handleRepost = () => {
        if(linkrUserId === userId || repost.repostUserId === linkrUserId){
            return handleAlertNotifications("error", "You can re-post your own post or your on re-post", "Re-post other post", 5000)
        } else {
            Swal.fire({
                icon: "warning",
                titleText: "Do you want to re-post this link??",
                text: "You can delete it later",
                color: `#FFFFFF`,
                background: `#333333`,
                confirmButtonColor: `#1877F2`,
                showCancelButton: true,
                cancelButtonColor: '#d33',
                confirmButtonText: "Yes, share!",
                cancelButtonText: "No, cancel"
            }).then( result =>{
                if(result.isConfirmed === true || result.isDismissed === true){
                    return sharePost();
                }
            })
        }
    }
    return (
        <>
            {
                (
                    <FatherContainer isReposted={repost}>
                    {repost ? 
                        <span className="repost">
                        <BiRepost />
                        <h3>Re-posted by {repost.repostUsername}</h3>
                        </span>
                    : null}
                    <CardContainer className="post" openComments={openComments} isUserPosts={isUserPosts}>
                      
                        <PostContentSide>
                            <img src={pictureUrl} alt="user" />

                            <InteractionIcon iconColor={isFavorite ? 'AC0C00' : "FFFFFF"}  data-tip={likedBy}>
                                {isFavorite ? <IoIosHeart onClick={removeFavorite} /> : <IoIosHeartEmpty onClick={onClickFavorite} />}

                                <h6>{likers.length} likes</h6>
                            </InteractionIcon >

                            <InteractionIcon iconColor="FFFFFF">
                                    <AiOutlineComment onClick={() => setOpenComments(!openComments)}/>
                                    <h6>{listOfComments.length} comments</h6>
                            </InteractionIcon>
                            <InteractionIcon iconColor="FFFFFF">
                                    <BiRepost onClick={handleRepost}/>
                                    <h6>{repostCount} re-posts</h6>
                            </InteractionIcon>
                            <ReactTooltip  place="bottom" type="dark" effect="float" backgroundColor="#E8E8E8" textColor="#505050"/>
                        </PostContentSide>
                        <PostSide>
                                <PostOwnerContainer>
                                    <p onClick={toUserPage}>{username}</p>
                                    <InteractionContainer className={
                                        linkrUserId === userId 
                                        ? repost
                                                ? "notAuthorPost"
                                                : ""
                                        : "notAuthorPost"}>
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
                                <LinkPreviewContainer
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <PreviewDescription>
                                        <h1>{preview[0].title}</h1>
                                        <span>{preview[0].description}</span>
                                        <h2>{preview[0].url}</h2>
                                    </PreviewDescription>
                                    <img src={preview[0].favicon} alt={preview[0].title}></img>
                                </LinkPreviewContainer>
                        </PostSide>
                    </CardContainer>
                    {openComments ? 
           <RenderComments postId={postId} listOfComments={listOfComments} setListOfComments={setListOfComments}/>
          : null}

                    </FatherContainer>
                )

                
               
                
            }

{openConfirmationDialog ? <ConfirmationDialog message='Do you want to re-post this link?' onclickNo={() => setOpenConfirmationDialog(false)} onclickYes={sharePost}/> : null}

        </>
    )
};


const FatherContainer = styled.div`
    position: relative;
    background-color: #1E1E1E;
    z-index: 0;
    margin-bottom: 38px;
    display: flex;
    flex-direction: column;
    border-radius: 16px;    
    max-width: 611px;
    color: white;

    .repost{
        display: flex;
        align-items: center;
        padding: 8px;
    }
    svg{
        font-size: 22px;
    }
    h3{
        font-size: 11px;
        font-family: 'Lato';
        margin-left: 5px;

    }

    @media(max-width: 611px){
        border-radius: 0;
    }
`

const TextArea = styled.textarea`
    height: 44px;
    border-radius: 5px;
    transition: ease all .5s;
    width: 100%;
    background-color: #FFFFFF;
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

const InteractionIcon = styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;
    min-width: 80px;
    svg{
        width: 25px;
        height: 25px;
        color: #${props => props.iconColor};
        margin-bottom: 5px;
        cursor: pointer;
    }
    h6{
        font-family: 'Lato';
        font-weight: 400;
        font-size: 10px;
        line-height: 13px;
        color: #FFFFFF;
        margin-bottom: 15px;
        text-align: center;
    }

    @media screen and (max-width: 611px){
        svg{
            width: 17px;
            height: 17px;
        }
        h6{
            font-size: 9px;
            line-height: 11px;
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
    width: 70%;
    height: 100%;
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
    h1,span,h2{
        -webkit-line-clamp: 3;
        overflow:hidden;
    }
    @media screen and (max-width: 611px){
        h1{
            height: 30px;
        }
        span{
            height: 44px;
        }
        h2{
            height: 22px;
        }
    }
`

const LinkPreviewContainer = styled.a`
    display:flex;
    float: inline-end;
    margin-top: 10px;
    width: 100%;
    height: 155px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    img{
        float: right;
        width: 30%;
        height: 100%;
        border-radius: 0px 10px 10px 0px;
    }

    @media screen and (max-width: 611px){
        height: 115px;
        ${PreviewDescription}{
            padding: 8px;
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
    }
`


const LinkPreview = styled.div`
    display:flex;
    width: 100%;
    height: fit-content;
    margin-top: 10px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;


    @media screen and (max-width: 430px){
        height: 115px;
        img{
            width: 95px;
        }
    }
`



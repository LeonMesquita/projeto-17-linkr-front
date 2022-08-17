import { CommentsContainer, CommentInput, Comments, MainContainer } from "./styled";
import {IoIosSend } from "react-icons/io";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import axios from 'axios';
import { getComments } from "../../handlers/handlerComments";
import handleAlertNotifications from "../../handlers/handleAlertNotifications";


export default function RenderComments({postId, listOfComments, setListOfComments}){
    const [userFollowers, setUserFollowers] = useState([]);
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const [userComment, setUserComment] = useState('');
    const [linkrUser] = useLocalStorage("linkrUser", "");


    const {url} = useContext(UserContext);

    async function getUserFollowers(){
        try{
         const resp = await axios.get(`${url}/follow/following/${linkrUser.userId}`);
         console.log(resp.data);
         setUserFollowers(resp.data);

        
        }catch(err){
         console.log(err);
        }
     }

     async function commentPost(){
        setIsInputDisabled(true)
        const commentBody = {
            postId,
            commenterId: linkrUser.userId,
            comment: userComment
        }
        try{
            await axios.post(`${url}/comments`,commentBody, linkrUser.token);
            callGetComments();
            setUserComment('');
        }catch(e){
            handleAlertNotifications('error', 'Erro!', 'Não foi possível postar seu comentário', 4000);


        }
        setIsInputDisabled(false);
    }

    async function callGetComments(){
        const comments = await getComments(url, postId);
        setListOfComments(comments);
    }

     useEffect(() => {
        getUserFollowers();
        callGetComments();
        
    }, []);

    return(
        <CommentsContainer >
        <Comments>
            {listOfComments.length === 0 ? <p>Este post ainda não possui nenhum comentário</p> : 
            listOfComments.map((comment) => 
            <div className="commenter-div">
                <img src={comment.commenter_picture} alt=""/>
                <span>
                   <div className="commenter-title">
                       <h1>{comment.commenter_username}</h1>
                       {comment.commenter_id === comment.post_author ?
                           <h3>• post`s author</h3>
                       : null
                       }
                       {
                           userFollowers.find(user => user.followed_id === comment.commenter_id) ?
                           <h3>• following</h3>
                           : null
                       }
                   </div>
                    
                    <h2>{comment.comment}</h2>
                </span>

            </div>
            )
            }

        </Comments>
        <CommentInput isInputDisabled={isInputDisabled}>
            <img src={linkrUser.profilePic} alt=""/>
            <input placeholder="write a comment..." value={userComment}
            onChange={e => setUserComment(e.target.value)} disabled={isInputDisabled}/>
        
        
            <IoIosSend className="input-icon" onClick={isInputDisabled ? null : commentPost}/>
        
        </CommentInput>

     </CommentsContainer>
    );
}
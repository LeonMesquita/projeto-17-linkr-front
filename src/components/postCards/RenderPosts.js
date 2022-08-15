import PostCard from "../postCards/PostCard";
import PostSkeleton from "../skeletonComponents/PostSkeleton";
import StatusCodeScreen from "../timelines/StatusCodeScreen";
import useLocalStorage from "../../hooks/useLocalStorage";
import axios from 'axios';
import UserContext from "../../contexts/UserContext";
import Swal from "sweetalert2";
import { useContext } from "react";



export default function RenderPosts({ isLoading, posts, statusCode, setClickedUseName, setClickedUserPicture, setPosts, setIsUserPosts }) {
    const [linkirUser, setLinkirUser] = useLocalStorage("linkrUser", "");
    const { url, user } = useContext(UserContext);


    async function onClickUser(userId){
        try{
            const promise = await axios.get(`${url}/user/${userId}`, linkirUser.token);
            setClickedUseName(promise.data[0].username);
            setClickedUserPicture(promise.data[0].picture_url);
            setPosts(promise.data);
            setIsUserPosts(true);
        }catch(e){
            Swal.fire({
                icon: 'error',
                titleText: `Falha de autenticação`,
                text: `Você precisa estar logado!`,
                color: `#FFFFFF`,
                background: `#333333`,
                confirmButtonColor:`#1877F2`,
                padding: `10px`,
                timer: 4000,
                timerProgressBar: true,
                timerProgressBar: `#ffffff`
            })
        }
       
    }

    return (
        <>
            {
                isLoading
                    ? <PostSkeleton />
                    :   statusCode
                        ?    <StatusCodeScreen statusCode={statusCode} />
                        :
                            posts?.map(post => {
                                return (<PostCard key={post.post_id} author_pic={post.picture_url} author={post.username}
                                    description={post.description} url={post.url} postId={post.post_id}
                                    userId={linkirUser.userId} onclick={() => onClickUser(post.user_id)}></PostCard>
                                )
                            })
            }

        </>

    )
};

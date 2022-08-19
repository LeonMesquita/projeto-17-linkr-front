import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useLocalStorage from "../../hooks/useLocalStorage";
import UserContext from '../../contexts/UserContext';
import ClickedUserContext from '../../contexts/ClickedUserContext';
import styled from 'styled-components';
import SearchBar from '../SearchBar';
import { TimelineTitle } from './style';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { followUser, unfollowUser } from '../../handlers/handleFollowUser.js';
//
export default function PageTitle({ title, isPageLoaded, params, userPicture}){
    const [linkrUser] = useLocalStorage("linkrUser", "");
    const { url } = useContext(UserContext);
    const {isFollowed, setIsFollowed, isUserPosts, clickedUser } = useContext(ClickedUserContext);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    async function getUserFollowers(){
        setIsLoading(true);
        try{
            const promise = await axios.get(`${url}/follow/${clickedUser.id}`);
            console.log(promise.data);
            if(promise.data.find(follower => follower.follower_id === linkrUser.userId)){
                setIsFollowed(true);
            }
            else{
                setIsFollowed(false)
            }

        }catch(err){

        }
        setIsLoading(false);
    }

    function callFollowUser(){
        followUser(linkrUser.userId, clickedUser.id, setIsFollowed, linkrUser, setIsDisabled, url);
    }

    function callUnfollowUser(){
        unfollowUser(linkrUser.userId, clickedUser.id, setIsFollowed, linkrUser, setIsDisabled, url);
    }

    useEffect(() => {
        getUserFollowers();
    },[]);
 
    return(
        <SubHeaderContainer>
            <SearchContainer>
                <SearchBar params={params}/>
            </SearchContainer>
            <TitleContainer>
            {
                !isPageLoaded
                ? <p><Skeleton  count={1} baseColor="#333333" highlightColor="#272727" width="100%" height="64px" borderRadius="15px" duration={2}/></p>
                : isUserPosts ?
                <UserTitle isDisabled={isDisabled}>
                    <img src={clickedUser.pictureUrl} alt=""/>
                    <h1>{title}</h1>
                    { clickedUser.id !== linkrUser.userId && !isLoading?
                     <button className={isFollowed ? 'unfollow-button' : ''} onClick={isFollowed ? callUnfollowUser : callFollowUser} disabled={isDisabled}>{isFollowed ? 'Unfollow' : 'Follow'}</button>
                     : null
                    }
                   
                </UserTitle>
                :
                <TimelineTitle>{title}</TimelineTitle>
            }    
            </TitleContainer>
        </SubHeaderContainer>

    )
};


const SearchContainer = styled.section`
    display:none;
    width: 100%;
    height: 100%;
    margin-top: 10px;
`
const TitleContainer = styled.section`
min-width: 611px;

@media screen and (max-width: 611px){
    min-width: 100%;
}
`
const SubHeaderContainer = styled.section`

    @media screen and (max-width: 966px){
        ${TitleContainer}{
            p{padding: 0 17px;
            }
    }
    @media screen and (max-width: 611px){
        ${SearchContainer}{display:flex;}
        ${TitleContainer}{
            margin-top: 19px;
        }
    }
}
`

const UserTitle = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: 10px;
    position: relative;
   
    margin-bottom: 20px;

    img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 20px;
    }

    h1{
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 40px;
        color: #FFFFFF;
        max-width: 55%;
    }

    button{
        position: absolute;
        right: 10px;
        width: 112px;
        height: 31px;
        background: ${props => (props.isDisabled ? `grey` : `#1877F2`)};
        
        cursor: ${props => (props.isDisabled ? `auto` : `pointer`)};
        border-radius: 5px;
        border: none;
        font-family: 'Lato';
        font-weight: 700;
        font-size: 14px;
        color: #FFFFFF;
        transition: background-color 0.3s;


            &:hover:enabled{
                opacity: 0.7;
            }
        
    }

    .unfollow-button{
        background: white;
        color: #1877F2;
    }

    @media(max-width: 440px) {
        h1{
            font-size: 30px;
        }
        img{
            width: 40px;
            height: 40px;
        }
    }

    @media(max-width: 360px) {
        h1{
            font-size: 20px;
        }
        button{
            width: 75px;
        }
    }
`
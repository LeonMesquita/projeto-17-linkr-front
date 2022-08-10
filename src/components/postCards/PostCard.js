import { useContext } from "react";

import UserContext from "../../contexts/UserContext";

import styled from "styled-components";
import { CardContainer, PostContentSide, PostSide } from  "../style.js";


export default function PostCard({description,title, link_info,link_image,url}){
    const { user } = useContext(UserContext);
    return(
        <CardContainer className="post">
            <PostContentSide>
                <img src={user.pictureUrl} alt="user" />
            </PostContentSide>
            <PostSide>
                <PostInfos>
                    <h1>{user.username}</h1>
                    <span>{description}</span>
                    <UrlContainer>
                        <UrlDescriptionSide>
                            <h1>{title}</h1>
                            <span>{link_info}</span>
                            <h2>{url}</h2>
                        </UrlDescriptionSide>
                        <UrlImageSide>
                            <img src={link_image} alt={title}></img>
                        </UrlImageSide>
                    </UrlContainer>
                </PostInfos>
            </PostSide>
        </CardContainer>
    )
};

const PostInfos = styled.div`

    h1,span{font-weight: 400;}
    h1{
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
        h1,span{font-weight: 400;}
        h1{
            font-size: 17px;
            line-height: 20px;
        }
        span{
            font-size: 15px;
            line-height: 18px;
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
`

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styled from "styled-components";
import { CardContainer, PostContentSide, PostSide } from "../style"


export default function PostSkeleton({ lastPostElementRef }) {

    return (
        <CardContainer className="post" ref={lastPostElementRef}>
            <PostContentSide className="post">
                <SkeletonTheme baseColor="#171717" highlightColor="#272727" width="100%" height="23px" >
                    <ProfilePicLoading>
                        <p><Skeleton count={1} duration={2} height="100%" width="100%" borderRadius="25px"/></p>
                    </ProfilePicLoading>
                </SkeletonTheme>
            </PostContentSide>
            <PostSide>
            <SkeletonTheme baseColor="#171717" highlightColor="#272727" height="100%" width="100%" duration={2}>
                    <PublishLoading>
                        <p><Skeleton  count={1} /></p>
                        <p><Skeleton  count={1} /></p>
                        <p><Skeleton  count={1} borderRadius="12px"/></p>
                    </PublishLoading>
                </SkeletonTheme>
            </PostSide>
        </CardContainer>
    )
};

const ProfilePicLoading = styled.div`
    & p:nth-child(1){
        width:50px;
        height:50px;
    }
`
const PublishLoading = styled.div`
    & p{border-radius: 5px;}
    & p:nth-child(1){
        height: 24px;
        margin-bottom: 15px;
    }
    & p:nth-child(2){
        height: 30px;
    }
    & p:nth-child(3){
        border: 1px solid #272727;
        height: 150px;
        margin-top: 10px;
        border-radius: 11px;
    }
    @media screen and (max-width: 431px){

        & p:nth-child(1){
            height: 20px;
            margin-bottom: 7px;
        } 
        & p:nth-child(2){
            height: 52px;
            margin-top: 2.5px;
        & p:nth-child(3){
            height: 115px;
            margin-top: 10px;
        }
        ${ProfilePicLoading}{
            p{
                width: 40px;
                heigth: 40px;
            }
        }
    }
`

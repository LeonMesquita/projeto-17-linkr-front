import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styled from "styled-components";
import { CardContainer, PostContentSide, PostSide } from "../style"


export default function PublishSkeleton() {

    return (
        <CardContainer className="publish">
            <PostContentSide className="publish">
                <SkeletonTheme baseColor="#FFFFFF" highlightColor="#e0e0e0" width="100%" height="23px" >
                    <ProfilePicLoading>
                        <Skeleton
                            width="50px"
                            height="50px"
                            count={1}
                            duration={2}
                        />
                    </ProfilePicLoading>
                </SkeletonTheme>
            </PostContentSide>
            <PostSide>
            <SkeletonTheme baseColor="#FFFFFF" highlightColor="#e0e0e0" width="100%" height="23px" >
                    <PublishLoading>
                        <p><Skeleton  count={1} height="100%" width="100%" duration={2}/></p>
                        <p><Skeleton  count={1} height="100%" width="100%" duration={2}/></p>
                        <p><Skeleton  count={1} height="100%" width="100%" duration={2}/></p>
                        <p><Skeleton  count={1} height="100%" width="100%" duration={2}/></p>
                    </PublishLoading>
                </SkeletonTheme>
            </PostSide>
        </CardContainer>
    )
};

const ProfilePicLoading = styled.div`
    span {
        border-radius: 50px;
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
        margin-bottom: 2.5px;
    }
    & p:nth-child(3){
        height: 60px;
        margin-top: 2.5px;
    }
    & p:nth-child(4){
        width: 112px;
        height: 31px;
        margin-top: 5px;
        float: right;
    }

    @media screen and (max-width: 431px){
        & p:nth-child(3){
            height: 52px;
            margin-top: 2.5px;
        }
        & p:nth-child(4){
            height: 22px;
        } 
    }
`

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styled from "styled-components";
import { CardContainer, PostContentSide, PostSide } from "../../style.js";


export default function PostSkeleton() {

    return (
        <CardContainer className="post">
            <PostContentSide className="post">
                <SkeletonTheme baseColor="#171717" highlightColor="#272727" width="100%" height="100%" borderRadius="25px">
                    <ProfilePicLoading>
                        <p><Skeleton count={1} duration={1.2}  /></p>
                    </ProfilePicLoading>
                </SkeletonTheme>
            </PostContentSide>
            <PostSide>
            <SkeletonTheme baseColor="#171717" highlightColor="#272727" width="100%" height="100%" duration={1.2}>
                    <PublishLoading>
                        <p><Skeleton  count={1} /></p>
                        <p><Skeleton  count={1} /></p>
                        <p><Skeleton  count={1} /></p>
                        <UrlBox>
                            <UrlBoxTextSide>
                                <span><Skeleton  count={1} /></span>
                                <span><Skeleton  count={1} /></span>
                                <span><Skeleton  count={1} /></span>
                            </UrlBoxTextSide>
                            <UrlPNGSide>
                                <h1><Skeleton  count={1} borderRadius="0px 12px 13px 0px" /></h1>
                            </UrlPNGSide>
                        </UrlBox>
                        

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




const UrlBox = styled.div`
    display:flex;
    border: 1px solid #272727;
    height: 157px;
    width: 100%;
    margin-top: 10px;
    border-radius: 11px;
`

const UrlBoxTextSide = styled.div`
    display:flex;
    width: 350px;
    padding: 24px 20px;
    flex-direction: column;
    & span:nth-child(1){
        height: 19px;
        margin-bottom: 5px;
    }
    & span:nth-child(2){
        height: 50px;
        margin-bottom: 5px;
    }
    & span:nth-child(3){
        height: 13px;
        margin-top: 13px;
    }
`
const UrlPNGSide = styled.div`
    & h1:nth-child(1){
        width: 155px;
        height: 152px;
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
        height: 30px;
    }
    @media screen and (max-width: 645px){
        p,h1,span{
            width:100%
        }
    }

    @media screen and (max-width: 431px){
        p,h1,span{
            width:100%
        }
        & p:nth-child(1){
            height: 20px;
            margin-bottom: 7px;
        } 
        & p:nth-child(4){
            height: 115px;
            margin-top: 10px;
        }
        ${ProfilePicLoading}{
            p{
                width: 40px;
                heigth: 40px;
            }
        }
        ${UrlBoxTextSide}{

        }
    }
`

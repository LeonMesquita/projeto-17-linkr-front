import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styled from 'styled-components';
import SearchBar from '../SearchBar';
import { TimelineTitle } from './style';

export default function PageTitle({ title, isLoading, isUserPosts, clickedUserPicture }){

    return(
        <SubHeaderContainer>
            <SearchContainer>
                <SearchBar />
            </SearchContainer>
            <TitleContainer>
            {
                isLoading
                ? <p><Skeleton  count={1} baseColor="#333333" highlightColor="#272727" width="100%" height="64px" borderRadius="15px" duration={2}/></p>
                : isUserPosts ?
                <UserTitle>
                    <img src={clickedUserPicture} alt=""/>
                    <h1>{title}</h1>
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
    margin-top: 10px;
`
const TitleContainer = styled.section`
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
        font-size: 43px;
        line-height: 64px;
        color: #FFFFFF;
    }
`
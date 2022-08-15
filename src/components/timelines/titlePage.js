import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styled from 'styled-components';
import SearchBar from '../SearchBar';
import { TimelineTitle } from './style';

export default function PageTitle({ title, isLoading }){

    return(
        <SubHeaderContainer>
            <SearchContainer>
                <SearchBar />
            </SearchContainer>
            <TitleContainer>
            {
                isLoading
                ? <p><Skeleton  count={1} baseColor="#333333" highlightColor="#272727" width="100%" height="64px" borderRadius="15px" duration={2}/></p>
                : <TimelineTitle>{title}</TimelineTitle>
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
`



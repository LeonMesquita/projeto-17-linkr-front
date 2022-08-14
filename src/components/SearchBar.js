import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from "styled-components";

export default function SearchBar(){
    return(
        <SearchBarContainer>
            <SearchInput
                placeholder="Search for people"
                disabled
            />
            <ion-icon name="search" ion-icon />
        </SearchBarContainer>
    )
}

const SearchInput = styled.input`
    width: 100%;
    background-color: #FFFFFF;
    font-size: 19px;
    line-height: 23px;
    color: #000000;
    &::placeholder{
        color: #949494;
    }
`

const SearchBarContainer = styled.section`
    width: 100%;
    height: 45px;
    background: #FFFFFF;
    border-radius: 8px;
    padding: 0 15px;
    display:flex;
    align-items:center;
    ion-icon{
        margin-left: 15px;
        width: 25px;
        height: 25px;
        color: #C6C6C6;
    }
    p{
        widht: 100%;
        heigth: 100%;
    }
    @media screen and (max-width: 836px){
        margin: 0 17px;
    }
`

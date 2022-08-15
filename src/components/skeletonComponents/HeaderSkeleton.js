import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styled from "styled-components";
import SearchBar from '../SearchBar';

export default function HeaderSkeleton() {

    return (
        <HeaderContainer>
            <h1>linkr</h1>
            <SearchContainer>
                <SearchBar />
            </SearchContainer>
            <ProfileContainer>
            <ion-icon name="chevron-down-outline"></ion-icon>
                <p>
                    <Skeleton
                    baseColor="#171717"
                    highlightColor="#272727"
                    width="50px"
                    height="50px"
                    borderRadius="25px"
                    count={1}
                    duration={2}
                    />
                </p>
            </ProfileContainer>
        </HeaderContainer>

    )
};

const ProfileContainer = styled.div`
    display:flex;
    align-items:center;
    ion-icon{
        width: 25px;
        height: 25px;
        color: #FFFFFF;
        margin-right: 10px;
    }
`
const SearchContainer = styled.div`
    width: 563px;
    display:flex;
`

const HeaderContainer = styled.header`
    display:flex;
    align-items: center;
    justify-content:space-between;
    width:100%;
    height: 72px;
    background: #151515;
    padding: 0 17px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2
    ;
    h1{
        font-family: 'Passion One';
        font-style: normal;
        font-weight: 700;
        font-size: 49px;
        line-height: 54px;
        color: #ffffff;
        /* identical to box height */
        letter-spacing: 0.05em;
    }
    @media screen and (max-width: 836px){
        ${SearchContainer}{margin: 0 17px;}
    }
    @media screen and (max-width: 611px){
        ${SearchContainer}{display:none;}
    }
`


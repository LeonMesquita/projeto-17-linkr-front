import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from './SearchBar';
import HeaderSkeleton from "./skeletonComponents/HeaderSkeleton.js";

export default function Header({ isLoading }) {

    let navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const localstorage = JSON.parse(localStorage.getItem("linkrUser"));
  
    function logout() {
        localStorage.setItem("linkrUser", JSON.stringify(" - "));
        navigate("/", { replace: true });
    }

    return (
        <>
            {
                isLoading
                    ? <HeaderSkeleton />
                    :
                    <HeaderContainer>
                        <Link to={`/timeline`}>
                            <h1>linkr</h1>
                        </Link>
                      
                        <SearchContainer>
                            <SearchBar/>
                        </SearchContainer>
                      
                        {isOpen ?
                            (<>
                                <LogoutBoxOpen onClick={() => setIsOpen(false)}>
                                    <div>
                                        <ion-icon name="chevron-up"></ion-icon>
                                        <img src={localstorage.profilePic} alt="user" />
                                    </div>

                                    <h1 onClick={logout}>Logout</h1>
                                </LogoutBoxOpen>
                            </>)
                            :
                            (<>
                                <LogoutBox onClick={() => setIsOpen(true)}>
                                    <ion-icon name="chevron-down"></ion-icon>
                                    <img src={localstorage.profilePic} alt="user" />
                                </LogoutBox>
                            </>)}

                    </HeaderContainer>
            }
        </>
    )
};

const SearchContainer = styled.div`
    width: 563px;
    display:flex;
`

const LogoutBox = styled.div`

    display: flex;
    justify-content: center;
    align-items:center;
    margin: 7px;
    margin-right: 0px;
    padding:5px;
    min-width: 120px;
    min-height: 50px;
    background: #151515;
    border-bottom-left-radius: 20px;
   
    ion-icon{
        color: #FFFFFF;
        margin-right: 5px;
        font-size: 25px;
    }
    img{
        width: 53px;
        height: 53px;
        border-radius: 26.5px;
    }
    @media screen and (max-width: 431px){
        img{
            width: 41px;
            height: 41px;
            border-radius: 26.5px;
        }
    }
`

const LogoutBoxOpen = styled.div`
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    margin: 7px;
    margin-right: 0px;
    padding:5px;
    min-width: 120px;
    min-height: 100px;
    background: #151515;
    border-bottom-left-radius: 20px;
    margin-top: 48px;
    div{
        display: flex;
        flex-direction: row;
        
    }
    ion-icon{
        margin-top: 5px;
        margin-right: 5px;
        color: #ffffff;
        font-size: 25px;
    }
    h1{
        margin-top: 10px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
    }
    img{
        margin-top: -1px;
        width: 53px;
        height: 53px;
        border-radius: 26.5px;
    }
    @media screen and (max-width: 431px){
        img{
            width: 41px;
            height: 41px;
            border-radius: 26.5px;
        }
    }
`

const HeaderContainer = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    width:100%;
    height: 72px;
    background: #151515;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 3;
    h1{
        margin: 10px;
        margin-left: 20px;
        font-family: 'Passion One';
        font-style: normal;
        font-weight: 700;
        font-size: 49px;
        line-height: 54px;
        color: #ffffff;
        /* identical to box height */
        letter-spacing: 0.05em;
    }
    @media screen and (max-width: 611px){
        ${SearchContainer}{display:none;}
    }
`
import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useComponentVisible from "../hooks/useComponentVisible";

import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from './SearchBar';
import HeaderSkeleton from "./skeletonComponents/HeaderSkeleton.js";

import { IoIosArrowUp } from "react-icons/io";
import {FiLogOut} from "react-icons/fi"
export default function Header({ isPageLoaded }) {

    let navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [ cleanOpen, setCleanOpen ] = useState(false);
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true, setCleanOpen);

    const linkrUser = useLocalStorage("linkrUser", "")[0];
    const localstorage = JSON.parse(localStorage.getItem("linkrUser"));
    
    function logout() {
        localStorage.setItem("linkrUser", JSON.stringify(" - "));
        navigate("/", { replace: true });
    }

    useEffect(() => {
        setIsOpen(false);
        setIsComponentVisible(true);
    }, [cleanOpen])

    const handleOpenDropdown = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            {
                !isPageLoaded
                    ? <HeaderSkeleton />
                    :
                    <HeaderContainer>
                        <Link to={`/timeline`}>
                            <h1>linkr</h1>
                        </Link>

                        <SearchContainer>
                            <SearchBar />
                        </SearchContainer>
                        <Dropdown ref={ref}>
                            <IoIosArrowUp className={ isOpen ? "open" : ""} onClick={handleOpenDropdown}/>
                            <img src={linkrUser.profilePic} alt="User"/>
                            {
                                isComponentVisible && (
                                    <DropdownMenu className={isOpen ? "open" : ""}>
                                        <DropdownOption onClick={logout}>
                                            <h4>Logout</h4> 
                                            <FiLogOut />
                                        </DropdownOption>
                                    </DropdownMenu>
                                )
                            }
                        </Dropdown>
                    </HeaderContainer>
            }
        </>
    )
};

const DropdownOption = styled.div`
    display:flex;
    align-items:center;
    width: 100%;
    border-radius: 5px;
    padding:5px;
    transition: ease all .5s;
    h4{
        color: #FFFFFF;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        letter-spacing: 0.05em;
        margin-left: 10px;
    }
    &:hover{
        background-color: #1877F2;
        opacity: 0.8;

    }

`

const DropdownMenu = styled.div`
    position:absolute;
    width:100%;
    top: 61px;
    left: 0;
    display:none;
    flex-direction:column;
    svg{
        width: 20px;
        height: 20px;
        color: #FFFFFF;
        margin-left: 10px;
        transition: ease all .5s;
    }
    transition: ease all .5s;
    &.open{
        display:flex;
        padding: 10px;
        height: auto;
        background-color: #171717;
        border-radius: 0px 0px 0px 20px;
    }
`

const Dropdown = styled.section`
    width: 140px;
    position: relative;
    display:flex;
    align-items:center;
    padding-right: 17px;
    padding-left: 30px;

    & > svg{
        width: 25px;
        height: 25px;
        color: #FFFFFF;
        margin-right: 10px;
        transition: ease all .5s;
        transform: rotate(-180deg)
    } 
    & > svg.open{
        transform: rotate(0)
    }
    img{
        width: 50px;
        height: 50px;
        border-radius: 25px;
    }
`

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
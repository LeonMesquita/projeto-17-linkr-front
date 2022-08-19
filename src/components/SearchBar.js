import { useContext, useState } from "react";
import useLocalStorage from '../hooks/useLocalStorage';
import useSearchUsers from '../hooks/useSearchUsers';
import useComponentVisible from "../hooks/useComponentVisible";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ClickedUserContext from "../contexts/ClickedUserContext";
import UserContext from '../contexts/UserContext';

import 'react-loading-skeleton/dist/skeleton.css';
import styled from "styled-components";

export default function SearchBar({ params }) {
    const linkrUser = useLocalStorage("linkrUser", "")[0]
    const { setSearchValue, searchValue, users, openSearch, setOpenSearch, error, setCleanSearch } = useSearchUsers("search", params, linkrUser.token)
    const { ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(true, setCleanSearch);
    const handleKey = (e) => console.log(e.key)
    const handleSearchChange = (e) => {
        setSearchValue({ ...searchValue, [e.target.name]: e.target.value });
    }

    const handleKeyPress = (e) => {
        console.log(e.key)
        const { key } = e;
        if (key === "Escape") setOpenSearch(false);
    }

    return (
        <SearchBarContainer ref={ref}>

                    <SearchBarBox >
                    <SearchInput
                        autoComplete='off'
                        name="searchValue"
                        value={searchValue.searchValue}
                        onClick={() => setIsComponentVisible(true)}
                        onChange={handleSearchChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Search for people"
                    />
                    <ion-icon name="search" ion-icon />
                </SearchBarBox>
                
            {isComponentVisible && (
                <ResultsContainer>
                    {

                        error
                            ?
                            <ResultBox>
                                <h3>No users founded</h3>
                            </ResultBox>

                            : openSearch
                                ?
                                <ResultBox>
                                    {users?.map(user => {
                                        return (

                                            <Result key={user.id}>
                                                <Link to={`/user/${user.id}`}>
                                                    <img src={user.picture_url} alt="user" />
                                                    <span>{user.username} </span>
                                                    {user.following ? <span className='following'>• following</span> : user.id === linkrUser.userId ? <span className='following'>• you</span> : <></>}
                                                </Link>
                                            </Result>

                                        )
                                    })}
                                </ResultBox>
                                : <></>
                    }
                </ResultsContainer>
            )}
        </SearchBarContainer >
    )
}
const ResultBox = styled.div`

    transition: ease all .5s;
    overflow-y: scroll;
    overflow-x: hidden;
    width:100%;
    padding: 13px;
    max-height: 130px;
    h3{
        text-align:center;
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;
        color: #707070;
    }
`

const Result = styled.div`

    img{
        margin-right: 15px;
        width: 40px;
        height: 40px;
        border-radius: 20px;
    }
    a {
        display: flex;
        align-items:center;
        text-decoration: none;
        color: inherit;
        cursor: auto;
        & > span{
            font-weight: 400;
            font-size: 19px;
            line-height: 23px;
            color: #515151;
        }
        & > span.following{
            color: #C5C5C5;
            margin-left: 7px;
        }
    }
`

const ResultsContainer = styled.div`
    display: flex;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: 1;
    box-sizing: border-box;
    flex-direction: column;
    border-radius: 8px;
    background: #E7E7E7;
    padding-top: 45px;
    transition: ease all .5s;
    ${Result} {margin-top: 7.5px;}
    ${Result}:first-of-type {margin-top: 0px;}
    ${Result}:first-of-type {margin-bottom: 0px;}

`

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

const SearchBarBox = styled.div`
    top: 0px;
    left: 0px;
    width: 100%;
    height: 45px;
    z-index: 2;
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
        width: 100%;
        height: 100%;
    }

`

const SearchBarContainer = styled.section`
    display:flex;
    position: relative;
    height: 45px;
    width: 100%;
    background: #FFFFFF;
    border-radius: 8px;

    @media screen and (max-width: 836px){
        margin: 0 17px;
    }
`
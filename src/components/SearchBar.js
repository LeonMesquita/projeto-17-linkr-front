import 'react-loading-skeleton/dist/skeleton.css';
import styled from "styled-components";
import { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserContext from '../contexts/UserContext';
import useLocalStorage from '../hooks/useLocalStorage';


export default function SearchBar() {

    const { url } = useContext(UserContext);
    const linkrUser = useLocalStorage("linkrUser", "")[0]
    const [searchUser, setSearchUser] = useState({ searchUsername: "" });
    const [usersFinded, setUserFinded] = useState([]);
    const [searchBoxIsOpened, setSearchBoxIsOpen] = useState(true)
    const handleSearchUsers = async (typeWord) => {

        const promise = axios.get(`${url}/search/${typeWord}`, linkrUser.token);

        promise.then((res) => {
            setUserFinded(res.data);
        })
        promise.catch((e) => {
            setUserFinded([]);
        })
    }
    const handleSearchChange = (e) => {
        setSearchUser({ ...searchUser, [e.target.name]: e.target.value });
        handleSearchVerify(e.target.value);
    }

    const handleSearchVerify = (typeWord) => {
        let searchTimeout;
        const THREE_MILLISECONDS = 300;
        if (typeWord.length > 2) searchTimeout = setTimeout(handleSearchUsers(typeWord), THREE_MILLISECONDS);
        if (typeWord.length <= 2 || searchTimeout) {
            setUserFinded([]);
            clearTimeout(searchTimeout);
        }
    }


    const handleToggleSearchBox = (e) => {
        const { key } = e;
        if (key === "Escape") setSearchBoxIsOpen(false);
    }
    return (
        <SearchBarContainer >
            <SearchBarBox >
                <SearchInput
                    autoComplete='off'
                    name="searchUsername"
                    value={searchUser.searchUsername}
                    onChange={handleSearchChange}
                    placeholder="Search for people"
                />
                <ion-icon name="search" ion-icon />
            </SearchBarBox>

            <ResultsContainer className={usersFinded.length > 0 ? "open" : ""}>
                {
                    usersFinded?.map(user => {
                        return (
                            <Result key={user.id}>
                                <Link to={`/user/${user.id}`}>
                                    <img src={user.picture_url} alt="user" />
                                    <span>{user.username} </span>
                                    {user.following ? <span className='following'>• following</span> : user.id === linkrUser.userId ?<span className='following'>• you</span> : <></>}
                                </Link>
                            </Result>

                        )
                    })
                }

            </ResultsContainer>
        </SearchBarContainer >
    )
}

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
    height: 100%;
    height: auto;
    z-index: 1;
    box-sizing: border-box;
    flex-direction: column;
    border-radius: 8px;
    background: #E7E7E7;
    padding: 0 17px;
    height: 20px;
    ${Result} {margin-top: 7.5px;}
    ${Result}:first-of-type {margin-top: 0px;}
    ${Result}:first-of-type {margin-bottom: 0px;}
    &.open{
        width:100%;
        padding-top: 60px;
        padding-bottom: 15px;
        height: 210px;
        overflow-y: scroll;
        overflow-x: hidden;
    }

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







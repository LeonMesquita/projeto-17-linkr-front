import 'react-loading-skeleton/dist/skeleton.css';
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SearchBar(){

    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    //salvar profilePic com a imagem do usuario que aparece no botao do logout
    const localstorage = JSON.parse(localStorage.getItem("linkrUser"));

    function searchUser(value) {
        const promise = axios.get(`http://localhost:4000/search/${value}`, localstorage.token);
        promise.then((res) => {
            setUsers(res.data);
        });
        promise.catch((e) => {
            console.log(e);
        });
    }
    const handleChange = (event) => {
        setSearch(event.target.value);
        let myTimeout;
        if (event.target.value.length > 2) {
            myTimeout = setTimeout(searchUser(event.target.value), 200);
            //searchUser();
        }
        if (event.target.value.length <= 2) {
            setUsers([]);
            if (myTimeout) {
                clearTimeout(myTimeout);
            }
        }
    };

    return(
        <>
        <SearchBarContainer>
            <SearchInput  value={search} onChange={handleChange}
                placeholder="Search for people"
                
            />
            <ion-icon name="search" ion-icon />
            <ResultsContainer>
                {users.map(user => {
                    return (
                        <Link  key={user.id} to={`/user/${user.id}`}>
                            <Result>
                                <img src={user.picture_url} alt="user" />
                                <h1>{user.username}</h1>
                            </Result>
                        </Link>
                    )
                })}
            </ResultsContainer>
        </SearchBarContainer>
        
     </>
    )
}

const ResultsContainer = styled.div`
    position: absolute;
    left:0px;
    top:45px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    width: 100%;
    background: #E7E7E7;
`
const Result = styled.div`
    display: flex;  
    flex-direction:row;
    img{
        margin-left: 15px;
        width: 39px;
        height: 39px;
        border-radius: 30px;
    }
    h1{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #515151;
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
const SearchBarContainer = styled.section`
    position: relative;
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
        width: 100%;
        height: 100%;
    }
    @media screen and (max-width: 836px){
        margin: 0 17px;
    }
    @media screen and (max-width: 611px){
       display:none;
    }
`
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
//import styled from "styled-components";
import { HeaderContainer } from "./style.js";
import axios from "axios";

export default function Header() {

    //const handleLogout = () => useLocalStorage("linkrUser", "");

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    //salvar profilePic com a imagem do usuario que aparece no botao do logout
   const profilePic = JSON.parse(localStorage.getItem("linkrUser")).profilePic;

    function searchUser(){
        const promise = axios.get(`http://localhost:4000/search/${search}`);
        promise.then((res)=>{
            setUsers(res.data);
            });
        promise.catch((e) => {
            console.log(e);
        });
    }

    function logout(){
       // localStorage.setItem("linkrUser","")
        
    }

    return (
        <HeaderContainer>
            <Link to={`/timeline`}><h1>
                linkr
            </h1></Link>
            <SearchContainer>
                <ion-icon onClick={searchUser} name="search"></ion-icon>
                <Search placeholder="    Search for people" value={search} onChange={e => setSearch(e.target.value)}></Search>
                <ResultsContainer>
                        {users.map( user => {
                            return (
                                <Link to={`/user/${user.id}`}>
                                    <Result key={user.id}>
                                        <img src = {user.picture_url} alt="user"/>
                                        <h1>{user.username}</h1>
                                    </Result>
                                </Link>
                            )
                            })  }  
                </ResultsContainer>
            </SearchContainer>

            {isOpen ?
                (<> 
                <LogoutBoxOpen onClick={()=>setIsOpen(false)}>
                    <div>
                    <ion-icon name="chevron-up"></ion-icon>
                    <img src={profilePic} alt="user" />
                    </div>
                    
                    <h1 onClick={logout}>Logout</h1>
                </LogoutBoxOpen>
                </>)
                :
                (<>
                    <LogoutBox onClick={()=>setIsOpen(true)}>
                        <ion-icon name="chevron-down"></ion-icon>
                        <img src={profilePic} alt="user" />
                    </LogoutBox>
                </>)}

        </HeaderContainer>
    )
};

const ResultsContainer=styled.div`
    position: absolute;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    
    background: #E7E7E7;
`
const Result=styled.div`
    display: flex;  
    flex-direction:row;
    
   
    width: 25vw;
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
const SearchContainer = styled.div`
    position: relative;
    ion-icon{
        position: absolute;
        left:23vw;
        top:10px;
        color: #C6C6C6;
        margin-right: 5px;
        font-size: 25px;
    }
   
`
const Search = styled.input`
    
    border-radius: 8px;
    width: 25vw;
    height: 45px;
    ::placeholder{
        margin-left: 20px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #C6C6C6;
    }
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
        margin-top: -2px;
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
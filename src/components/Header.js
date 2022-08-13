import { useContext , useState } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
//import styled from "styled-components";
import { HeaderContainer } from "./style.js";

export default function Header() {
    const { user } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    let navigate = useNavigate(); 
    user.pictureUrl="http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcSE3zNnbeADg_Mk-hQ_A-cKTuUtXqdxfeAYYFOP7bGqkbXfp5fNMVVJcWwi7fRDLXg7xkmTSGGk2HqrsOQ8EYg";
    return (
        <HeaderContainer>
            <h1>
                linkr
            </h1>
            <SearchContainer>
                <ion-icon onClick={()=>navigate(`/`)} name="search"></ion-icon>
                <Search placeholder="    Search for people" value={search} onChange={e => setSearch(e.target.value)}></Search>
            </SearchContainer>
            
            {isOpen ?
                (<> 
                <LogoutBoxOpen onClick={()=>setIsOpen(false)}>
                    <div>
                    <ion-icon name="chevron-up"></ion-icon>
                    <img src={user.pictureUrl} alt="user" />
                    </div>
                    
                    <h1>Logout</h1>
                </LogoutBoxOpen>
                </>)
                :
                (<>
                    <LogoutBox onClick={()=>setIsOpen(true)}>
                        <ion-icon name="chevron-down"></ion-icon>
                        <img src={user.pictureUrl} alt="user" />
                    </LogoutBox>
                </>)}

        </HeaderContainer>
    )
};
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

        /* identical to box height */

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
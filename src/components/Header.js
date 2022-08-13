import { useContext , useState } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";

//import styled from "styled-components";
import { HeaderContainer } from "./style.js";

export default function Header() {
    const { user } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <HeaderContainer>
            <h1>
                linkr
            </h1>
            {isOpen ?
                (<> 
                <LogoutBoxOpen onClick={setIsOpen(false)}>
                    <img src={user.pictureUrl} alt="user" />
                    <h1>Logout</h1>
                </LogoutBoxOpen>
                </>)
                :
                (<>
                    <LogoutBox onClick={setIsOpen(true)}>
                        <img src={user.pictureUrl} alt="user" />
                    </LogoutBox>
                </>)}

        </HeaderContainer>
    )
};

const LogoutBox = styled.div`
    margin: 7px;
    min-width: 60px;
    min-height: 50px;

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
    margin: 7px;
    min-width: 60px;
    min-height: 90px;

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
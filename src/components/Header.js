import { useContext } from "react";

import UserContext from "../contexts/UserContext";

//import styled from "styled-components";
import { HeaderContainer , LogoutBox} from  "./style.js";

export default function Header(){
    const { user } = useContext(UserContext);

    return(
        <HeaderContainer>
            <h1>
                linkr
            </h1>
            <LogoutBox>
                <img src={user.pictureUrl} alt="" />
            </LogoutBox>
        </HeaderContainer>
    )
};

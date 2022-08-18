import styled from 'styled-components';
import { BiRefresh } from "react-icons/bi";



export default function WarningPopup({warningText, onClickRefresh}){
    function scrollToTop(){

    }
    return(
        <PopupDiv>
            <Popup>
                <h1>{warningText}</h1>
                <BiRefresh onClick={onClickRefresh}/>

            </Popup>
        </PopupDiv>
    );

}

const PopupDiv = styled.div`
    top: 150px;
    width: 100%;
    display: flex;

`

const Popup = styled.div`
    width: 100%;
    max-width: 611px;
    height: 61px;
    background: #1877F2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;


    svg{
        width: 25px;
        height: 25px;
        cursor: pointer;
    }
    h1{
        font-family: 'Lato';
        font-size: 16px;
        line-height: 19px;
        margin-right: 14px;
    }



`
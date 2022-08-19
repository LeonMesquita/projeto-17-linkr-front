import React from 'react'
import { BiRefresh } from 'react-icons/bi';

import styled from 'styled-components';

export default function LoadNewPosts({ refreshClick, number }) {

    return(
        <PopupDiv onClick={refreshClick}>
            <Popup>
                <h1>{number} new post(s), load more!</h1>
                <BiRefresh />

            </Popup>
        </PopupDiv>
    );

}

const PopupDiv = styled.button`
    top: 150px;
    width: 100%;
    display: flex;
    margin-bottom: 15px;
    @media screen and (max-width: 611px){
        width: calc(100% - 34px)
        margin: 0px auto 15px auto;
    }

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

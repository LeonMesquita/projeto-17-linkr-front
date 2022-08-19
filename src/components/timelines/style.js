import styled from "styled-components";
import { CardContainer } from "../style";

const Main = styled.main`
    width: 100%;
    display:flex;
    flex-direction: column;
`
const TimelineTitle = styled.section`
    display:flex;
    width: 100%;
    padding-left:17px;
    justify-content: left;
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;

`

const Feed = styled.div`
    width: 100%;
    display:flex;
    margin-top: 40px;
    padding: 0 17px;
`

const LeftSide = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    margin-right: 15px;
`
const RightSide = styled.div`
`



const Body = styled.div`
    width: 971px;
    min-height: 100vh;
    margin: 0 auto;
    margin-top: 125px;
    
    div.leftSide{
        margin-right: 25px;
    }
    &,
    ${Main}{transition: ease all .5s;}
    ${Feed}{transition: ease all .1s;}

    @media screen and (max-width: 966px){
        &{width:100%;}
        
        ${Feed}{
            padding: 0;
            transition: ease all 1s;
            width:611px;
            margin-left: auto;
            margin-right: auto;
        }
        ${RightSide}{display:none;}
        ${LeftSide}{margin-right: 0px;}
    }

    @media screen and (max-width: 655px){
        ${TimelineTitle}{padding-left: 17px;}
    }
    @media screen and (max-width: 611px){
        margin-top: 82px;
        ${Feed}{
            margin-top: 19px;
            width: 100%;
        }
        ${LeftSide}{width: 100%}
        ${CardContainer}{width: 100%}
    }
`

const PostSection = styled.section`
`

export  {
    Body,
    Main,
    TimelineTitle,
    Feed,
    LeftSide,
    RightSide,
    PostSection
}
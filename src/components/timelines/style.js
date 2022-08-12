import styled from "styled-components";

const Body = styled.div`
    width: 937px;
    height: 100vh;
    margin: 0 auto;
    margin-top: 125px;
    div.leftSide{
        margin-right: 25px;
    }

    transition: ease all .5s;

    @media screen and (max-width: 966px){
        div.rightSide{
            display:none;
        }
    }
`

const Main = styled.main`
    width: 100%;
    display:flex;
    flex-direction: column;
`
const TimelineTitle = styled.section`
    display:flex;
    width: 100%;

    justify-content: left;
    margin-bottom: 40px;
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;

    @media screen and (max-width: 630px){
        margin-left: 25px;
        width: 100%;
    }
`

const Feed = styled.div`
    width: 100%;
    display:flex;
`


const PostSection = styled.section`
`

export  {
    Body,
    Main,
    Feed,
    TimelineTitle,
    PostSection
}
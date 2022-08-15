import styled from "styled-components";

const CardContainer = styled.section`
    display:flex;
    width: 611px;
    background: #171717;
    position: relative;
    border-radius: 16px;
    padding: 18px;
    img{
        width: 50px;
        height: 50px;
        border-radius: 26.5px; 
    }

    transition: ease all .5s;
    
    &.publish{
        background-color: #FFFFFF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
    
    &.post{margin-top: 16px;}
    &.post:first-of-type{margin-top: 0px;}
    &:last-of-type{margin-bottom: 50px;}

    @media screen and (max-width: 611px){
        div.publish:first-of-type{
            display:none;
        }
        margin: 0 0;
        padding: 10px 15px;
        border-radius: 0px;
        h1{
            font-size: 17px;
            line-height: 20px;
            text-align: center;
        }
        img{
            width: 40px;
            height: 40px;

        }
    }
`;
const PostContentSide = styled.div`
    display:flex;
    justify-content:center;
    margin-right: 18px;
`;
const PostSide = styled.div`
    display:flex;
    flex-direction: column;
    width: 100%;
    h1{
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;
        color: #707070;
        margin-bottom: 15px;
    }

`;
const HeaderContainer = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    width:100%;
    height: 72px;
    background: #151515;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    h1{
        margin: 10px;
        margin-left: 20px;
        font-family: 'Passion One';
        font-style: normal;
        font-weight: 700;
        font-size: 49px;
        line-height: 54px;
        color: #ffffff;
        /* identical to box height */
        letter-spacing: 0.05em;
    }
`;



export { CardContainer, PostContentSide, PostSide, HeaderContainer };
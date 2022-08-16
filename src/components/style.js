import styled from "styled-components";

const PostContentSide = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-right: 18px;
    img{
        width: 50px;
        height: 50px;
        border-radius: 25px;
        margin-bottom:20px; 
    }
`;

const CardContainer = styled.section`
    display:flex;
    width: 611px;
    background: #171717;
    position: relative;
    border-radius: 16px;
    padding: 18px;

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
        ${PostContentSide}{
            img{
                width: 40px;
                height: 40px;
                margin-bottom: 15px;
            }
        }
    }
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




export { CardContainer, PostContentSide, PostSide };
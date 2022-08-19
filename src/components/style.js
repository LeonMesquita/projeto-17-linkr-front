import styled from "styled-components";

const PostContentSide = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    img{
        width: 50px;
        height: 50px;
        border-radius: 25px;
        margin-bottom:20px; 
    }
`;

const PostSide = styled.div`
    h1,span,p{
        word-break: break-all;
    }
    display:flex;
    flex-direction: column;
    width: 100%;
    height:100%;
    h1,span{font-weight: 400;}
    h1,p{
        font-size: 19px;
        line-height: 23px;
        color: #FFFFFF;
    }
    h1{
        margin-bottom: 7px;
    }
    span{
        min-height: 44px;
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;
    }
    @media screen and (max-width: 431px){
        h1,span,p{font-weight: 400;}
        h1,p{
            font-size: 17px;
            line-height: 20px;
        }
        span{
            font-size: 15px;
            line-height: 18px;
        }
    }
    p{
        cursor: pointer;
        &:hover{
            text-decoration: underline;
        }
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
    &.publish{
        ${PostContentSide}{
            padding-right:17px;
        }
        ${PostSide}{
            h1{
                font-weight: 300;
                font-size: 20px;
                line-height: 24px;
                color: #707070;
                margin-bottom: 15px;
            }
        }
    }
    
    &.post{
        margin-top: 16px;
        padding-left: 0px;
    }
    &.post:first-of-type{margin-top: 0px};
    &.post{
        ${PostContentSide}{
            width: 86px;
        }
    }


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
        }
        &.publish{
            h1{
                text-align:center;
            } 
        }

        ${PostContentSide}{
            img{
                width: 40px;
                height: 40px;
                margin-bottom: 15px;
            }
        }

    }
    &.publish{
        margin-bottom: 20px;
    }
`;





export { CardContainer, PostContentSide, PostSide };

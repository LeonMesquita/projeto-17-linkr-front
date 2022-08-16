import styled from "styled-components";
import robot204 from "../../assets/204/8.png"
import pirate204 from "../../assets/204/31.svg"
import crying404 from "../../assets/404/20.svg"

export default function StatusCodeScreen({ statusCode }){
    const { page, status } = statusCode

    const erroInfos = {
        timeline: {
            404: {
                picture: crying404,
                message: "You don't follow anyone yet",
            },
            204: {
                picture: pirate204,
                message: "No posts found from your friends",
            }
        },
        hashtag : {
            404: {
                picture: "",
                message: "",
            },
            204: {
                picture: "",
                message: "",
            }
        }
    }
    console.log(erroInfos[page][status].message)

    return(
        <CodeContainer>
            <h1>{erroInfos[page][status].message}</h1>
            <img src={erroInfos[page][status].picture} alt="" />
        </CodeContainer>
    )
};


const CodeContainer = styled.section`
    margin-top: 40px;
    width: 611px;
    display:flex;
    flex-direction: column;
    align-items:center;
    & > img {
        width: 100%;
    }
    & > h1{
        text-align: center;
        margin: 0 17px;
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 30px;
        line-height: 64px;
        color: #FFFFFF;
        word-break: break-word;
    }
    @media screen and (max-width: 655px){
        width: 100%;
        & > img{width: calc(100%-34px);}
    }
    @media screen and (max-width: 436px;){
        & > img{width: 100%;}
    }
`

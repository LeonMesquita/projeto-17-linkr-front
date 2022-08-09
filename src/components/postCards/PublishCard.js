import { useState, useContext } from "react";
import axios from "axios";

import TokenContext from "../../contexts/TokenContext";
import UserContext from "../../contexts/UserContext";

import styled from "styled-components";
import { CardContainer, PostContentSide, PostSide } from "./style";
import { ThreeDots } from "react-loader-spinner";

export default function PublishCard({ refreshPosts }) {
    const { token } = useContext(TokenContext);
    const { url, user } = useContext(UserContext);

    const [newPostInfos, setNewPostInfos] = useState({
        url: "",
        description: ""
    });
    const [isDisable, setIsDisable] = useState("");

    const handleInputs = (e) => {
        setNewPostInfos({ ...newPostInfos, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Oi")
        setIsDisable("disabled");
        if(newPostInfos.url.length === 0 || newPostInfos === 0){
            setIsDisable("")
            return console.log("Escreva Algo");
        }
        const promisse = axios.post(`${url}/timeline`, token, newPostInfos);
        const TWO_SECONDS = 2000;

        promisse.then(() => {
            refreshPosts();
            setTimeout(() => {setIsDisable("")}, TWO_SECONDS);
        })
        promisse.catch((res) => {
            const errors = res.response.data;
            errors.map((error) => {
                const erro = Object.keys(error)[0];
                const description = Object.values(error)[0];
                window.alert(`${erro} : ${description}`);
            })
            setTimeout(() => {setIsDisable("")}, TWO_SECONDS);
        });
    }

    return (
        <CardContainer className="publish">
            <PostContentSide className="publish">
                <img src={user.pictureUrl} alt="" />
            </PostContentSide>
            <PostSide>
                <h1>What are you going to share today?</h1>
                <Form 
                    onSubmit={handleSubmit}
                    className={isDisable}
                >
                    <Input
                        type="url"
                        placeholder="http://..."
                        id="urlInput"
                        value={newPostInfos.url}
                        name="url"
                        onChange={handleInputs}
                    />
                    <DescriptionBox
                        className="big"
                        type="text"
                        placeholder="Awesome article about #javascript"
                        id="descriptionInput"
                        value={newPostInfos.description}
                        name="description"
                        onChange={handleInputs}
                    />
                    <PublishButton type="submit">
                        {
                            isDisable === "disabled"
                                ? <ThreeDots
                                    height="18"
                                    width="63"
                                    color="#FFFFFF"
                                    ariaLabel='loading'
                                    />
                                : `Publish`
                        }
                    </PublishButton>
                </Form>
            </PostSide>
        </CardContainer>
    )
};

const Form = styled.form`
    button, input, textarea{
        border-radius: 5px;
        transition: ease all .5s;
    }
    input, textarea{
        width: 100%;
        background-color: #EFEFEF;
        font-size: 15px;
        line-height: 18px;
        color: #000000;
    }
    input::placeholder,
    textarea::placeholder{
        color: #949494;
    }

    &.disabled{
        button,
        input,
        textarea{
            pointer-events:none;
            overflow: hidden;
        }
        input,textarea{
            background-color: #e0e0e0;
            color: #AFAFAF;
        }
        button{
            opacity: 0.6;
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill,
        textarea:-webkit-autofill:hover,
        textarea:-webkit-autofill:focus{
            -webkit-text-fill-color: #AFAFAF;
            -webkit-box-shadow: 0 0 0 50px #e0e0e0 inset !important;
        }   
    }

    @media screen and (max-width: 431px){
        input, textarea{
            font-size: 13px;
            line-height: 16px;
        }
        button{
            height: 22px;
        }
        textarea{
            min-height: 47px;
        }
    }
`

const Input = styled.input`
    min-height: 30px;
    margin-bottom: 2.5px;
    padding-left: 10px;

    &:-webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus{
        -webkit-text-fill-color: #000000;
        -webkit-box-shadow: 0 0 0 50px #EFEFEF inset;
    }  
`
const DescriptionBox = styled.textarea`
    min-height: 60px;
    margin-top: 2.5px;
    padding: 10px;
    resize: none;
`

const PublishButton = styled.button`
    display:flex;
    align-items:center;
    justify-content:center;
    background-color: #1877F2;
    width: 112px;
    height: 31px;
    margin-top: 5px;
    float: right;

    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;

    &:hover:enabled{
        opacity: 0.7;
    }
`
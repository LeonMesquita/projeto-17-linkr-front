import { useState, useContext} from "react";
import axios from "axios";

import TokenContext from "../../contexts/TokenContext";
import UserContext from "../../contexts/UserContext";

import styled from "styled-components";
import { CardContainer, PostContentSide, PostSide } from  "../style.js";;

export default function PublishCard(){
    const { token } = useContext(TokenContext);
    const { url, user } = useContext(UserContext);

    const [newPostInfos, setNewPostInfos] = useState({
        url: "",
        description: ""
    });
    const [isDisable, setIsDisable] = useState(false);

    const handleInputs = (e) => {
        setNewPostInfos({...newPostInfos, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsDisable(true);
        // const promisse = axios.post(`${url}/`, token, newPostInfos);
    }

    return(
        <CardContainer className="publish">
            <PostContentSide className="publish">
                <img src={user.pictureUrl} alt="" />
            </PostContentSide>
            <PostSide>
                <h1>What are you going to share today?</h1>
                <Form onSubmit={handleSubmit}>
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
                            isDisable
                            ? `Oi`
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
    textarea{
        
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
`
const DescriptionBox = styled.textarea`
    min-height: 60px;
    margin-top: 2.5px;
    padding: 10px;
    resize: none;
`

const PublishButton = styled.button`
    background-color: #1877F2;
    width: 112px;
    height: 31px;
    margin-top: 5px;
    float: right;

    text-align: center;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
`
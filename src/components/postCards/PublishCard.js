import { useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useLocalStorage from "../../hooks/useLocalStorage";

import UserContext from "../../contexts/UserContext";
import handleGetPostsRefresh from "../../handlers/handleGetPostsRefresh"

import styled from "styled-components";
import { CardContainer, PostContentSide, PostSide } from "../style.js";
import PublishSkeleton from "../skeletonComponents/PublishSkeleton";

import usePublish from "../../hooks/usePublish";

export default function PublishCard({ isPageLoaded }) {
    
 
    const linkrUser = useLocalStorage("linkrUser", "")[0];
    const { publishData, setPublishData, setPublishing, publishing, isPublished} = usePublish(linkrUser.token );

    const handleDataChange = (e) => {
        setPublishData({...publishData, [e.target.name]: e.target.value})
     }
    const handleSubmit = (e) => {
        e.preventDefault()
        setPublishing( !publishing )
    };
    return (
        <>
            {
                !isPageLoaded
                    ?
                    <PublishSkeleton />
                    :
                    <CardContainer className="publish">
                        <PostContentSide className="publish">
                            <img src={linkrUser.profilePic} alt="" />
                        </PostContentSide>
                        <PostSide>
                            <h1>What are you going to share today?</h1>
                            <Form
                                onSubmit={handleSubmit}
                                className={isPublished ? "disabled" : ""}
                            >
                                <Input
                                    type="url"
                                    placeholder="http://..."
                                    id="urlInput"
                                    value={publishData.url}
                                    name="url"
                                    onChange={handleDataChange}
                                />
                                <DescriptionBox
                                    className="big"
                                    type="text"
                                    placeholder="Awesome article about #javascript"
                                    id="descriptionInput"
                                    value={publishData.description}
                                    name="description"
                                    onChange={handleDataChange}
                                />
                                <PublishButton type="submit">
                                    {
                                        isPublished
                                            ? `Publishing...`
                                            : `Publish`
                                    }
                                </PublishButton>
                            </Form>
                        </PostSide>
                    </CardContainer>
            }
        </>

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
    @media screen and (max-width: 611px){
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
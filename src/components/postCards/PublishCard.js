import { useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useLocalStorage from "../../hooks/useLocalStorage";

import UserContext from "../../contexts/UserContext";
import handleGetPostsRefresh from "../../handlers/handleGetPostsRefresh"

import styled from "styled-components";
import { CardContainer, PostContentSide, PostSide } from "../style.js";
import PublishSkeleton from "../skeletonComponents/PublishSkeleton";



export default function PublishCard({ isPageLoaded, setPosts, setStatusCode, setIsRefreshing }) {
    const { url } = useContext(UserContext);

    const [newPostInfos, setNewPostInfos] = useState({
        url: "",
        description: ""
    });

    const linkrUser = JSON.parse(localStorage.getItem("linkrUser"));


    const [isDisable, setIsDisable] = useState("");

    const alert = (titleText, text) => {
        return Swal.fire({
            icon: 'error',
            titleText: `${titleText}`,
            text: `${text}`,
            color: `#FFFFFF`,
            background: `#333333`,
            confirmButtonColor: `#1877F2`,
            padding: `10px`,
            timer: 4000,
            timerProgressBar: true,
            timerProgressBar: `#ffffff`
        })
    }

    const handleInputs = (e) => {
        setNewPostInfos({ ...newPostInfos, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsDisable("disabled");
        if (newPostInfos.url.length === 0) {
            const titleText = "Oops... Url camp is empty";
            const text = "For be able to publish an post, is required to the link camp is filled";
            await alert(titleText, text)
            return setIsDisable("")
        }
        const promisse = axios.post(`${url}/timeline`, newPostInfos, linkrUser.token);
        const TWO_SECONDS = 2000;

        promisse.then(async () => {
            setIsRefreshing(true);
            handleGetPostsRefresh(url, 'posts', linkrUser.token, setPosts, setStatusCode, setIsRefreshing)

                setNewPostInfos({
                    url: "",
                    description: ""
                })
                setIsDisable("enabled")
        })
        promisse.catch(async (res) => {
            const errors = res.response.data;
            let titleText = `Oops... Unauthorized`
            let text = `Sign out...`
            if (errors !== "Unauthorized") {
                titleText = `Oops... u have an error(s)`;
                text = "";
                for (let i = 0; i < errors.length; i++) {
                    const erro = errors[i];
                    const title = Object.keys(erro)[0];
                    const description = Object.keys(erro)[0];
                    text += `${titleText} : ${description} \n`
                }

            } await alert(titleText, text)
            return setIsDisable("")
        });
    }

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
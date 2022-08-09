import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import TokenContext from "../contexts/TokenContext";
import UserContext from "../contexts/UserContext";

export default function Timeline(){
    
    // const { token, setToken } = useContext(TokenContext);
    // const { url, user, setUser } = useContext(UserContext);
    // const navigate = useNavigate();


    // useEffect(() => {
    //     const promisse = axios.(`${url}/`, );
    //     promisse.then((res)=>{

    //     });
    //     promisse.catch(() => {

    //     });
    // }, []);

    return(`Happy Hacking`)
};


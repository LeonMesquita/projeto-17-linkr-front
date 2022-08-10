import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import TokenContext from "../contexts/TokenContext";
import UserContext from "../contexts/UserContext";
import AuthArea from "../components/AuthArea";
import Swal from 'sweetalert2'
import  AuthButton  from "../components/AuthButton";

export default function SignIn(){
    const { url, user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    async function submitLogin(e){
        e.preventDefault();
        const userBody = {
            email,
            password
        }
        const promise = await axios.post(`${url}/signin`, userBody);

    }
    return(
        <AuthArea>
            <form onSubmit={submitLogin}>
                <input placeholder="e-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                <input placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                <AuthButton buttonText='Log In' isDisabled={isDisabled}/>
            </form>
            <Link to='/sign-up'>
                First time? Create an account!
            </Link>

        </AuthArea>
    );
}
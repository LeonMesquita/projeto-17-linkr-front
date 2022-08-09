import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import TokenContext from "../contexts/TokenContext";
import UserContext from "../contexts/UserContext";
import AuthArea from "../components/AuthArea";

export default function SignUp(){
    
    // const { token, setToken } = useContext(TokenContext);
    const { url, user, setUser } = useContext(UserContext);
     const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [picture, setPicture] = useState('');

    const [isDisabled, setIsDisabled] = useState(false);


    // useEffect(() => {
    //     const promisse = axios.(`${url}/`, );
    //     promisse.then((res)=>{

    //     });
    //     promisse.catch(() => {

    //     });
    // }, []);
    async function submitSignup(e){
        e.preventDefault();
        setIsDisabled(true);
        const userBody = {
            email,
            password,
            userName: username,
            pictureUrl: picture
        }

        try{
            await axios.post(`${url}/signup`, userBody);
            navigate('/sign-in');

        }catch(e){
            
        }
        setIsDisabled(false);
    }

    return(
        <AuthArea>
            <form onSubmit={submitSignup}>
                <input placeholder="e-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                <input placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                <input placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
                <input placeholder="picture url" value={picture} onChange={e => setPicture(e.target.value)} />
                <button disabled={isDisabled}>Sign Up</button>
            </form>
            <Link to='/sign-in'>
                Switch back to log in
            </Link>
        </AuthArea>
    );
};


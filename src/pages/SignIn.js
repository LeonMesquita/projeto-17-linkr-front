import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import TokenContext from "../contexts/TokenContext";
import UserContext from "../contexts/UserContext";
import AuthArea from "../components/AuthArea";
import Swal from 'sweetalert2'
import AuthButton  from "../components/AuthButton";
import useLocalStorage from "../hooks/useLocalStorage";

export default function SignIn(){
    const navigate = useNavigate();
    const { url } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    const [linkirUser, setLinkirUser] = useLocalStorage("linkrUser", "")

    async function submitLogin(e){
        e.preventDefault();
        setIsDisabled(true);
        if(email === '' || password === ''){
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Você deve preencher todos os campos!',
              });
              setIsDisabled(false);
              return;
        }
        const userBody = {
            email,
            password
        }
        try{
            const promise = await axios.post(`${url}/signin`, userBody);
            setLinkirUser({
                token: {
                    headers:{
                        Authorization: `Bearer ` + promise.data.token
                    }
                },
                username: promise.data.username,
                profilePic: promise.data.pictureUrl
            })
            Swal.fire(
                'Good job!',
                'Login realizado com sucesso!',
                'success'
            )

            navigate('/timeline');
        }catch(e){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email ou senha incorretos!',
            });
        }

        setIsDisabled(false);

    }
    return(
        <AuthArea>
            <form onSubmit={submitLogin}>
                <input placeholder="e-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                <AuthButton buttonText='Log In' isDisabled={isDisabled}/>
            </form>
            <Link to='/sign-up'>
                First time? Create an account!
            </Link>

        </AuthArea>
    );
}
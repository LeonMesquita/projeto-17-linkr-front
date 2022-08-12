import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import TokenContext from "../contexts/TokenContext";
import UserContext from "../contexts/UserContext";
import AuthArea from "../components/AuthArea";
import Swal from 'sweetalert2'
import AuthButton  from "../components/AuthButton";

export default function SignIn(){
    const navigate = useNavigate();
    const { url, setUser } = useContext(UserContext);
    const {setToken} = useContext(TokenContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    
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
            setToken(promise.data.token);
            setUser({
                userId: promise.data.id,
                username: promise.data.username,
                pictureUrl: promise.data.pictureUrl
            });
            Swal.fire(
                'Good job!',
                'Login realizado com sucesso!',
                'success'
              );
              navigate('/timeline');
        }catch(e){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email ou senha incorretos!',
              });

        }

       // setIsDisabled(false);

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
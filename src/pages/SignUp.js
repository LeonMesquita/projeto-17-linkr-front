import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import AuthArea from "../components/AuthArea";
import Swal from 'sweetalert2'
import  AuthButton  from "../components/AuthButton";
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
            username: username,
            pictureUrl: picture
        }
        if(email === '' || password === '' || username === '' || picture === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Você deve preencher todos os campos!',
              });
              setIsDisabled(false);
              return;
        }

        try{
            await axios.post(`${url}/signup`, userBody);
            Swal.fire(
                'Good job!',
                'Cadastro realizado com sucesso!',
                'success'
              );
          navigate('/');

        }catch(e){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: e.response.status == 409 ? 'Este usuário já existe, tente novamente!' : 'Falha ao realizar cadastro!',
                  });    
        }
        setIsDisabled(false);
    }

    return(
        <AuthArea isDisabled={isDisabled}>
            <form onSubmit={submitSignup}>
                <input placeholder="e-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                <input placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
                <input placeholder="picture url" value={picture} onChange={e => setPicture(e.target.value)} />
                <AuthButton buttonText='Log In' isDisabled={isDisabled}/>
            </form>
            <Link to='/'>
                Switch back to log in
            </Link>
        </AuthArea>
    );
};


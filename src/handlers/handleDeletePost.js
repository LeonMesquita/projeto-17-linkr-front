import Swal from "sweetalert2";
import axios from "axios";

const BasicObject = (icon, titleText, text) => {
    return {
        icon: icon,
        titleText: titleText,
        text: text,
        color: `#FFFFFF`,
        background: `#333333`,
        confirmButtonColor: `#1877F2`
    }
}

const ModalObject = (icon, titleText, text) => {
    return {
        ...BasicObject(icon, titleText, text),
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, delete-o',
        cancelButtonText: 'Não, voltar'
    }
}

const AlertObject = (icon,titleText, text) => {
    return {
        ...BasicObject(icon, titleText, text),
        padding: `10px`,
        timer: 5000,
        timerProgressBar: true,
        timerProgressBar: `#ffffff`
    }
}

const deletePost = (url, token) => {
    const promise = axios.delete(`${url}/posts`, token);
    promise.then(
        Swal.fire(AlertObject(
            "success",
            "Seu post foi deletado com sucesso!",
            "Recarregando os posts novamente..."
        )).then((result) => {
            if(result.isConfirmed === true || result.isDismissed === true) return console.log(`DeletePost: Ainda não fui feito para fazer nada :(`)
        })
    );
    promise.catch((e) => {
        Swal.fire(AlertObject(
            "error",
            "Ocorreu um erro ao apagar seu post!",
            "Se o erro persistir, entre em contato com o suporte!"
        ))
    })
}

export default function handleDeletePost(url, token){
    console.log(`Oi`)
    Swal.fire(ModalObject(
        "warning",
        "Você tem certeza que deseja apagar esse post?",
        "Após apagado, não será possivel recuperar-lo",
    )).then((result) => {
        if(result.isConfirmed){
            deletePost(url,token);
        }
    })  
}


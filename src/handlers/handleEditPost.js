import axios from "axios";
import Swal from "sweetalert2";

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
        confirmButtonText: 'Sim, edite-o',
        cancelButtonText: 'Não, voltar'
    }
}

const AlertObject = (icon,titleText, text, timer) => {
    return {
        ...BasicObject(icon, titleText, text),
        padding: `10px`,
        timer: timer,
        timerProgressBar: true,
        timerProgressBar: `#ffffff`
    }
}

export default function handleEditPost(e, setCanEdit, setPostDescription, setEditIsEnabled, description, url, linkrUserToken, postDescription, postId){
    console.log(postDescription);
    const { key } = e;
    if(key === "Escape") {
        setCanEdit(false);
        setPostDescription({description:description})
    }
    if(key === "Enter"){
        const body = {
            description: postDescription.description,
            postId
        }
        setEditIsEnabled("disabled");
        const promisse = axios.put(`${url}/description`, body, linkrUserToken)
        promisse.then(() => {
            Swal.fire(ModalObject(
                "warning",
                "Realmente deseja editar o seu post?",
                "Caso deseja recuperar a descrição anterior, terá que digita-la novamente.",
            )).then((result) => {
                if(result.isConfirmed === true || result.isDismissed === true){
                    setEditIsEnabled("enabled")
                    setCanEdit(false);
                    Swal.fire(AlertObject(
                        "sucess",
                        "Post editado com sucesso!",
                        "A descrição do post já está atualizada!",
                        2000
                    ))
                } 
            })
        })
        promisse.catch(() => {
            Swal.fire(AlertObject(
                "error",
                "Ocorreu um erro ao apagar seu post!",
                "Se o erro persistir, entre em contato com o suporte!",
                5000
            )).then((result) => {
                if(result.isConfirmed === true || result.isDismissed === true){
                    setEditIsEnabled("enabled")
                } 
            })
        })
    }
}
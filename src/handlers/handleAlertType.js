import Swal from "sweetalert2"

/*
Para usar esse handle, é bem simples!
    1. Primeiramente chamar o handle
    2. Depois dizer qual o tipo do alerta ( Modal ou Timer )
        Modal: para pedir ao usuario sua confirmação
        Timer: um aviso que automaticamente vai fechar!
    3. Deve se mandar um objeto nesse formato: {
        icon: "icone", https://sweetalert2.github.io/#icons <- Os 5 icones disponiveis!
        titleText: "texto",
        text: "texto"
    },Esse objeto serve para a mensagem que o usuario vai receber!
    4. Após o tipo e mensagem forem escolhidos, está na hora de customizar o tipo escolhido:
        1.Timer: Um número em milisegundos contendo quanto tempo deseja que ele demore para fechar automaticamente
            Ex: 4000;
        2.Modal: Deve enviar um objeto nesse formato: {
            confirmButtonText: "Texto para confirmar",
            cancelButtonText: "Texto para negar"
        }
    5. Depois precisamos de um then para tratar as respostas! Porém essa parte se trata no proprio componente onde esse handle foi chamado :)
    6. E pronto alerta feito!
*/

const MessageObject= ({ icon,titleText,text }) => {
    return {
        icon: icon,
        titleText: titleText,
        text: text,
        color: `#FFFFFF`,
        background: `#333333`,
        confirmButtonColor: `#1877F2`
    }

}

const AlertType = {
    timer: ( timer ) => {
        return {
            padding: `10px`,
            timer: timer,
            timerProgressBar: true,
            timerProgressBar: `#ffffff`
        }
    },
    modal: ({ confirmButtonText, cancelButtonText }) => {
        return {
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText
        }
    }
}

export default function handleAlertNotification(messageObject, type, typeObject){
    return Swal.fire({...MessageObject(messageObject),...AlertType[type](typeObject)})
}
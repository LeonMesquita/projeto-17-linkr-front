import axios from 'axios';
import handleAlertNotifications from './handleAlertNotifications';
 export  function followUser(followerId, followedId, setIsFollowed, linkrUser, setIsDisabled, url){
    const followBody = {
        followerId,
        followedId
    }

    setIsDisabled(true);
        const promise = axios.post(`${url}/follow`,followBody, linkrUser.token);
        promise.then(() => {
          setIsFollowed(true);
        })
        .catch((e) => {
            handleAlertNotifications('error', 'Erro!', 'Não foi possível seguir este usuário, tente novamente', 4000);
        });
        setIsDisabled(false);
}


export async function unfollowUser(followerId, followedId, setIsFollowed, linkrUser, setIsDisabled, url){
    setIsDisabled(true);
    const promise = axios.delete(`${url}/follow/${followedId}/${followerId}`, linkrUser.token);
    promise.then(() => {
        setIsFollowed(false);
    })
    .catch((e) => {
        handleAlertNotifications('error', 'Erro!', 'Não foi possível deixar de seguir este usuário, tente novamente', 4000);


    });
    setIsDisabled(false);
}
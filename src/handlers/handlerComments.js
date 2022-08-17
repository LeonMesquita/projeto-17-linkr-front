import axios from 'axios';



export  async function getComments(url, postId){
    try{
        const promise = await axios.get(`${url}/comments/${postId}`);
        return promise.data;
    }catch(err){

    }
}
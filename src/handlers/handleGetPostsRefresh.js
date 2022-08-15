import axios from "axios";

export default function handleGetPostsRefresh( url, route, token, setPosts, setStatusCode, setIsRefreshing ){
    console.log(url)
    const promisse = axios.get(`${url}/${route}`, token);
    promisse.then( (res) => {
        setPosts(res.data);
        setIsRefreshing(false);
    })
    promisse.catch( (e) => {
        setStatusCode(e.response.status);
        setIsRefreshing(false);
    })
}
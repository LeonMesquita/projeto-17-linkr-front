import axios from "axios";

export default function handleGetPostsRefresh( url, route, token, posts, setPosts, setStatusCode, setIsRefreshing ){
    const promisse = axios.get(`${url}/${route}`, token);
    promisse.then( (res) => {
        setPosts({...posts, ...res.data});
        setIsRefreshing(false);
    })
    promisse.catch( (e) => {
        setStatusCode(e.response.status);
        setIsRefreshing(false);
    })
}
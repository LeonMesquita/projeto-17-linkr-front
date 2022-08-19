import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/UserContext'

import useLocalStorage from './useLocalStorage';

export default function usePostSearch( urlQuery , page, setIsPostLoaded, params,setRefreshLastPost ) {
    const { url } = useContext(UserContext);
    const token = useLocalStorage("linkrUser", "")[0].token;

    const [refresh, setRefresh] = useState(true);
    const [error, setError] = useState(false);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [statusCode, setStatusCode] = useState(false);
    const [message, setMessage] = useState("")
    const [lastPost, setLastPost ] = useState(undefined);

    useEffect(() => {
        setPosts([]);
        setLastPost(undefined);
        setStatusCode(false);
    }, [params])

    useEffect(() => {
        setRefresh(true);
        setError(false);
        console.log(page);
        const URL_CONFIGURED = `${url}/${urlQuery}?page=${page}&created=${lastPost}`
        const promisse = axios.get(
            URL_CONFIGURED,
            token
        ).then( res => {
            const newPosts = res.data;
            console.log(res.data)
            setPosts( (prevPosts) => [...prevPosts, ...newPosts]);
            if(newPosts.length < 10){
                setError(true);
            }
            setHasMore(res.data.length === 10);
            setRefresh(false)
            if(page === 0) {
                setLastPost(res.data[0].id)
                setRefreshLastPost(res.data[0].id);
                setIsPostLoaded(true);
            }
        }).catch( e => {
            if(e.response.status === 401) return;
            if(page === 0){
            const { page } = e.response.data
            const { where } = e.response.data
            const status = e.response.status;
            setStatusCode({ page:page, status: status, where: where})
            setIsPostLoaded(true)
            } else {
                setError(true);
            }
        })

    }, [page, params])

    return { refresh, error, posts, hasMore, statusCode, setPosts };
}

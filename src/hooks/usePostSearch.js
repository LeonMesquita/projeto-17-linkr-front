import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/UserContext'

import useLocalStorage from './useLocalStorage';

export default function usePostSearch( urlQuery , page, setIsPostLoaded) {
    const { url } = useContext(UserContext);
    const token = useLocalStorage("linkrUser", "")[0].token;

    const [refresh, setRefresh] = useState(true);
    const [error, setError] = useState(false);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [statusCode, setStatusCode] = useState({});
    const [postLoading, setPostLoading ]= useState(true);
    const [message, setMessage] = useState("")

    useEffect(() => {
        setPosts([]);
    }, [])

    useEffect(() => {
        setRefresh(true);
        setError(false);
        const URL_CONFIGURED = `${url}/${urlQuery}/${page}`
        const promisse = axios.get(
            URL_CONFIGURED,
            token
        ).then( res => {
            const newPosts = res.data;
            setPosts( (prevPosts) => [...prevPosts, ...newPosts]);
            if(newPosts.length < 10){setError(true);}
            setHasMore(res.data.length === 10);
            setRefresh(false)
            if(page === 0) setIsPostLoaded(true);
        }).catch( e => {
            if(page === 0){
            const where = e.response.data
            const status = e.response.status;
            setStatusCode({ page:"timeline", status: status, where: where})
            setIsPostLoaded(true)
            } else {
                setError(true);
            }
        })

    }, [page])


    return { refresh, error, posts, hasMore, statusCode , postLoading};
}

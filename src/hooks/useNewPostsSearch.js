import { useState, useEffect, useRef, useLayoutEffect} from "react";
import axios from "axios";


export default function useNewPostsSearch( url, urlQuery, token, params ) {

    const [ newPosts, setNewPosts ] = useState([]);
    const [ haveNewPosts, setHaveNewPosts ] = useState(false);
    const [ refreshLastPost , setRefreshLastPost ] = useState(undefined);
    const [ toggleRefresh, setToggleRefresh ] = useState(false);
    const [ postsRefreshed, setPostsRefreshed ] = useState(false);

    const firstRefresh = useRef(true);

    useEffect( ()  => {
        setNewPosts([]);
        setHaveNewPosts(false);
        firstRefresh.current = true;
    }, [postsRefreshed, params])

    useLayoutEffect( () => {
        if(firstRefresh.current) {
            firstRefresh.current = false;
            return;
        }
        const URL_CONFIGURED = `${url}/${urlQuery}/refresh?created=${refreshLastPost}`
        const promisse = axios.get(
            URL_CONFIGURED,
            token
        ).then( res => {
            const posts = res.data;
            setNewPosts( (prevPosts) => [...prevPosts, ...posts]);
            setRefreshLastPost(posts[0].id);
            setHaveNewPosts(true);
        }).catch( e => {
            if(e.response.status === 401) return;
            if(newPosts.length === 0) setHaveNewPosts(false);
        })
    }, [toggleRefresh])



  return { newPosts, haveNewPosts, setRefreshLastPost, setToggleRefresh, toggleRefresh, setPostsRefreshed }
}

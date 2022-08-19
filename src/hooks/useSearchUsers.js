import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import useLocalStorage from './useLocalStorage';

import UserContext from '../contexts/UserContext'


export default function useSearchUsers( urlQuery, params, token ) {
    const { url } = useContext(UserContext);
    const [ users, setUsers ] = useState([])
    const [ searchValue, setSearchValue ] = useState({ searchValue: "" });
    const [ openSearch, setOpenSearch ] = useState(false);
    const [error, setError] = useState(false);
    const [cleanSearch, setCleanSearch ] = useState(false);


    // const [refresh, setRefresh] = useState(true);
    // const [posts, setPosts] = useState([]);
    // const [hasMore, setHasMore] = useState(false);
    // const [statusCode, setStatusCode] = useState(false);
    // const [message, setMessage] = useState("")
    // const [lastPost, setLastPost ] = useState(undefined);


    useEffect(() => {
        setUsers([]);
        setSearchValue({ searchValue: "" })
        setOpenSearch(false);
        setError(false);
    }, [cleanSearch, params])
    useEffect(() => {
        if(searchValue.searchValue.length >= 3){
            const URL_CONFIGURED = `${url}/${urlQuery}/${searchValue.searchValue}`
            const promisse = axios.get(
                URL_CONFIGURED,
                token
            ).then( res => {
                setUsers(res.data);
                setError(false);
                setOpenSearch(true);
            }).catch( e => {
                setUsers([])
                setError(true);
            })
        } else {
            setUsers([]);
            setOpenSearch(false);
        }
    }, [searchValue, params])

    return { setSearchValue, searchValue, users, openSearch, setOpenSearch, error, setCleanSearch}
}

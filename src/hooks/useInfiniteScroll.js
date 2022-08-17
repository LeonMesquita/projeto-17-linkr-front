import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/UserContext'

export default function useInfiniteScroll(query, pageNumber, ) {
    const { url } = useContext(UserContext);

    useEffect(() => {
        axios({
            method: 'GET',
            url: url,
            params: { q: query, pageNumber: pageNumber }
        }).then( res => {
            console.log(res.data);
        })
    }, [query, pageNumber])


    return null
}

import axios from "axios";
import { useState, useEffect, useContext } from "react";
import useLocalStorage from "./useLocalStorage";

import UserContext from "../contexts/UserContext";

export default function useTrendingSearch( setIsHashtagLoaded, params ){
    const { url } = useContext(UserContext);
    const token = useLocalStorage("linkrUser", "")[0].token;

    const [trendings, setTrendings] = useState([]);

    useEffect(() => {
        const promise = axios.get(
            `${url}/trendings`,
            token
        ).then( res => {
            setTrendings(res.data);
            setIsHashtagLoaded(true);
        }).catch( e => {
            console.log(`Oi`)
            console.log(e);
            setIsHashtagLoaded(true);
        })
    }, [params]);

    return { trendings };
}
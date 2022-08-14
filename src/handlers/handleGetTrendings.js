import axios from "axios";

export default function handleGetTrendings(url, token, setTrendings, setIsLoading){
    const promise = axios.get(`${url}/trendings`, token);
    promise.then((res) => {
        setTrendings(res.data);
        setIsLoading(false)
    })
}
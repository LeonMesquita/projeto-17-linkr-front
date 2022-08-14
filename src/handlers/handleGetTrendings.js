export default function handleGetTrendings(url, token){
    const promise = axios.get(`${url}/trendings`, token);
    promise.then((res) => {
        setTrendings(res.data);
        setIsLoading(false)
    })
}
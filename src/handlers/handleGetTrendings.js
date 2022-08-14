export default function handleGetTrendings(token){
    const promise = axios.get(`${url}/trendings`, token);
    promise.then((res) => {
        setTrendings(res.data);
        setIsLoading(false)
    })
}
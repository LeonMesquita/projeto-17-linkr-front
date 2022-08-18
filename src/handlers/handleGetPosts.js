// import axios from 'axios';
// import handleGetTrendings from './handleGetTrendings';

// export default function  handleGetPosts(token, url, setStatusCode, setTrendings, setIsLoading){
//     const promise = axios.get(`${url}/following`, token, {page: 0});
//     promise.then( (res) => {            
//         // if(res.data.length !== 0){
//         //     setPosts(res.data);
//         //     //console.log(res.data[0])
//         //     setLastPostId(res.data[0].post_id)
            
//         // } else {
//         //     setStatusCode({ page:"timeline", status: 204})
//         // }
//         // handleGetTrendings(url, token, setTrendings, setIsLoading)
//         return res.data;
//     })
//     promise.catch( (e) => {
//         const status = e.response.status;
//         setStatusCode({ page:"timeline", status: status})
//         handleGetTrendings(url, token, setTrendings, setIsLoading)
//     });
// }
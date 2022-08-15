export default function handleTokenVerify(){
    let linkrStorage = JSON.parse(localStorage.getItem("linkrUser"))
    if( linkrStorage === null || linkrStorage.token === undefined ) return false
    return linkrStorage.token
};
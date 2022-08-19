import { useState, useEffect, useRef, useLayoutEffect, useContext} from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import useLocalStorage from "./useLocalStorage";
import useAlert from "./useAlert";

export default function usePublish( token ) {

    const { url } = useContext(UserContext);
    const [ publishData, setPublishData ] = useState({
        url: "",
        description: ""
    });
    const [ publishing, setPublishing ] = useState(false);
    const [ isPublished, setIsPublished ] = useState(false);
    const [ reset, setReset ] = useState(false)


    const EmptyField = () => useAlert(
        {icon: "error", titleText: "Oops... Url field is empty", text: "For be able to publish an post, url field can't be empty"},
        "timer",
        { timer: 5000}
    )
    const LinkError = () => useAlert(
        {icon: "error", titleText: "Oops... We have a problem with that URL", text: "If this problem insist. Contact the support"},
        "timer",
        { timer: 5000}
    )

    const Action = (result) => {
        if((result.isConfirmed === true || result.isDismissed === true)) return setIsPublished(false)
    }


    const dontPublish = useRef(true);

    useEffect( ()  => {
        setPublishData({
            url: "",
            description: ""
        });
        setIsPublished(false);
    }, [reset])

    useLayoutEffect( () => {
        if(dontPublish.current) {
            dontPublish.current = false;
            return;
        }

        setIsPublished(true);
        async function fetchData() {
            console.log(publishData)
            if(publishData.url.length === 0) return await EmptyField().then((result) => Action(result))
            const URL_CONFIGURED = `${url}/timeline`
            const promisse = axios.post(
                URL_CONFIGURED,
                publishData,
                token
            ).then( res => {
                setReset(!reset);
            }).catch( e => {
                console.log(e);
                LinkError().then((result) => Action(result))
            })
          }
          fetchData();
        

    }, [publishing])



  return { publishData, setPublishData, setPublishing, publishing, isPublished }
}

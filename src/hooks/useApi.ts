import {useLayoutEffect, useState} from "react";
import axios from "axios";

export const useApi = (url:string) => {
    const [data,setData] = useState(null)
    const [error,setError] = useState("")
    const defaultURL = "https://hacker-news.firebaseio.com/v0";

    useLayoutEffect(() =>{
        setData(null)
        setError("")

        axios.get(defaultURL + url)
            .then(res => setData(res.data))
            .catch(error => setError(error.message))

    },[defaultURL])

    return {data:data,error:error}
}
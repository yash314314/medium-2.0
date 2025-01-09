

import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
interface Blog{
    "id": string;
"title": string,
        "content": JSON,
        "author": {
            "name": string
        }
         "timestamp": string
}
export function useBlogs(){
    const [ loading , setLoading ] = useState(true);
    const [blogs , setBlogs ] = useState<Blog[]>([]);
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(res => {

            setLoading(false);
            setBlogs(res.data);
        })
        .catch(err => {
            console.error("API error:", err); // Handle error
            setLoading(false);
        });
    }, []);
return {
    loading,
    blogs
}
}
interface Blog2{
        "id": string;
        "author": {
            "name": string
        }
        "title": string,
        "content": {
            "time": number,
            "blocks": [
                {
                    "id": string,
                    "data": {
                        "text": string
                    },
                    "type": string
                }
            ],
            "version": string
        },
        "timestamp": string
}
export function useBlog({id}){
    const [ loading , setLoading ] = useState(true);
    const [blog, setBlog ] = useState<Blog2>();
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(res => {

            setLoading(false);
            setBlog(res.data);
        })
        .catch(err => {
            console.error("API error:", err); // Handle error
            setLoading(false);
        });
    }, [id]);
return {
    loading,
    blog

}
}
interface Blog3{
    "id":string,
    "author": {
        "name": string
    },
    "title": string,
    "content": JSON,
    "timestamp": string
}
export function useBlog3(){
    const [loading , setLoading ] = useState(true);
    const [myblogs , setmyblogs] = useState<Blog3[]>([]);
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/my`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(res => {
            setLoading(false);
            setmyblogs(res.data);
        })
        .catch(err => {
            console.error("API error:", err); // Handle error
            setLoading(false);
        });
    }, []);
    return {
        loading,
        myblogs
    }
}
import { useEffect, useState } from 'react';
import axios from 'axios';
export function useBlogs() {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState(null);
    useEffect(() => {
        axios.get("https://backend.potycat.workers.dev/api/v1/blog/bulk", {
            headers : {
                Authorization : localStorage.getItem("token")
            }
        }).then(response => {
            setBlogs(response.data.blogs);
            setLoading(false);
        }).catch(error => {
            console.log(error)
            setLoading(false);
        })
    }, [])
    console.log("Blog are : " + blogs)
    return {loading, blogs}
}
export function useBlog({ id } : { id : string}) {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState(null);
    useEffect(() => {
        axios.get(`https://backend.potycat.workers.dev/api/v1/blog/${id}`, {
            headers : {
                Authorization : localStorage.getItem("token")
            }
        }).then(response => {
            console.log("esefaf");
            if(!response.data.blog) {
                console.log("esefaf");
                /// @ts-ignore
                setBlog({_id : -1});
            }
            else {
                console.log("esefadasdasf");
                setBlog(response.data.blog);
            }
            setLoading(false);
        }).catch(error => {
            console.log("error")
            setBlog(null);
            setLoading(false);
        })
    }, [id])
    return {loading, blog}
}
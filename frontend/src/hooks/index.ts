import { useEffect, useState } from 'react';
import axios from 'axios';
import { Blog } from '../pages/Blog';
export function useBlogs() {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        axios.get("https://backend.potycat.workers.dev/api/v1/blog/bulk", {
            headers : {
                Authorization : localStorage.getItem("token")
            }
        }).then(response => {
            setBlogs(response.data.blogs);
            setLoading(false);
        })
    }, [])
    console.log("Blog are : " +blogs)
    return {loading, blogs}
}
export function useBlog({ id } : { id : string}) {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState();
    useEffect(() => {
        axios.get(`https://backend.potycat.workers.dev/api/v1/blog/${id}`, {
            headers : {
                Authorization : localStorage.getItem("token")
            }
        }).then(response => {
            setBlog(response.data.blog);
            setLoading(false);
        })
    }, [id])
    console.log("Blog is : " + blog)
    return {loading, blog}
}
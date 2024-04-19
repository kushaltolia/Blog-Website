import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export function Blogs() {
    const {loading, blogs } = useBlogs();
    if(loading) {  
        return <div>Loading...</div>
    }

    return (
        <div>
            <AppBar/>
            <div className = "flex justify-center">
                <div className = "max-w-xl ">
                    {blogs.map(blog => {
                        //@ts-ignore
                        return <BlogCard authorName = {blog.author.name || "Anonymous"} 
                        //@ts-ignore
                        id = {blog.id}
                        //@ts-ignore
                            title = {blog.title} 
                            //@ts-ignore
                            content = {blog.content} 
                            //@ts-ignore
                            publishedDate = {blog.publishedDate} 
                        />
                    })}
                </div>
            </div>
        </div>
    )
}
import { Link } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export function Blogs() {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-lg font-semibold">Loading...</div>
            </div>
        );
    }

    if (!blogs) {
        return (
            <div className="flex items-center justify-center h-screen">
            <div className="text-lg font-semibold">
                Please <Link to="/signin" className="text-blue-500">Sign in</Link>
            </div>
        </div>
        );
    }

    return (
        <div>
            <AppBar />
            <div className="flex justify-center">
                <div className="max-w-xl">
                    {blogs.map(blog => (
                        <BlogCard
                            key={blog.id} // Add a unique key for each blog card
                            authorName={blog.author.name || "Anonymous"}
                            id={blog.id}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={blog.publishedDate}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

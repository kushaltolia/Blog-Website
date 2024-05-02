import { Link } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { useState } from "react";

export function Blogs() {
    const { loading, blogs } = useBlogs();
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 3; // Number of blogs per page

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

    // Calculate total number of pages
    //@ts-ignore
    const totalPages = Math.ceil(blogs.length / blogsPerPage);
    function handlePageChange(pageNumber : number) {
        setCurrentPage(pageNumber);
    }

    return (
        <div>
            <AppBar />
            <div className="flex justify-center">
                <div className="max-w-xl">
                    {//@ts-ignore
                    blogs.slice(currentPage * blogsPerPage - blogsPerPage , currentPage * blogsPerPage).map(blog => (
                        <BlogCard
                            key={blog.id}
                            authorName={blog.author.name || "Anonymous"}
                            id={blog.id}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={blog.publishedDate}
                        />
                    ))}
                </div>
            </div>
            <div className="flex justify-center py-4">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button key = {i + 1} onClick = {() => handlePageChange(i + 1)} className = {`px-3 py-1 mx-1 rounded-md ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

import { Link, useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";

export function Blog() {
    const { id } = useParams();
    const { loading, blog } = useBlog({ id: id || "" });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-lg font-semibold">Loading...</div>
            </div>
        );
    }

    if (blog === null && !loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-lg font-semibold">
                    Please <Link to="/signin" className="text-blue-500">Sign in</Link>
                </div>
            </div>
        );
    }
// @ts-ignore
    if (blog?._id === -1) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-lg font-semibold">Blog does not exist</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <FullBlog blog={blog} />
        </div>
    );
}

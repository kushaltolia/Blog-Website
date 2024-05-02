import { Link } from "react-router-dom";
interface BlogCardProps {
    id : number,
    authorName : string;
    title : string;
    content : string;
    publishedDate : string;
}
export function BlogCard({id, authorName, title, content, publishedDate}: BlogCardProps) {
    return (
        <Link to = {`/blog/${id}`}>
        <div className = "p-4 border-b border-slate-200 pb-4 cursor-pointer">
        <div className = "flex">
            <div className = "flex justify-center flex-col">
                <Avatar name = {authorName || "Anonymus"} size = "small"/>
            </div>
            <div className = "font-extralight pl-2 text-sm mt-0.5">{authorName[0].toUpperCase() + authorName.slice(1)}</div> 
            <div className = "pl-2 font-thin text-slate-500 text-sm">{publishedDate}</div>
            </div>
            <div className = "text-xl font-semibold pt-2">
                {title}
            </div>
            <div className = "text-md font-thin">
                {content.slice(0, 100)}...
            </div>
            <div className = "text-slate-500 text-sm font-thin pt-4">
                {Math.ceil(content.length / 100)} min read
            </div>
        </div>
        </Link>
    )
}

export function Avatar({ name, size }: { name: string; size: string }) {
    let sizeStyle = size === "big" ? "w-9 h-9" : "w-6 h-6";
    let textSize = size === "big" ? "text-big" : "text-xs";
    return (
        <div className = {`relative inline-flex items-center justify-center ${sizeStyle} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
            <span className = {`${textSize} font-extralight text-gray-600 dark:text-gray-300`}>{name[0].toUpperCase()}</span>
        </div>
    );
}
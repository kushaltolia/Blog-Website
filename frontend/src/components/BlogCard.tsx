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
                <Avatar name = {authorName}/>
            </div>
            <div className = "font-extralight pl-2 text-sm">{authorName}</div> 
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

export function Avatar({name} : {name : string}) {
    return (
        <div className = "relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className = "text-xs font-extralight text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>
    )
}
import { AppBar } from "./AppBar";

export function FullBlog({blog} : {blog : any}) {
    return(
        <div>
            <AppBar/>
            <div className = "flex-justify-center">
                <div className = "grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                    <div className = "col-span-8">
                        <div className = "text-5xl font-extrabold"> 
                            {blog.title}
                        </div>
                        <div className = "text-slate-500 pt-2">
                            Posted on : April 19 2024
                        </div>
                        <div className = "pt-4">
                            {blog.content}
                        </div>
                    </div>
                    <div className = "col-span-4">
                        Author
                        <div className = "text-xl font-bold">
                            {blog.author.name || "Anonymous"}
                        </div>
                        <div className = "pt-2 text-slate-500">
                            Random cathc phrase by author to grab user's attention
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
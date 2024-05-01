import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const AppBar = () => {
    let authorName = JSON.parse(localStorage.getItem("userData") || "Anonymous");
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <div className="border-b flex justify-between px-10 py-4">
            <Link to="/blogs">
                <div className="flex flex-col justify-center cursor-pointer text-3xl font-bold">
                    Medium
                </div>
            </Link>
            <div className="flex items-center">
                <Link to={`/publish`}>
                    <button type="button" className="mr-9 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5">
                        New
                    </button>
                </Link>
                <div className="relative">
                    <button onClick={toggleDropdown} className="focus:outline-none flex items-center">
                        <Avatar name={authorName.name} size = "big"/>
                    </button>
                    {dropdownVisible && (
                        <div className="absolute top-full right-0 mt-3 bg-white border border-gray-200 rounded-md shadow-lg">
                            <button  onClick={() => console.log("Profile clicked")}  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Profile
                            </button>
                            <Link to = "/signin">
                            <button  onClick={() => {localStorage.clear()}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Logout
                            </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

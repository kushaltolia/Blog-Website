import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
export function Auth({type} : {type : "signup" | "signin"}) {
  //@ts-ignore
  const [postInputs, setPostInputs] = useState({
    name : "",
    username : "",
    password : ""
  })
  const navigate = useNavigate();
  async function sendRequest() {
    try {
      const response = await axios.post(`https://backend.potycat.workers.dev/api/v1/user/${type === "signin" ? "signin" : "signup"}`, postInputs);
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      localStorage.setItem("userData", JSON.stringify(response.data.userData));
      navigate("/blogs");
    } catch (error) {
      
    }
  }
    return (
      <div className = "h-screen flex justify-center flex-col">
        <div className = "flex justify-center">
          <div>
            <div className = "px-10">
              <div className = "text-3xl font-extrabold">
                  Create an Account
                </div>
                <div className = "text-slate-400">
                  {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                  <Link to = {type === "signin" ? "/signup" : "/signin"} className = "text-slate-400 pl-2 underline">{type === "signin" ? "Sign up" : "Sign in"}</Link>
                </div>
              </div>
              <div>
              {type === "signup" ? <LabelledInput label = "Name" placeHolder = "John Doe"  onChange = {(e) => {
                setPostInputs(c => {
                  return {
                    ...c,
                    name : e.target.value
                  }
              })
              }} /> : null }
              <LabelledInput label = "Username" placeHolder = "JohnDoe@gamil.com"  onChange = {(e) => {
                setPostInputs(c => {
                  return {
                    ...c,
                    username : e.target.value
                  }
              })
              }} />
              <LabelledInput label = "Password" placeHolder = ""  type = {"password"} onChange = {(e) => {
                setPostInputs(c => {
                  return {
                    ...c,
                    password : e.target.value
                  }
              })
              }} />
              <button onClick = {sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
              </div>
            </div>
        </div>
      </div>
    );
}
interface LabelledInputType {
    label: string;
    placeHolder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type? : string
}
function LabelledInput({label, placeHolder, onChange, type} : LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-black pt-2">{label}</label>
      <input onChange = {onChange} type = {type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder = {placeHolder} required />
    </div>
  );
}
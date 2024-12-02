import { Button } from "../Components/Button"
import { InputBox } from "../Components/InputBox"
import { Heading } from "../Components/Heading"
import { BottomWarning } from "../Components/BottomWarning"
import { SubHeading} from "../Components/SubHeading"
import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigator = useNavigate()
    return <>
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center ">
                <div className="bg-white-700 h-max shadow-2xl w-80 p-2 px-4 rounded-lg ">
                    <Heading heading={"Sign in"} />
                    <SubHeading subHeading={"Enter your credentials to access your account"}></SubHeading>
                    <InputBox label={"Email"} placeholder={"example@gmail.com"} onChange={(e) => {
                        setEmail(e.target.value)
                    } }></InputBox>
                    <InputBox label={"Password"} placeholder={"Enter Strong Password"} onChange={(e) => {
                        setPassword(e.target.value)
                    } }></InputBox>
                    <Button label={"SignIn"} onClick={async () => {
                       const reponse = await axios({
                            method:"post",
                            url: "http://localhost:3000/api/v1/user/signin",
                            data: {
                                username: email,
                                password : password
                            }
                       })
                        console.log("response token" + reponse.data.token);
                        localStorage.setItem("token", reponse.data.token)
                        navigator("/dashboard")
                    } }></Button>
                    <BottomWarning label={"Don't have an account ?"} linkLabel={"Sign Up"} to={"/signup"}></BottomWarning>
                </div>
           </div>
       </div>
    </>
}
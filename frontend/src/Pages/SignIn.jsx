import { Button } from "../Components/Button"
import { InputBox } from "../Components/InputBox"
import { Heading } from "../Components/Heading"
import { BottomWarning } from "../Components/BottomWarning"
import { SubHeading} from "../Components/SubHeading"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Signup = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password , setPassword] = useState("")
    const [username, setUserName] = useState("")
    const navigator = useNavigate()
    return <>
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center ">
                <div className="bg-white-700 h-max shadow-2xl w-80 p-2 px-4 rounded-lg ">
                    <Heading heading={"Sign Up"} />
                    <SubHeading subHeading={"Create your account to login "}></SubHeading>
                    <InputBox label={"FirstName"} placeholder={"john doe"} onChange={(e) => {
                        setFirstName(e.target.value)
                    }}></InputBox>

                    <InputBox label={"LastName"} placeholder={"something"} onChange={(e) => {
                        setLastName(e.target.value)
                    }}></InputBox>

                    <InputBox label={"Email"} placeholder={"example@gmail.com"} onChange={(e) => {
                        setUserName(e.target.value)
                    } }></InputBox>
                    <InputBox label={"Password"} placeholder={"Enter Strong Password"} onChange={(e) => {
                        setPassword(e.target.value)
                    } }></InputBox>
                    <Button label={"SignUp"} onClick={async () => {
                        console.log(username)
                        const reponse = await axios.post("http://localhost:3000/api/v1/user/signup", {
                            username,
                            password,
                            firstName,
                            lastName
                        });
                        localStorage.setItem("token" , reponse.data.token)
                        navigator("/dashboard")
                    } }></Button>
                    <BottomWarning label={"Already have a account ? "} linkLabel={"Sign In"} to={"/login"}></BottomWarning>
                </div>
           </div>
       </div>
    </>
}
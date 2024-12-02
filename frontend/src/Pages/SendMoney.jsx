import { useNavigate, useSearchParams } from "react-router-dom"
import { Heading } from "../Components/Heading"
import { useState } from "react"
import axios from "axios"
export function SendMoneyPage() {
    const [amount, setAmount] = useState("")
    console.log(localStorage.getItem('token').split(" ")[1]);
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id')
    const name = searchParams.get("name")
    return<div className="flex flex-col justify-center items-center h-screen">
     {/* {name}
        {id} */}
        <div className="p-6 border shadow-md rounded-lg ">
            <div className="flex flex-col justify-center p-2  pb-4">
            <div  >
                 <Heading heading={"Send Money"}></Heading>
             </div>
                <div className="pt-3 mt-4 flex text-2xl ">
                    {/* <div className="rounded-full mb-2 bg-green-400 p-2   font-bold">{name[0].toUpperCase()}</div> */}
                    <div className="flex mt-2 justify-center items-center w-12 h-12 bg-green-400 rounded-full">
                <img
                  src={`https://api.dicebear.com/9.x/initials/svg?seed=${name}`}
                  className="h-[90%] w-[90%] rounded-full"
                />
              </div>
                     {/* <div className="bg-gray-300 p-20 w-12rounded-full text-center">Upload <br/>Photo </div> */}
                    <div className="p-4">{name}</div>
                    
                </div>
                <div className="text-sm font-bold">Amount (in Rs) </div>
                <div className="flex flex-col mt-2 ">
                    <input type="text" placeholder="Amount" className="border rounded-md p-2" onChange={(e) => {
                        setAmount(e.target.value)
                    }} />
                    <button className="border rounded-md p-2 mt-2 bg-green-500" onClick={async () => {
                      
                        const res = await axios.post("http://localhost:3000/api/v1/account/transfer", { to: id, amount: amount }, { headers: { Authorization: localStorage.getItem('token') } })
                        const data = await res.data
                        navigate("/dashboard")
                       
                       

                    }}>Transfer </button>
                </div>
         </div>
        </div>

    </div>
    
        
}
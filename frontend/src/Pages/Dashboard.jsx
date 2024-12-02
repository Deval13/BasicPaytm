import { useEffect, useState } from "react"
import { Appbar } from "../Components/Appbar"
import { Balance } from "../Components/Balance"
import { Users } from "../Components/Users"
import axios from "axios"

export const DashBoard = () => {
    const [balance, setBalance] = useState("")
    const token = localStorage.getItem('token')
    async function getBalance() {
        const res = await axios.get("http://localhost:3000/api/v1/account/balance", { headers: { Authorization: token } })
        console.log(res);
        
        const data = await res.data;
        console.log("balance is " + data.balance); 
        setBalance(data.balance)
    }

    const fetchbalance = useEffect(() => {
         getBalance()
    } , [])
    
    
    return <>
        <Appbar username={ "user"}></Appbar>
        <Balance value={balance}></Balance>
        <Users></Users>
    </>
}
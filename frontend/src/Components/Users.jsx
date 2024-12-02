import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios"
import { useNavigate } from "react-router-dom"
// import { array } from "prop-types"

function IndividualUser({ user }) {
    const navigate = useNavigate()
    return <div className="flex justify-between border rounded-lg p-4 m-2">
        <div className="flex justify-between gap-2">
            <div className="rounded-full h-12 w-12  bg-slate-400 flex justify-center mt-1 mr-2 ">
                <div className="flex flex-col justify-center h-full text-ul">U</div>
            </div>
            <div className=" flex text-black justify-content-center h-full t-4 mt-4 ml-2 font-bold">{ user.firstName }</div>
        </div>

        <div className="">
            <button className="h-full w-full border p-2 decoration-2 rounded-lg text-white bg-slate-800" onClick={() => {
               navigate(`/send?id=${user.id}&name=${user.firstName}`)
            }}>Send Money</button>
        </div>
        
    </div>
}

export const Users = () => {
    const [users, setUsers] = useState([])
    const token = localStorage.getItem('token')
    const [searchedUser , setSearchedUser] = useState([])
    const [searching , setSearching] = useState(false)
    async function getUser(username) {
        const res = await axios.get(`http://localhost:3000/api/v1/user/filter?filter=${username}`, { headers: { Authorization : token} })
        const data = await res.data
        console.log(data);
        setSearchedUser(data.user)
        
    }
    

    useEffect(() => {
        const getUsers = async () => {
            const response = await axios.get("http://localhost:3000/api/v1/user/bulk", { headers: { Authorization: token } })
            console.log(response.data);
            const data = await response.data
            console.log(data);
            setUsers(data.user)
            console.log(users);
            
            // const data = await response.data
            // console.log("data is " + data);  
            // setUsers(data.user)
        }
        getUsers()
    }, [])
      
    return <>
        <div className="font-bold text-lg mt-6">
              Users
        </div>

        {/* Search Bar  */}<div>
            <input type="text" placeholder="Enter Name " className=" p-4 border rounded-lg w-full" onChange={(e) => {
                getUser(e.target.value)
                setSearching(true)
            }} />
        </div>

        {/* user list */}
       
        {searching ? <div>
            {searchedUser.map((user) => {
               return <IndividualUser  user={user}></IndividualUser>
           })}
        </div> : 
        <div> {users.map((user) => {
               return <IndividualUser user={user}></IndividualUser>
        })}</div>
    }
    </>
}
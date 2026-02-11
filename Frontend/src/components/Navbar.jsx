import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({username: "prakash_d"});

  function getMe(){
    axios.get("http://localhost:3000/api/auth/me").then((res)=>{
      setIsLoggedIn(res.data.success);
      setUserData(res.data.user);
    })
  }

  console.log(userData, isLoggedIn)

  useEffect(()=>{
    getMe();
  }, [])

  function logout(){
    console.log("Logout btn clicked")
    axios.post("http://localhost:3000/api/auth/logout").then((res)=>{
      console.log(res.data)
      navigate("/")
    })
  }

  return (
    <nav className='px-7 w-full h-16 bg-zinc-700 flex items-center justify-between'>
        <div className='flex items-center gap-5'> 
          <h1 className='text-2xl font-bold'>Note App</h1>
        </div>
        <div className='flex items-center gap-5'>
          <h3 className='text-xl font-semibold'>{userData.username}</h3>
          {
            !isLoggedIn ? <button onClick={()=>navigate("/login")} className='px-3 py-1 bg-zinc-600 hover:bg-zinc-500 cursor-pointer text-xl font-semibold rounded-md'>Sign In</button> : <button onClick={logout} className='px-3 py-1 bg-red-400 hover:bg-red-500 cursor-pointer text-xl font-semibold rounded-md'>Logout</button>
          }
        </div>
    </nav>
  )
}

export default Navbar
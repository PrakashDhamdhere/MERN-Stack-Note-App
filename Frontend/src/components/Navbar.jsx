import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ userData }) => {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  function getMe(){
    axios.get("https://mern-stack-note-app-so6x.onrender.com/api/auth/me").then((res)=>{
      setIsLoggedIn(res.data.success);
    })
  }
  console.log("is logged in", isLoggedIn);
  
  
  function logout(){
    console.log("Logout btn clicked")
    axios.post("https://mern-stack-note-app-so6x.onrender.com/api/auth/logout").then((res)=>{
      navigate("/");
      navigate(0);
    })
  }

  useEffect(()=>{
    getMe()
  },[])
  
  return (
    <nav className='px-4 lg:px-7 w-full h-16 bg-zinc-700 flex items-center justify-between'>
        <div className='flex items-center gap-5'> 
          <h1 className='text-2xl font-bold'>Note App</h1>
        </div>
        <div className='flex items-center gap-5'>
          <h3 className='text-lg lg:text-xl font-semibold'>{userData.username}</h3>
          {
            !isLoggedIn ? <button onClick={()=>navigate("/login")} className='px-3 py-1 bg-zinc-600 hover:bg-zinc-500 cursor-pointer text-xl font-semibold rounded-md'>Sign In</button> : <button onClick={logout} className='px-3 py-1 bg-red-400 hover:bg-red-500 cursor-pointer text-xl font-semibold rounded-md'>Logout</button>
          }
        </div>
    </nav>
  )
}

export default Navbar
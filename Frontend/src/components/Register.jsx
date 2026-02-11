import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

  const navigat = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  function submitHandler(e){
    e.preventDefault()
    axios.post(`https://mern-stack-note-app-so6x.onrender.com/api/auth/register`, {
      username,
      email,
      password
    }).then((res)=>{
      console.log(res.data);
      setUsername("")
      setEmail("")
      setPassword("")
      navigat("/");
    })
  }

  return (
    <div className='w-full h-screen flex items-center justify-center'>
        <div className='w-1/4 mb-20'>
            <form onSubmit={submitHandler} className=' flex flex-col gap-4 px-4 py-5 rounded-md bg-zinc-800'>
              <h1 className='text-3xl font-semibold text-center'>Register</h1>
              <input value={username} onChange={(e)=>setUsername(e.target.value)} className='px-3 py-1 text-xl font-semibold border-2 border-zinc-500 rounded-md' placeholder='Enter username' type="text" />
              <input value={email} onChange={(e)=>setEmail(e.target.value)} className='px-3 py-1 text-xl font-semibold border-2 border-zinc-500 rounded-md' placeholder='Enter email' type="email" />
              <input value={password} onChange={(e)=>setPassword(e.target.value)} className='px-3 py-1 text-xl font-semibold border-2 border-zinc-500 rounded-md' placeholder='Enter password' type="password" />
              <input className='px-3 py-1 bg-blue-600 hover:bg-blue-500 cursor-pointer text-xl font-semibold rounded-md' type="submit" value="Login" />
              <h3 className='text-center text-zinc-300'>Already have an account? <Link to="/login" className='underline text-blue-500 hover:text-blue-400'>Login</Link></h3>
            </form>
        </div>
    </div>
  )
}

export default Register
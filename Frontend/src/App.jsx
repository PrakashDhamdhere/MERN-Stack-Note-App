import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Register from './components/Register'
import Home from './components/Home'
import Login from './components/Login'
import axios from 'axios'

const App = () => {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [localStorageNotes, setLocalStorageNotes] = useState([]);

  function getMe(){
    axios.get("https://mern-stack-note-app-so6x.onrender.com/api/auth/me").then((res)=>{
      setIsLoggedIn(res.data.success);
      setUserData(res.data.user);
    })
  }

  console.log(localStorageNotes);

  useEffect(()=>{
    getMe();
  }, [])

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home userData={userData} isLoggedIn={isLoggedIn} setLocalStorageNotes={setLocalStorageNotes} />} />
        <Route path='/register' element={<Register localStorageNotes={localStorageNotes} />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
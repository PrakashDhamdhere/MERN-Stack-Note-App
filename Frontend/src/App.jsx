import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Register from './components/Register'
import Home from './components/Home'
import Login from './components/Login'
import axios from 'axios'

const App = () => {

  const navigate = useNavigate();

  const [localStorageNotes, setLocalStorageNotes] = useState([]);
  
  

  console.log(localStorageNotes);


  return (
    <div>
      <Routes>
        <Route path='/' element={<Home setLocalStorageNotes={setLocalStorageNotes} />} />
        <Route path='/register' element={<Register localStorageNotes={localStorageNotes} />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Register from './components/Register'
import Home from './components/Home'
import Login from './components/Login'

const App = () => {

  const navigate = useNavigate();

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import "./Main.css"
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

const Main = () => {
  const navigate = useNavigate()
  
  return (
    <div className='MainDev'>
      <Navbar/>

    <Outlet/>
    </div>
  )
}

export default Main
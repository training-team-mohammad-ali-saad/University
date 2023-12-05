import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Students.css"
import { useDispatch, useSelector } from 'react-redux'
import { deleteSubjects, updateActivations, updateSubjects } from '../../Redux/subjectsSlice'
const Students = () => {
    const userId = useSelector((state)=> state.login.userId)
    const [message, setMessage] = useState("")
    const [allUsers, setAllUsers] = useState("")
    const activateUser = useSelector((state)=>state.subjects.subjects)
    const dispatch = useDispatch()
    useEffect(()=>{
        axios.get("http://localhost:5000/users/students")
        .then((results)=>{
            setAllUsers(results.data.results)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])
  return (
    <div>
        <div className='usersTableH'>
            <h1>Student Name</h1>
            <h1>Student Email</h1>
            <h1>Activation</h1>
        </div>
        {allUsers&&<div>{allUsers.map(student=>{
            return<div key={student.id} className='usersTable'>
                <h3>{`${student.firstname.charAt(0).toUpperCase()}${student.firstname.slice(1)} ${student.lastname.charAt(0).toUpperCase()}${student.lastname.slice(1)}`}</h3>
                <h3>{student.email}</h3>
                {student.is_deleted===0?<button onClick={()=>{
                    axios.delete(`http://localhost:5000/users/${student.id}`)
                    .then((results)=>{
                        alert("User Activated")
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
                }}>Activate</button>:<h3 className='actv'>Activated</h3>}
            </div>
        })}</div>}
        {message&&<h3>{message}</h3>}
    </div>
  )
}

export default Students
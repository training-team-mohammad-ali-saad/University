import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Subjects.css"
import { updateSubjects } from '../../Redux/subjectsSlice'
import { useDispatch } from 'react-redux'
const Subjects = () => {
  const [message, setMessage] = useState("")
  const [usersInfo, setUsersInfo] = useState("")  
  const [newGrade, setNewGrade] = useState(0)
  function updatedSuccessfuly() {
    alert("Accessory updated successfully");
  }
  const dispatch = useDispatch()
  useEffect(()=>{
        axios.get("http://localhost:5000/subjects/sub/user")
        .then((results)=>{
          setUsersInfo(results.data.results)
          console.log(results.data.results);
        })
        .catch((error)=>{
          console.log(error);
        })
    },[])
    return (
    <div>
      <div className='tableUserInfo1'>
      <div>Student Name</div>
        <div>Email</div>
        <div>Subject</div>
        <div>Min Grade</div>
        <div>User grade</div>
        <div>Update Mark</div>
            </div>
      {usersInfo&&usersInfo.map((userinfo,i)=>{
        return<div key={i} className='tableUserInfo'>
        <div>{`${userinfo.firstname.charAt(0).toUpperCase()}${userinfo.firstname.slice(1)} ${userinfo.lastname.charAt(0).toUpperCase()}${userinfo.lastname.slice(1)}`}</div>
        <div className='nnn'>{userinfo.email}</div>
        <div className='nnn'>{userinfo.subject}</div>
        <div className='nnn'>{userinfo.min_grade}</div>
        <div className='nnn'>{userinfo.user_grade}</div>
        <div className='inputandbtn'>
          <input placeholder='New Mark' type='number' onChange={(e)=>{setNewGrade(e.target.value)}}/>
        <button className='updatemarkbtn' onClick={()=>{
          axios.put(`http://localhost:5000/subjects/mark/${userinfo.user_id}/${userinfo.subject}`,{user_grade:newGrade})
          .then((results)=>{
            console.log(results.data.results[0]);  
            dispatch(updateSubjects(results.data.results[0]))
            updatedSuccessfuly()
          })
          .catch((error)=>{
            console.log(error);
          })
        }}>Update mark</button>
        </div>
        </div>
      })}
    </div>
  )
}

export default Subjects
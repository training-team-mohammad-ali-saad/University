import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Assign.css"
const Assign = () => {
  const [allSubjects, setAllSubjects] = useState("")  
  const [subjectName, setSubjectName] = useState("")
  const [userId, setUserId] = useState("")
  const [minimum_grade, setMinimum_grade] = useState("")
  const [userGrade, setUserGrade] = useState("")
  const [studentsAll, setStudentsAll] = useState("")
  useEffect(()=>{
    axios.get("http://localhost:5000/subjects/")
    .then((results)=>{
      console.log(results.data.results);
      setAllSubjects(results.data.results)
    })
    .catch((error)=>{
      console.log(error);
    })
},[])
useEffect(()=>{
  axios.get("http://localhost:5000/users/students")
  .then((results)=>{
    setStudentsAll(results.data.results)
  })
  .catch((error)=>{
    console.log(error);
  })
},[])
  return (
    <div>
      <input placeholder='subject name' onChange={(e)=>{setSubjectName(e.target.value)}}/>
      <select name='Students' >
        {studentsAll&&studentsAll.map(student=>{
          return<option value="rigatoni">{student.firstname}</option>
        })}
      </select>
      <input placeholder='Min Grade' onChange={(e)=>{setMinimum_grade(e.target.value)}}/>
      <input placeholder='User Grade' onChange={(e)=>{setUserGrade(e.target.value)}}/>
      <button onClick={()=>{
        axios.post("http://localhost:5000/subjects/",{subject:subjectName,user_id:userId,min_grade:minimum_grade,user_grade:userGrade})
        .then((results)=>{
          console.log(results);
        })
        .catch((error)=>{
          console.log(error);
        })
      }}>Add</button>
      {allSubjects&&allSubjects.map(sub=>{
        return<div key={sub.id} className='subs'>
          <div>{sub.subject}</div>
          <div>{sub.user_id}</div>
          <div>{sub.min_grade}</div>
          <div>{sub.user_grade}</div>
        </div>
      })}
    </div>
  )
}

export default Assign
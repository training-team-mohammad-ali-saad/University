import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Grades.css"
const Grades = () => {
  const [allSubjects, setAllSubjects] = useState("")
  const [subjectName, setSubjectName] = useState("")
  const [minimum_grade, setMinimum_grade] = useState("")
  useEffect(()=>{
    axios.get("http://localhost:5000/subjects/")
    .then((results)=>{
      setAllSubjects(results.data.results)
    })
    .catch((error)=>{
      console.log(error);
    })
  },[])
  return (
    <div>
      <input placeholder='Subject name' onChange={(e)=>{setSubjectName(e.target.value)}}/>
      <input placeholder='Minimum Grade' onChange={(e)=>{setMinimum_grade(e.target.value)}}/>
      <button onClick={()=>{
        axios.post("http://localhost:5000/subjects/withoutuser",{subject:subjectName,min_grade:minimum_grade})
        .then((results)=>{
          console.log(results);
        })
        .catch((error)=>{
          console.log(error);
        })
      }}>Add</button>
      {allSubjects&&allSubjects.map(sub=>{
        return<div className='subjectsAddTable' key={sub.id}>
          <div>{sub.subject}</div>
          <div>{sub.min_grade}</div>
        </div>
      })}
    </div>
  )
}

export default Grades
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import "./Home.css"
import axios from 'axios';
const Home = () => {
    const userName = useSelector((state) => state.login.userName);
    const email1 = useSelector((state) => state.login.email1);
    const userId = useSelector((state)=>state.login.userId)
    const [subjects, setSubjects] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    useEffect(()=>{
        axios.get(`http://localhost:5000/subjects/${userId}`)
        .then((results)=>{
            setSubjects(results.data.results)
        })
        .catch((error)=>{
            setErrorMessage(error)
        })
    },[])
    return (
    <div className='allpage'>
        <h2 className='header1'>Your information</h2>
<table>
  <tr>
    <th>User Name</th>
    <th>Email</th>
  </tr>
  <tr>
    <td>{userName}</td>
    <td>{email1}</td>
  </tr>
  
</table>
<h2 className='header2'>Educational Information</h2>
<table>
  
  <tr>
    <td>Subject Name</td>
    <td>Minimum Grade</td>
    <td>Your Grade</td>
    <td>Passed Or Failed</td>

  </tr>
    {subjects&&subjects?.map(sub=>{
        return<tr>
        <th>{sub.subject}</th>
        <th>{sub.min_grade}</th>
        <th>{sub.user_grade}</th>
        <>{sub.user_grade<sub.min_grade?<th className='failed'>Failed</th>:
        <th className='passed'>Passed</th>}</>
        </tr>
    })}
  
</table>
      </div>
  )
}

export default Home
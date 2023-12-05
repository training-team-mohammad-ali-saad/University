import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./Register.css"
const Register = () => {
    const navigate = useNavigate()
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [reTypePassword, setReTypePassword] = useState("")
    const [image, setImage] = useState("")
    const [message, setMessage] = useState("")
    return (
    <div>
    <div className="container">
    <div className="title">Registration</div>
    <div className="content">
      <form action="#">
        <div className="user-details">
          <div className="input-box">
            <span className="details">First Name</span>
            <input type="text" placeholder="Enter your first name" onChange={(e)=>{
                setFirstname(e.target.value)
            }} required/>
          </div>
          <div className="input-box">
            <span className="details">Last Name</span>
            <input type="text" placeholder="Enter your last name" onChange={(e)=>{
                setLastname(e.target.value)
            }} required/>
          </div>
          <div className="input-box">
            <span className="details">Email</span>
            <input type="text" placeholder="Enter your email" onChange={(e)=>{
                setEmail(e.target.value)
            }} required/>
          </div>
          <div className="input-box">
            <span className="details">Password</span>
            <input type="text" placeholder="Enter your password" onChange={(e)=>{
                setPassword(e.target.value)
            }} required/>
          </div>
          <div className="input-box">
            <span className="details">Confirm Password</span>
            <input type="text" placeholder="Confirm your password" onChange={(e)=>{
                setReTypePassword(e.target.value)
            }} required/>
          </div>
          <div className="input-box">
            <span className="details">Image SRC</span>
            <input type="text" placeholder="Enter your image src" onChange={(e)=>{
                setImage(e.target.value)
            }} required/>
          </div>
        </div>
        <div className="gender-details">
          <input type="radio" name="gender" id="dot-1"/>
          <input type="radio" name="gender" id="dot-2"/>
          <input type="radio" name="gender" id="dot-3"/>
          <span className="gender-title">Gender</span>
          <div className="category">
            <label htmlFor="dot-1">
            <span className="dot one"></span>
            <span className="gender">Male</span>
          </label>
          <label htmlFor="dot-2">
            <span className="dot two"></span>
            <span className="gender">Female</span>
          </label>
          <label htmlFor="dot-3">
            <span className="dot three"></span>
            <span className="gender">Prefer not to say</span>
            </label>
          </div>
        </div>
      <div className="button">
      <input onClick={()=>{
        if (email&&password&&reTypePassword&&firstname&&lastname&&image){
            if (email.includes("@gmail.com")||
                email.includes("@hotmail.com")||
                email.includes("@yahoo.com")||
                email.includes("@outlook.com")){
                    if (password===reTypePassword){
                        
                        axios.post("http://localhost:5000/users/register",{firstname,lastname,email,password,image,role_id:1})
                        .then((results)=>{
                            navigate("/login")
                            console.log(results);
                        })
                        .catch((err)=>{
                            console.log(err);
                            setMessage(err.response)
                        })
                    }else{setMessage("passwords doesn't match")}
                }else{setMessage("Email must be example@example.com")}
        }else{setMessage("You must fill all the blanks")}
        }} type="submit" value="Register"/>
        {console.log(message)}
        {message&&<div className='errorMessage'>{message}</div>}
    </div>
    
        
      </form>
    </div>
  </div>
    </div>
  )
}

export default Register
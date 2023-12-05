import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import "./Login.css"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setLogin, setUserId,setRoleId, setUserName,setEmail1} from '../../Redux/loginSlice'
const Login = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const loginHandler = async () => {
    try {
      const result = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      if (result.data) {
        setMessage("");
        console.log(result.data);
        dispatch(setLogin(result.data.token));
        dispatch(setUserId(result.data.userId));
        dispatch(setRoleId(result.data.roleId));
        dispatch(setUserName(result.data.userName))
        dispatch(setEmail1(result.data.email1))
        if (result.data.roleId == 2) {
          navigate("/admindashboard");
        } else {
          navigate("/home");
        }
      }
    } catch (err) {
        console.log(err.response.data.message);
      setMessage(err.response.data.message);
    }
  };

    return (
    <div>
        <div className="wrapper">
         <div className="title">
            Login Form
         </div>
         <form action="#">
            <div className="field">
               <input onChange={(e)=>{
                setEmail(e.target.value)
               }} type="text" required/>
               <label>Email Address</label>
            </div>
            <div className="field">
               <input onChange={(e)=>{
                setPassword(e.target.value)
               }} type="password" required/>
               <label>Password</label>
            </div>
            <div className="content">
               <div className="checkbox">
                  <input type="checkbox" id="remember-me"/>
                  <label htmlFor="remember-me">Remember me</label>
               </div>
               <div className="pass-link">
                  <a href="#">Forgot password?</a>
               </div>
            </div>
            <div className="field" onClick={loginHandler}>
               <input type="submit" value="Login" />
            </div>
            {message&&<div className='errorMessage'>{message}</div>}
            <div className="signup-link">
               Not a member? <a href="/register">Signup now</a>
            </div>
         </form>
      </div>
    </div>
  )
}

export default Login
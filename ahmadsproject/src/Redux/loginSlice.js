import { createSlice } from "@reduxjs/toolkit";
export const loginSlice = createSlice({
    name:"login",
    initialState:{
        token : null || localStorage.getItem("token"),
        userId : null || localStorage.getItem("userId"),
        roleId : null || localStorage.getItem("roleId"),
        userName: null || localStorage.getItem("userName"),
        email1:null|| localStorage.getItem("email1"),
        isLoggedIn : localStorage.getItem("token")? true:false,
        is_deleted : localStorage.getItem("is_deleted")
    },
    reducers:{
        setLogin : (state,action) =>{
            state.token = action.payload
            state.isLoggedIn = true
            localStorage.setItem("token",action.payload)
        },
        setUserId : (state,action) => {
            state.userId = action.payload
            localStorage.setItem("userId",action.payload)
        },
        setEmail1 : (state,action) => {
            state.email1 = action.payload
            localStorage.setItem("email1",action.payload)
        },
        setUserName: (state,action)=>{
            state.userName=action.payload
            localStorage.setItem("userName",action.payload)
        },
        setRoleId: (state,action)=>{
            state.roleId = action.payload
            localStorage.setItem("roleId",action.payload)
        },
        setLogout: (state) => {
            state.token = null;
            state.userId = null;
            state.roleId = null;
            state.userName=null;
            state.email1=null
            state.isLoggedIn = false;
            localStorage.clear();
          },
    },
})
export const {setLogin,setUserId,setUserName,setEmail1,setRoleId,setLogout}= loginSlice.actions
export default loginSlice.reducer
import { createSlice } from "@reduxjs/toolkit";
export const subjectsSlice = createSlice({
    name:"subject",
    initialState:{
        subjects : []

    },
    reducers:{
        setSubjects : (state,action) =>{
            state.subjects=action.payload
        },
        addSubjects: (state,action)=>{
            state.subjects.push(action.payload)
        },
        updateSubjects: (state,action)=>{
            state.subjects=state.subjects.map((sub)=>{
                return sub.id === action.payload.id?action.payload : sub
            })
        },
        updateActivations:(state,action)=>{
            console.log(state.subjects);
          state.subjects=state.subjects.map((sub)=>{
            if(sub.id===action.payload.id){
                console.log(sub);
                sub.is_deleted=1
            }
          })
        },
        deleteSubjects:(state,action)=>{
            state.subjects.find((sub,i)=>{
                if(sub.id===action.payload){
                    return state.subjects.splice(i,1)
                }
            })
        }
        
    },
})
export const {setSubjects,addSubjects,updateSubjects,deleteSubjects,updateActivations}= subjectsSlice.actions
export default subjectsSlice.reducer
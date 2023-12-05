import { configureStore } from "@reduxjs/toolkit"
import loginReducer from "./loginSlice"
import subjectsReducer from "./subjectsSlice"
export default configureStore({
    reducer:{
        login: loginReducer,
        subjects: subjectsReducer
    }
})
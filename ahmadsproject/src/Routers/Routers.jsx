import { createBrowserRouter } from "react-router-dom";
import Main from "../Components/Main/Main";
import Login from "../Components/Login/Login";
import Home from "../Components/Home/Home";
import Register from "../Components/Register/Register";
import Admindashboard from "../Components/Admindashboard/Admindashboard";
import Students from "../Components/Students/Students";
import Subjects from "../Components/Subjects/Subjects";
import Grades from "../Components/Grades/Grades";
import Assign from "../Components/Assign/Assign";
import HomePage from "../Components/HomePage/HomePage";

export const router= createBrowserRouter([{
    path:"/",
    element:<Main/>,
    children:[
        {
            path:"/",
            element:<HomePage/>
        },
        {
        path:"login",
        element:<Login/>
    },
    {
        path:"register",
        element:<Register/>
    },
    {
        path:"home",
        element:<Home/>   
    },
    {
        path:"admindashboard",
        element:<Admindashboard/>, 
        children:[{
            path:"",
            element:<Students/>
        },
        {
            path:"subjects",
            element:<Subjects/>
        },
        {
            path:"grades",
            element:<Grades/>
        },
        {
            path:"assign",
            element:<Assign/>
        }]  
    }
]
}])
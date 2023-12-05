const {pool} = require("../models/db")

const getAllSubjects = (req,res)=>{
    const query = `SELECT * from subjects`
    pool.query(query)
    .then((results)=>{
        res.status(200).json({
            success:true,
            message:"Here are all users",
            results:results.rows
        })
    })
    .catch((error)=>{
        res.status(500).json({
            success:false,
            message:"SomeThing went wrong kindly try again later",
            error
        })
    })
}
const addNewSubject = (req,res)=>{
    const {subject,min_grade,user_grade,user_id}=req.body
    const array = [subject,min_grade,user_grade,user_id]
    const query = `INSERT INTO subjects(subject,min_grade,user_grade,user_id)values($1,$2,$3,$4) returning *`
    pool.query(query,array)
    .then((results)=>{
        res.status(200).json({
            success:true,
            message:"Subject added successfully",
            results:results.rows
        })
    })
    .catch((error)=>{
        res.status(500).json({
            success:false,
            message:"Error happened while adding",
            error
        })
    })
}
const getAllSubjectsForSpeceficUser = (req,res)=>{
    const {user_id} = req.params
    const array=[user_id]
    const query = `SELECT * from subjects where user_id=$1`
    pool.query(query,array)
    .then((results)=>{
        console.log(results);
        res.status(200).json({
            success:true,
            message:"Here are all your subjects",
            results:results.rows
        })
    })
    .catch((error)=>{
        res.status(500).json({
            success:false,
            message:"Something went wrong while loading kindly try again later",
            error
        })
    })
}
const getAllSubjectsWithUsers = (req,res)=>{
    const query = `SELECT * from subjects inner join users on users.id=subjects.user_id`
    pool.query(query)
    .then((results)=>{
        res.status(200).json({
            success:true,
            message:"Here are all your users and subjects",
            results:results.rows
        })
    })
    .catch((error)=>{
        res.status(500).json({
            success:false,
            message:"Error happened while loading",
            error
        })
    })
}
const updateMark = (req,res)=>{
    const {user_id,subject} = req.params
    const {user_grade} = req.body
    const array =[user_grade,user_id,subject]
    const query = `update subjects set user_grade=$1 where user_id=$2 and subject=$3 returning *`
    pool.query(query,array)
    .then((results)=>{
        res.status(200).json({
            success:true,
            message:"Mark updated successfully",
            results:results.rows
        })
    })
    .catch((error)=>{
        res.status(500).json({
            success:false,
            message:"Something went wrong kindly try again",
            error
        })
    })
}
const addNewSubjectWithoutUser = (req,res)=>{
    const {subject,min_grade}=req.body
    const array=[subject,min_grade]
    const query=`insert into subjects(subject,min_grade) values ($1,$2) returning *`
    pool.query(query,array)
    .then((results)=>{
        res.status(200).json({
            success:true,
            message:`Subject with name ${subject} has been added successfuly`,
            results:results.rows
        })
    })
    .catch((error)=>{
        res.status(500).json({
            success:false,
            message:"Error happend try again",
            error
        })
    })
}
module.exports ={
    getAllSubjects,
    addNewSubject,
    getAllSubjectsForSpeceficUser,
    getAllSubjectsWithUsers,
    updateMark,
    addNewSubjectWithoutUser,

}
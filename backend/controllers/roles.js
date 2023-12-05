const {pool} = require("../models/db")
const createNewRole = (req,res)=>{
    const {role} =req.body
    const array = [role]
    const query = `insert into roles(role) values ($1)`
    pool.query(query,array)
    .then((results)=>{
        res.status(200).json({
            success:true,
            message:"Role added successfully",
            results
        })
    })
    .catch((error)=>{
        res.status(500).json({
            success:false,
            message:"Error happened while adding role try again",
            error
        })
    })
}
const updateRole = (req,res)=>{
    const {role,id } = req.body
    const array = [role,id]
    const query = `update roles set role=$1 where id=$2 returning *`
    pool.query(query,array)
    .then((results)=>{
        res.status(201).json({
            success:true,
            message:"Role Updated Successfully",
            results:results.rows
        })
    })
    .catch((error)=>{
        res.status(500).json({
            success:false,
            message:"Something Went Wrong Kindly Try Again Later",
            error
        })
    })
}
module.exports ={
    createNewRole,
    updateRole
}
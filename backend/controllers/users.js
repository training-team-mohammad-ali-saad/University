const { pool } = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { query, response } = require("express");
const users = {};
users.register = async (req, res) => {
  const { firstname, lastname, email, password, image, role_id } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  const query = `insert into users (firstname,lastname,email,password,image,role_id) values ($1,$2,$3,$4,$5,$6) returning *;`;
  const data = [
    firstname,
    lastname,
    email.toLowerCase(),
    encryptedPassword,
    image,
    role_id,
  ];
  pool
    .query(query, data)
        .then((results) => {
            res.status(200).json({
                success: true,
                message: "Account has been added",
                results: results.rows,
            });
        })
        .catch((error) => {
            res.status(409).json({
                success: false,
                message: "The email already exists",
                error,
      });
    });
};
users.login = async (req, res) => {
  const password = req.body.password
  const email = req.body.email
  const query =`select * from users where email = $1`
  const array = [email.toLowerCase()]
  pool.query(query,array)
  .then((results)=>{
    if (results.rows.length){
        bcrypt.compare(password,results.rows[0].password,(err,response)=>{
            if(err)res.json(err)
            if(response){
                const payload = {
                    userId: results.rows[0].id,
                    role:results.rows[0].role_id,
                    userName: results.rows[0].firstname+" "+results.rows[0].lastname,
                    email1:results.rows[0].email
                }
                const options = {expiresIn: "1d"}
                const secret = process.env.SECRET
                const token = jwt.sign(payload,secret,options)
                if(token){
                    return res.status(200).json({
                        token,
                        success:true,
                        message:`Valid login credentials`,
                        userId : results.rows[0].id,
                        roleId : results.rows[0].role_id,
                        userName: results.rows[0].firstname+" "+results.rows[0].lastname,
                        email1:results.rows[0].email
                
                    })
                }else{throw Error}
            }else{res.status(403).json({
                success:false,
                message:`The email doesn't exist or the password you've entered is incorrect`
            })}
        })
    }else {throw Error}
})
.catch((err)=>{
    res.status(404).json({
        success:false,
        message:"The email doesn't exist",
        err
    })
})
};
users.getAllUsers = (req, res) => {
    pool
      .query(`SELECT * from users`)
      .then((results) => {
        res.status(200).json({
          success: true,
          message: "Here are all users",
          results: results.rows,
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: "Something went wrong kindly try again later",
          error,
        });
      });
  };
  users.getAllStudents = (req, res) => {
    pool
      .query(`SELECT * from users where role_id=1`)
      .then((results) => {
        res.status(200).json({
          success: true,
          message: "Here are all students",
          results: results.rows,
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: "Something went wrong kindly try again later",
          error,
        });
      });
  };
  users.activateUser = (req,res)=>{
    const {id}=req.params
    const array=[id]
    const query =`UPDATE users set is_deleted=1 where id=$1 returning *` 
    pool.query(query,array)
    .then((results)=>{
        res.status(200).json({
            success:true,
            message:"User Activated Successfully",
            results:results.rows
        })
    })
    .catch((error)=>{
        res.status(500).json({
            success:false,
            message:"Error Happened",
            error
        })
    })
  }
module.exports = users;

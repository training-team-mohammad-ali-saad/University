const {pool} = require("../models/db")
const authorization = (string)=>{
    return function(req,res,next){
        const role_id =req.token.role
        const data = [role_id,string]
        const query = `select * from role_permission RP inner join permissions P on RP.permission_id = P.id where RP.role_id =($1 and P.permission =($2))`
        pool.query(query,data)
        .then((results)=>{
            if (results.rows.length){
                next()
            }else{
                throw Error
            }
        })
        .catch((error)=>{
            res.status(400).json({
                message:"Unauthorized"
            })
        })
    }
}
module.exports= authorization
const router = require("express").Router()
const bookshelf = require("../conn");
const uuid=require("uuid");
const User = require("../models/User");
module.exports = router;

//the /validate? route...
router.post("/", (req, res, next) => {
    console.log(req.query)
    if (req.query.fieldlist) {
        
    }
    bookshelf.knex("users").where({email:req.query.email}).
    orWhere({username:req.query.username}).select().then(users=>{
        console.log(users.length)
        if (users.length>0) {
        return res.json({isUnique:false, err:"User with similar info already exists"});
        }
        return res.json({isUnique:true});
    }).catch(err=>{
        console.log(err)
        res.statusCode=500;
        return res.json({err:"Error"});
    })
    //return res.json({ username: "Tope", age: 27, email: "trinitietp@gmail.com" });
});


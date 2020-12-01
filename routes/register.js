const router = require("express").Router()
const bookshelf = require("../conn");
const uuid=require("uuid");
const User = require("../models/User");
module.exports = router;

//the /register route...
router.post("/", (req, res, next) => {
    bookshelf.knex("users").insert({
        userUUID:uuid.v4(),
        l_name: req.body.l_name,
        f_name: req.body.f_name, 
        email: req.body.email, 
        gender: req.body.gender,
        username: req.body.username,
        password: req.body.password,
        avatarInfo: JSON.stringify(req.body.avatarInfo) ,
    }).then(returnedRes=>{
        if (returnedRes) {
            res.json({saved:true,res:"saved"})
        }
    }).catch(err=>{
        console.log(err)
        res.statusCode=500;
        return res.json({err:"User with similar info already exists"});
    })
    //return res.json({ username: "Tope", age: 27, email: "trinitietp@gmail.com" });
});


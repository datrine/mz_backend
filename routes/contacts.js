const router=require("express").Router()

//leading route is /users/:idorusername/contacts....
router.post("/add",(req,res,next)=>{

})
router.get("/",(req,res,next)=>{
    console.log("esrffggjhghjg")
    let contacts=[{userID:2,username:"da3n"},{userID:3,username:"david"},]
    return res.json(contacts);
});
router.post("/search",(req,res,next)=>{})
router.post("/delete",(req,res,next)=>{})
router.post("/edit",(req,res,next)=>{})
router.post("/contacts",(req,res,next)=>{})

module.exports=router;
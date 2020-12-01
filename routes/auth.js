const router = require("express").Router()
const bookshelf = require("../conn");
const uuid=require("uuid");
const User = require("../models/User");
const jwt=require("jose")
module.exports = router;

//the /validate? route...
router.use("/", (req, res, next) => {
    if (req.session.email) {
        return next(new Error("User :no session data"))
    }
});


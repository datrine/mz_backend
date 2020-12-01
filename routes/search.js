const router = require("express").Router()
const bookshelf = require("../conn");
const User = require("../models/User");
const contactsRouter = require("./contacts");
module.exports = router;

//serve all routes with /users/:idOrUsername/contacts/
router.use("/:idOrUsername/contacts", contactsRouter);

router.post("/login/refresh", (req, res, next) => {
    //console.log(req.body)
    bookshelf.knex("users").
        where({ email: req.body.usernameOrEmail, password: req.body.password }).
        orWhere({ username: req.body.usernameOrEmail, password: req.body.password }).
        select('l_name', 'f_name', 'email', 'username').then(loggedUser => {
            console.log(loggedUser)
            return res.json({ user: loggedUser[0].TextRow })
        }).catch((err) => {
            res.statusCode = 500;
        })
    //return res.json({ username: "Tope", age: 27, email: "trinitietp@gmail.com" });
});

router.post("/login", (req, res, next) => {
    //console.log(req.body)
    bookshelf.knex("users").
        where({ email: req.body.usernameOrEmail, password: req.body.password }).
        orWhere({ username: req.body.usernameOrEmail, password: req.body.password }).
        select('l_name', 'f_name', 'email', 'username').then(loggedUser => {
            console.log(loggedUser)
            if (loggedUser.length > 0) {
                return res.json({ user: loggedUser[0].TextRow })
            } else {
                return res.json({ err: "No user matches email/username and password" })
            }
        }).catch((err) => {
            console.error(err);
            res.statusCode = 500;
            return res.json({ err });
        })
});

router.get("/search", (req, res, next) => {
    console.log(req.query)
    if (!req.query.str) {
        res.json([])
    }
    bookshelf.knex("users").where("id","like", `%${req.query.str}%`).
    orWhere("username","like", `%${req.query.str}%`).
        orWhere("email","like", `%${req.query.str}%`).select().then(users => {
            console.log(users.length)
            if (!users.length > 0) {
                return res.json([]);
            }
            return res.json(users);
        }).catch(err => {
            console.log(err)
            res.statusCode = 500;
            return res.json({ err: "Error" });
        })
});

router.get("/:idOrUsername", (req, res, next) => {
    console.log(req.params)
    console.log("params")
    bookshelf.knex("users").where({ id: req.params.idOrUsername }).
    orWhere({ username: req.params.idOrUsername }).
        orWhere({ email: req.params.idOrUsername }).select().then(users => {
            console.log(users.length)
            if (!users.length > 0) {
                res.statusCode=404;
                res.statusMessage="User not found"
                return res.json({ err: "User not found" });
            }
            return res.json({...(users[0]) });
        }).catch(err => {
            console.log(err)
            res.statusCode = 500;
            return res.json({ err: "Error" });
        })
});

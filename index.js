const express = require("express");
const cors=require("cors")
const app = express();
let sockets = require("./sockets");
const io = require("./sockets");
const userRouter=require("./routes/users");
const contactsRouter=require("./routes/contacts");
const registerRouter=require("./routes/register");
const validateRouter=require("./routes/validate");

const redis = require('redis')
const session = require('express-session')
 
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized:true
  })
);

app.use(cors())
app.use(express.json({}));

app.use(function (req, res, next) {
    if (!req.session) {
        console.log("No session...")
      return next(new Error('oh no')) // handle error
    }
    console.log("session...")
    next() // otherwise continue
  });

// route for /users, and users/:idOrUsername/contacts and derivable routes
app.use("/users",userRouter);

app.use("/validate",validateRouter);

app.use("/register",registerRouter);

app.listen(4000, () => {
    console.log("Listening on port 4000...")
})
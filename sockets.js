let io=require("socket.io")();
module.exports=io;
io.attach(5000);

io.on("connect",(socket)=>{
    socket.on("username",(username,ackFn)=>{
        try {
            socket.join(username);
            console.log(`${socket.id} join ${username}`)
        } catch (error) {
            ackFn(`Error:
            ${error}`)
            socket.emit("username_error",error,ackMsg=>{
            })
        }
    });
    socket.on("username",(setup)=>{
        let username=setup.username;
        //add each username associated with a socket to a unique
        socket.join(username);
        socket.emit("re_username",ackMsg=>{
            console.log(ackMsg);
        })
    });
    socket.on("video-offer",()=>{

    });
    socket.on("video-answer",()=>{

    });
    socket.on("new-ice-candidate",()=>{

    });
    async ()=>{
        let
    }
});

io.on("disconnect",(reason)=>{
console.log(reason)
});


// Output logging information to console

function log(text) {
    var time = new Date();
  
    console.log("[" + time.toLocaleTimeString() + "] " + text);
  }

  function forwardMsgToReceiver(event,msg,socket) {
      socket.emit(event,msg,ackMsg=>{
          
      })
  }
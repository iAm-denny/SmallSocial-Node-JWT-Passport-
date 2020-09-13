# SmallSocial-Node-JWT-Passport-

Please create Files "keys" in config Folder

In keys file
module.exports= { <br/>
    google: { <br/>
        clientID: " your id in <b>Google Developers Console</b>", <br/>
    clientSecret "your Secret in <b>Google Developers Console</b>": <br/>
    },
    facebook: {<br/>
        clientID: <b>your id in facebook for Developer</b> <br/>
        clientSecret:  <b>your Secret in facebook for Developer</b> <br/>
    },
    cookie: { <br/>
        sessionKey:'net.com' <br/>
    },
    mongodb: {
        url : mongodbURL <br/>
    }
}

const express = require('express');
const path = require('path');
const cors = require('cors');
const app2 = express();
// a test route to make sure we can reach the backend
//this would normally go in a routes file
app2.use(
    cors({
        origin : 'http://localhost:3000',
        credentials:true
    })
);
app2.use(express.json());
app2.use(express.urlencoded({extended:false}));

let username='';

app2.get('/home', function(req, res){  //confused on /home aspect, may need to change for us
    console.log('Inside Home Login');
    res.writeHead(200,{
        'Content-Type': 'application/json'
    });
    console.log('username:', JSON.stringify(username));
    res.end(JSON.stringify(username));
});

app2.post('/userWebLogin', function(req, res){
    const newUsername=req.webLogin; //wrong way to grab variable
    console.log("username passed: " +newUsername); //error here
})

//Set the port that you want the server to run on
const port = process.env.PORT || 2345;
app2.listen(port);
console.log('App2 is listening on port ' + port);
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

//connects to sqlite3, opens the spotifyShared.db that contains tables storing pertinent info
let sqlite3 = require('sqlite3').verbose();
let db_spotifyShared=new sqlite3.Database('./spotifyShared.db', sqlite3.OPEN_READWRITE,(err)=>{
  if(err){
    console.error(err.message);
  }
  console.log('Connected to the spotifyShared database.');
});

//let username='';

app2.get('/home', function(req, res){  //confused on /home aspect, may need to change for us
    console.log('Inside Home Login');
    res.writeHead(200,{
        'Content-Type': 'application/json'
    });
    console.log('username:', JSON.stringify(username));
    res.end(JSON.stringify(username));
});

app2.post('/userWebLogin', function(req, res){
    //console.log(Object.keys(req.body)); this line works
    //console.log(req.body);
    //console.log("res: "+res.body);
    //console.log("hi");
    const newUsername=Object.keys(req.body)[0]; 
    console.log("username passed: " +newUsername); 
     //store state.weblogin in database here
    db_spotifyShared.run('INSERT INTO user_info(username) VALUES(?)', [newUsername], function(err){
      if(err){
        return console.log(err.message);
      }
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
})

//Set the port that you want the server to run on
const port = process.env.PORT || 2345;
app2.listen(port);
console.log('App2 is listening on port ' + port);

db_spotifyShared.close();
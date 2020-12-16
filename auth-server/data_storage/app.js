const express = require('express');
const path = require('path');
const cors = require('cors');
const { Redirect } = require('react-router-dom');
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
    //db_spotifyShared.close();
    //could close database on logout
});

app2.post('/userTopArtists', function(req, res){

    let sqlCall='UPDATE user_info SET topArtist1=(?), topArtist2=(?), topArtist3=(?), topArtist4=(?), topArtist5=(?) WHERE username=(?)';
    let sqlData=[req.body.firstTopArtist, req.body.secondTopArtist, req.body.thirdTopArtist, req.body.fourthTopArtist, req.body.fifthTopArtist, req.body.username];

    db_spotifyShared.run(sqlCall, sqlData, function(err){
      if(err){
        return console.log(err.message);
      }
      console.log(`A row has been updated with rowid ${this.lastID}`);
    });
    //db_spotifyShared.close();
    //could close database on logout
});

app2.post('/userTopTracks', function(req, res){

    let sqlCall='UPDATE user_info SET topTrack1=(?), topTrack2=(?), topTrack3=(?), topTrack4=(?), topTrack5=(?) WHERE username=(?)';
    let sqlData=[req.body.firstTopTrack, req.body.secondTopTrack, req.body.thirdTopTrack, req.body.fourthTopTrack, req.body.fifthTopTrack, req.body.username];

    db_spotifyShared.run(sqlCall, sqlData, function(err){
      if(err){
        return console.log(err.message);
      }
      console.log(`A row has been updated with rowid ${this.lastID}`);
    });
    //db_spotifyShared.close();
    //could close database on logout
});

//app2.post call for genre
app2.post('/userTopGenres', function(req, res){

    let sqlCall='UPDATE user_info SET topGenre1=(?), topGenre2=(?), topGenre3=(?), topGenre4=(?), topGenre5=(?) WHERE username=(?)';
    let sqlData=[req.body.firstTopGenre, req.body.secondTopGenre, req.body.thirdTopGenre, req.body.fourthTopGenre, req.body.fifthTopGenre, req.body.username];

    db_spotifyShared.run(sqlCall, sqlData, function(err){
      if(err){
        return console.log(err.message);
      }
      console.log(`A row has been updated with rowid ${this.lastID}`);
    });
    //db_spotifyShared.close();
    //could close database on logout
});

app2.post('/userPlaylist', function(req, res){

    let sqlCall='UPDATE user_info SET playlist=(?) WHERE username=(?)';
    let sqlData=[req.body.playlistName, req.body.username];
    console.log(req.body.playlistName);

    db_spotifyShared.run(sqlCall, sqlData, function(err){
      if(err){
        return console.log(err.message);
      }
      console.log(`A row has been updated with rowid ${this.lastID}`);
    });
    //db_spotifyShared.close();
    //could close database on logout
});

app2.get('/otherUsers', function(req, res){  //confused on /home aspect, may need to change for us
    console.log('Getting Other Users');
    let sqlCall='SELECT * FROM user_info';
    let othUsers=[];
    db_spotifyShared.all(sqlCall, (err, row)=>{
        if(err){
            console.log(err);
        }
        for(let i=0; i<row.length;++i){
            othUsers.push(row[i].username);
        }
        console.log(othUsers);
        res.send(othUsers);
    });
    // console.log(othUsers[0].username);
    // console.log(othUsers.username[0]);
    // console.log(othUsers.username);
    //console.log(othUsers);
    //res.send(othUsers); //send data w res.send(data)
});

app2.get('/overlappingData', function(req, res){  
    console.log('Comparing users info');
    let user1=req.query.user1;
    let user2=req.query.user2;
    let user1Index;
    let user2Index;
    let sqlCall='SELECT * FROM user_info ';
    let overlapArtists=[];
    let overlapTracks=[];
    let overlapGenres=[];
    db_spotifyShared.all(sqlCall,(err, rows)=>{
        if(err){
            console.log(err);
        }

        for(let i=0; i<rows.length; ++i){
            if(user1==rows[i].username){
                user1Index=i;
            }
            else if(user2==rows[i].username){
                user2Index=i;
            }
            else{
            }
        }
        console.log("user1Index=" + user1Index);
        console.log("user2Index=" + user2Index);
        //artists
        if(rows[user1Index].topArtist1==rows[user2Index].topArtist1){
            overlapArtists.push(rows[user1Index].topArtist1);
        }
        if(rows[user1Index].topArtist1==rows[user2Index].topArtist2){
            overlapArtists.push(rows[user1Index].topArtist1);
        }
        if(rows[user1Index].topArtist1==rows[user2Index].topArtist3){
            overlapArtists.push(rows[user1Index].topArtist1);
        }
        if(rows[user1Index].topArtist1==rows[user2Index].topArtist4){
            overlapArtists.push(rows[user1Index].topArtist1);
        }
        if(rows[user1Index].topArtist1==rows[user2Index].topArtist5){
            overlapArtists.push(rows[user1Index].topArtist1);
        }
        if(rows[user1Index].topArtist2==rows[user2Index].topArtist1){
            overlapArtists.push(rows[user1Index].topArtist2);
        }
        if(rows[user1Index].topArtist2==rows[user2Index].topArtist2){
            overlapArtists.push(rows[user1Index].topArtist2);
        }
        if(rows[user1Index].topArtist2==rows[user2Index].topArtist3){
            overlapArtists.push(rows[user1Index].topArtist2);
        }
        if(rows[user1Index].topArtist2==rows[user2Index].topArtist4){
            overlapArtists.push(rows[user1Index].topArtist2);
        }
        if(rows[user1Index].topArtist2==rows[user2Index].topArtist5){
            overlapArtists.push(rows[user1Index].topArtist2);
        }
        if(rows[user1Index].topArtist3==rows[user2Index].topArtist1){
            overlapArtists.push(rows[user1Index].topArtist3);
        }
        if(rows[user1Index].topArtist3==rows[user2Index].topArtist2){
            overlapArtists.push(rows[user1Index].topArtist3);
        }
        if(rows[user1Index].topArtist3==rows[user2Index].topArtist3){
            overlapArtists.push(rows[user1Index].topArtist3);
        }
        if(rows[user1Index].topArtist3==rows[user2Index].topArtist4){
            overlapArtists.push(rows[user1Index].topArtist3);
        }
        if(rows[user1Index].topArtist3==rows[user2Index].topArtist5){
            overlapArtists.push(rows[user1Index].topArtist3);
        }
        if(rows[user1Index].topArtist4==rows[user2Index].topArtist1){
            overlapArtists.push(rows[user1Index].topArtist4);
        }
        if(rows[user1Index].topArtist4==rows[user2Index].topArtist2){
            overlapArtists.push(rows[user1Index].topArtist4);
        }
        if(rows[user1Index].topArtist4==rows[user2Index].topArtist3){
            overlapArtists.push(rows[user1Index].topArtist4);
        }
        if(rows[user1Index].topArtist4==rows[user2Index].topArtist4){
            overlapArtists.push(rows[user1Index].topArtist4);
        }
        if(rows[user1Index].topArtist4==rows[user2Index].topArtist5){
            overlapArtists.push(rows[user1Index].topArtist4);
        }
        if(rows[user1Index].topArtist5==rows[user2Index].topArtist1){
            overlapArtists.push(rows[user1Index].topArtist5);
        }
        if(rows[user1Index].topArtist5==rows[user2Index].topArtist2){
            overlapArtists.push(rows[user1Index].topArtist5);
        }
        if(rows[user1Index].topArtist5==rows[user2Index].topArtist3){
            overlapArtists.push(rows[user1Index].topArtist5);
        }
        if(rows[user1Index].topArtist5==rows[user2Index].topArtist4){
            overlapArtists.push(rows[user1Index].topArtist5);
        }
        if(rows[user1Index].topArtist5==rows[user2Index].topArtist5){
            overlapArtists.push(rows[user1Index].topArtist5);
        }
        
        //tracks
        if(rows[user1Index].topTrack1==rows[user2Index].topTrack1){
            overlapTracks.push(rows[user1Index].topTrack1);
        }
        if(rows[user1Index].topTrack1==rows[user2Index].topTrack2){
            overlapTracks.push(rows[user1Index].topTrack1);
        }
        if(rows[user1Index].topTrack1==rows[user2Index].topTrack3){
            overlapTracks.push(rows[user1Index].topTrack1);
        }
        if(rows[user1Index].topTrack1==rows[user2Index].topTrack4){
            overlapTracks.push(rows[user1Index].topTrack1);
        }
        if(rows[user1Index].topTrack1==rows[user2Index].topTrack5){
            overlapTracks.push(rows[user1Index].topTrack1);
        }
        if(rows[user1Index].topTrack2==rows[user2Index].topTrack1){
            overlapTracks.push(rows[user1Index].topTrack2);
        }
        if(rows[user1Index].topTrack2==rows[user2Index].topTrack2){
            overlapTracks.push(rows[user1Index].topTrack2);
        }
        if(rows[user1Index].topTrack2==rows[user2Index].topTrack3){
            overlapTracks.push(rows[user1Index].topTrack2);
        }
        if(rows[user1Index].topTrack2==rows[user2Index].topTrack4){
            overlapTracks.push(rows[user1Index].topTrack2);
        }
        if(rows[user1Index].topTrack2==rows[user2Index].topTrack5){
            overlapTracks.push(rows[user1Index].topTrack2);
        }
        if(rows[user1Index].topTrack3==rows[user2Index].topTrack1){
            overlapTracks.push(rows[user1Index].topTrack3);
        }
        if(rows[user1Index].topTrack3==rows[user2Index].topTrack2){
            overlapTracks.push(rows[user1Index].topTrack3);
        }
        if(rows[user1Index].topTrack3==rows[user2Index].topTrack3){
            overlapTracks.push(rows[user1Index].topTrack3);
        }
        if(rows[user1Index].topTrack3==rows[user2Index].topTrack4){
            overlapTracks.push(rows[user1Index].topTrack3);
        }
        if(rows[user1Index].topTrack3==rows[user2Index].topTrack5){
            overlapTracks.push(rows[user1Index].topTrack3);
        }
        if(rows[user1Index].topTrack4==rows[user2Index].topTrack1){
            overlapTracks.push(rows[user1Index].topTrack4);
        }
        if(rows[user1Index].topTrack4==rows[user2Index].topTrack2){
            overlapTracks.push(rows[user1Index].topTrack4);
        }
        if(rows[user1Index].topTrack4==rows[user2Index].topTrack3){
            overlapTracks.push(rows[user1Index].topTrack4);
        }
        if(rows[user1Index].topTrack4==rows[user2Index].topTrack4){
            overlapTracks.push(rows[user1Index].topTrack4);
        }
        if(rows[user1Index].topTrack4==rows[user2Index].topTrack5){
            overlapTracks.push(rows[user1Index].topTrack4);
        }
        if(rows[user1Index].topTrack5==rows[user2Index].topTrack1){
            overlapTracks.push(rows[user1Index].topTrack5);
        }
        if(rows[user1Index].topTrack5==rows[user2Index].topTrack2){
            overlapTracks.push(rows[user1Index].topTrack5);
        }
        if(rows[user1Index].topTrack5==rows[user2Index].topTrack3){
            overlapTracks.push(rows[user1Index].topTrack5);
        }
        if(rows[user1Index].topTrack5==rows[user2Index].topTrack4){
            overlapTracks.push(rows[user1Index].topTrack5);
        }
        if(rows[user1Index].topTrack5==rows[user2Index].topTrack5){
            overlapTracks.push(rows[user1Index].topTrack5);
        }

        //genres
        if(rows[user1Index].topGenre1==rows[user2Index].topGenre1){
            overlapGenres.push(rows[user1Index].topGenre1);
        }
        if(rows[user1Index].topGenre1==rows[user2Index].topGenre2){
            overlapGenres.push(rows[user1Index].topGenre1);
        }
        if(rows[user1Index].topGenre1==rows[user2Index].topGenre3){
            overlapGenres.push(rows[user1Index].topGenre1);
        }
        if(rows[user1Index].topGenre1==rows[user2Index].topGenre4){
            overlapGenres.push(rows[user1Index].topGenre1);
        }
        if(rows[user1Index].topGenre1==rows[user2Index].topGenre5){
            overlapGenres.push(rows[user1Index].topGenre1);
        }
        if(rows[user1Index].topGenre2==rows[user2Index].topGenre1){
            overlapGenres.push(rows[user1Index].topGenre2);
        }
        if(rows[user1Index].topGenre2==rows[user2Index].topGenre2){
            overlapGenres.push(rows[user1Index].topGenre2);
        }
        if(rows[user1Index].topGenre2==rows[user2Index].topGenre3){
            overlapGenres.push(rows[user1Index].topGenre2);
        }
        if(rows[user1Index].topGenre2==rows[user2Index].topGenre4){
            overlapGenres.push(rows[user1Index].topGenre2);
        }
        if(rows[user1Index].topGenre2==rows[user2Index].topGenre5){
            overlapGenres.push(rows[user1Index].topGenre2);
        }
        if(rows[user1Index].topGenre3==rows[user2Index].topGenre1){
            overlapGenres.push(rows[user1Index].topGenre3);
        }
        if(rows[user1Index].topGenre3==rows[user2Index].topGenre2){
            overlapGenres.push(rows[user1Index].topGenre3);
        }
        if(rows[user1Index].topGenre3==rows[user2Index].topGenre3){
            overlapGenres.push(rows[user1Index].topGenre3);
        }
        if(rows[user1Index].topGenre3==rows[user2Index].topGenre4){
            overlapGenres.push(rows[user1Index].topGenre3);
        }
        if(rows[user1Index].topGenre3==rows[user2Index].topGenre5){
            overlapGenres.push(rows[user1Index].topGenre3);
        }
        if(rows[user1Index].topGenre4==rows[user2Index].topGenre1){
            overlapGenres.push(rows[user1Index].topGenre4);
        }
        if(rows[user1Index].topGenre4==rows[user2Index].topGenre2){
            overlapGenres.push(rows[user1Index].topGenre4);
        }
        if(rows[user1Index].topGenre4==rows[user2Index].topGenre3){
            overlapGenres.push(rows[user1Index].topGenre4);
        }
        if(rows[user1Index].topGenre4==rows[user2Index].topGenre4){
            overlapGenres.push(rows[user1Index].topGenre4);
        }
        if(rows[user1Index].topGenre4==rows[user2Index].topGenre5){
            overlapGenres.push(rows[user1Index].topGenre4);
        }
        if(rows[user1Index].topGenre5==rows[user2Index].topGenre){
            overlapGenres.push(rows[user1Index].topGenre5);
        }
        if(rows[user1Index].topGenre5==rows[user2Index].topGenre2){
            overlapGenres.push(rows[user1Index].topGenre5);
        }
        if(rows[user1Index].topGenre5==rows[user2Index].topGenre3){
            overlapGenres.push(rows[user1Index].topGenre5);
        }
        if(rows[user1Index].topGenre5==rows[user2Index].topGenre4){
            overlapGenres.push(rows[user1Index].topGenre5);
        }
        if(rows[user1Index].topGenre5==rows[user2Index].topGenre5){
            overlapGenres.push(rows[user1Index].topGenre5);
        }
        
        let updatedOverlapGenres=[];
        for(let i=0; i<overlapGenres.length; ++i){
            for(let ii=1; ii<overlapGenres.length; ++ii){
                if(overlapGenres[i]==overlapGenres[ii]){
                    updatedOverlapGenres=overlapGenres.slice(0,ii).concat(overlapGenres.slice(ii+1, overlapGenres.length));
                }
            }
        }
        let overlapData={artists:overlapArtists, genres:updatedOverlapGenres, tracks:overlapTracks};
        console.log(overlapArtists);
        console.log(overlapTracks);
        console.log(updatedOverlapGenres);
        console.log(overlapData);
        res.send(overlapData);
    });
});

app2.get('/suggestedPlaylist', function(req, res){  
    console.log('Comparing users info');
    let user1=req.query.user1;
    let user1Index;
    let sqlCall='SELECT * FROM user_info ';
    db_spotifyShared.all(sqlCall,(err, rows)=>{
        if(err){
            console.log(err);
        }

        for(let i=0; i<rows.length; ++i){
            if(user1==rows[i].username){
                user1Index=i;
            }
        }
        console.log("user1Index=" + user1Index);
        
        res.send(rows[user1Index].playlist);
    });
});

//Set the port that you want the server to run on
const port = process.env.PORT || 2345;
app2.listen(port);
console.log('App2 is listening on port ' + port);

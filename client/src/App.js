//import logo from './logo.svg';
import React,{Component} from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import { motion } from "framer-motion";
import ThreeDotsWave from './threeDotsWave';
import axios from 'axios';
import Nav from './Nav';
import SharedInsights from './SharedInsights';
import {BrowserRouter as Router, Switch,Route, Redirect} from 'react-router-dom';
import BouncingBalls from './BouncingBalls.js';


//connects to sqlite3, opens the spotifyShared.db that contains tables storing pertinent info
// let sqlite3 = require('sqlite3').verbose();
// let db_spotifyShared=new sqlite3.Database('./spotifyShared.db', sqlite3.OPEN_READWRITE,(err)=>{
//   if(err){
//     console.error(err.message);
//   }
//   console.log('Connected to the spotifyShared database.');
// });

const spotifyWebApi = new Spotify();

class App extends Component{
  constructor(){
    super();
    const params= this.getHashParams(); //gives obj that has access and refresh tokens
    this.state={
      loggedIn: params.access_token ? true : false, //checks if access token is set or not to see if logged in 
      //webLogin:'tbd',


      basicUserInfo:{
        username: 'TBD',
        image: ''
      },

      nowPlaying:{
        name: 'TBD',
        image: ''
      },

      savedTracks:{
        nameTrack1:'TBD'
        //nameTrack2:'TBD'
      },
      
      nameTopArtist:{
        topArtist1:'',
        topArtist2:'',
        topArtist3:'',
        topArtist4:'',
        topArtist5:'',
      },

      nameTopGenres:{
        topGenre1:'',
        topGenre2:'',
        topGenre3:'',
        topGenre4:'',
        topGenre5:'',
      },

      nameTopTracks:{
        topTrack1:'',
        topTrack2:'',
        topTrack3:'',
        topTrack4:'',
        topTrack5:'',
        topTrack1id:'',
        topTrack2id:'',
        topTrack3id:'',
        topTrack4id:'',
        topTrack5id:'',
      },

      //get Top Tracks

      audioFeatures:{
        danceability: '',
      },

      playlist:{
        //playlistId:'',
        playlistImage:'',
        playlistName:'',
        set:'',
      },
    
      otherUsers:[],
      otherUsersString:'',
      numberOfOtherUsers:'',
      otherSelectedUser:'',

      selectedOption: 'option1',

      sharedData:{
        sharedArtist:[],
        sharedTracks:[],
        sharedGenres:[],
        numArtists:'',
        numTracks:'',
        numGenres:'',
        playlist:''
      },

      matchScore:'',
   
     // have view set here
    };
    //this.handleChange=this.handleChange.bind(this);
    //this.handleSubmit=this.handleSubmit.bind(this);
    this.handleChange1=this.handleChange1.bind(this);
    this.getOverlappingData=this.getOverlappingData.bind(this);

    if (params.access_token){
      spotifyWebApi.setAccessToken(params.access_token);
    }
  }

  // handleChange(event){
  //   console.log(event.target.value); //console logging state can be unreliable bc react doesnt always do things in order
  //   this.setState({webLogin: event.target.value});
  // }
  // handleSubmit(event){
  //   alert('A name was submitted: ' + this.state.webLogin); //to test and see what value was submitted
   
  //   event.preventDefault();
  //   axios
  //     .post('http://localhost:2345/userWebLogin', this.state.webLogin)
  //     .then((res)=> console.log('Username Passed'))
  //     .catch(err=>{
  //       console.error(err);
  //     });
  // }

  

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

    getBasicUserInfo() { // we are having trouble w dis too
    spotifyWebApi.getMe()
    .then((response)=>{
        this.setState({
          basicUserInfo:{
          username:response.display_name,
          image:response.images[0].url
          }
      })
      axios
          .post('http://localhost:2345/userWebLogin', this.state.basicUserInfo.username)
           .then((res)=> console.log('Username Passed'))
           .catch(err=>{
             console.error(err);
           });

      axios
      .get('http://localhost:2345/otherUsers')
      .then(res=>{
        console.log(res);
        let persons=res.data;
        let tempString=" ";
        for(let i=0; i<persons.length; ++i){
          tempString+=persons[i] + " ";
        }
        this.setState({
          otherUsers:persons,
          numberOfOtherUsers:persons.length,
          otherUsersString:tempString
        })
      })
      .catch(function (err){
        console.log(err);
      });
  })
  }

  getNowPlaying() { //can alter this function and make more like it, using diff calls after spotifyWebApi.
    spotifyWebApi.getMyCurrentPlaybackState()
  
    .then((response)=>{
      //before setting state, if statement to see if response is null
      // console.log(response)
      // if(resoonse. item.name==null)
        this.setState({
          nowPlaying:{
          name:response.item.name,  // .item is used to access variables
          image:response.item.album.images[0].url //img not displaying
        }
      })
    })
  }

  getSavedTracks(){  
    spotifyWebApi.getMySavedTracks()
    .then((response)=>{
        this.setState({ //can change any state variables here, change view here
          savedTracks:{
            nameTrack1: response.items[0].track.name
            //nameTrack2: response.item.name[1]
          }
        }) //send data from state to database, make sure data properly sends to back end, then store data in database, then send like success message to say data was properly stored
        // look into firebase
      })
    }

  getTopArtists(){
    spotifyWebApi.getMyTopArtists()
    .then((response)=>{
      this.setState({ 
        nameTopArtist:{
          topArtist1: response.items[0].name,
          topArtist2: response.items[1].name,
          topArtist3: response.items[2].name,
          topArtist4: response.items[3].name,
          topArtist5: response.items[4].name
        }
      }) 
      axios
      .post('http://localhost:2345/userTopArtists', {"username":this.state.basicUserInfo.username, "firstTopArtist":this.state.nameTopArtist.topArtist1, "secondTopArtist":this.state.nameTopArtist.topArtist2, "thirdTopArtist":this.state.nameTopArtist.topArtist3, "fourthTopArtist":this.state.nameTopArtist.topArtist4, "fifthTopArtist":this.state.nameTopArtist.topArtist5})
      .catch(err=>{
        console.error(err);
      });
    })

    //react lifecycles
    //asynch await syntax
  }

  getTopGenres(){  
    spotifyWebApi.getMyTopArtists()
    .then((response)=>{
      let topGenre2Res=" ";
      let topGenre3Res=" ";
      let topGenre4Res=" ";
      let topGenre5Res=" ";
      if(response.items[1].genres[0]!=response.items[0].genres[0]){
        topGenre2Res=response.items[1].genres[0];
      }
      if(response.items[2].genres[0]!=response.items[0].genres[0] && response.items[2].genres[0]!=response.items[1].genres[0]){
        topGenre3Res=response.items[2].genres[0];
      }
      if(response.items[3].genres[0]!=response.items[0].genres[0] && response.items[3].genres[0]!=response.items[1].genres[0] && response.items[3].genres[0]!=response.items[2].genres[0]){
        topGenre4Res=response.items[3].genres[0];
      }
      if(response.items[4].genres[0]!=response.items[0].genres[0] && response.items[4].genres[0]!=response.items[1].genres[0] && response.items[4].genres[0]!=response.items[2].genres[0] && response.items[4].genres[0]!=response.items[3].genres[0]){
        topGenre5Res=response.items[4].genres[0];
      }
      
        this.setState({ //can change any state variables here, change view here
          nameTopGenres:{
            topGenre1: response.items[0].genres[0],
            topGenre2: topGenre2Res,
            topGenre3: topGenre3Res,
            topGenre4: topGenre4Res,
            topGenre5: topGenre5Res,
          }
        }) 
      axios
      .post('http://localhost:2345/userTopGenres', {"username":this.state.basicUserInfo.username, "firstTopGenre":this.state.nameTopGenres.topGenre1, "secondTopGenre":this.state.nameTopGenres.topGenre2, "thirdTopGenre":this.state.nameTopGenres.topGenre3, "fourthTopGenre":this.state.nameTopGenres.topGenre4, "fifthTopGenre":this.state.nameTopGenres.topGenre5})
      .catch(err=>{
        console.error(err);
      });
      })
    }

  getTopTracks(){
    spotifyWebApi. getMyTopTracks()
    .then((response)=>{
      this.setState({ 
        nameTopTracks:{
          topTrack1: response.items[0].name,
          topTrack2: response.items[1].name,
          topTrack3: response.items[2].name,
          topTrack4: response.items[3].name,
          topTrack5: response.items[4].name,
          topTrack1id: response.items[0].id,
          topTrack2id: response.items[1].id,
          topTrack3id: response.items[2].id,
          topTrack4id: response.items[3].id,
          topTrack5id: response.items[4].id,
        }
      })

      axios
      .post('http://localhost:2345/userTopTracks', {"username":this.state.basicUserInfo.username, "firstTopTrack":this.state.nameTopTracks.topTrack1, "secondTopTrack":this.state.nameTopTracks.topTrack2, "thirdTopTrack":this.state.nameTopTracks.topTrack3, "fourthTopTrack":this.state.nameTopTracks.topTrack4, "fifthTopTrack":this.state.nameTopTracks.topTrack5})
      .catch(err=>{
        console.error(err);
      });
    })

  }


  getAudioFeatures(){
    spotifyWebApi.getAudioFeaturesForTracks(this.state.nameTopTracks.topTrack2id)
    .then((response)=>{
      this.setState({ 
        audioFeatures:{
          danceability: response.audio_features[0].danceability,
          acousticness: response.audio_features[0].acousticness,
          energy: response.audio_features[0].energy,
          liveness: response.audio_features[0].liveness,
          loudness: response.audio_features[0].loudness,
        }
      }) 
    })
    spotifyWebApi.getUserPlaylists()
      .then((response)=>{
        this.setState({ 
          playlist:{
            //playlistId: response.items[0].id,
            playlistImage: response.items[2].images[0].url,
            playlistName:response.items[2].name

          }
        }) 
        console.log(this.state.playlist.playlistName);
        axios
        .post('http://localhost:2345/userPlaylist', {"username":this.state.basicUserInfo.username, "playlistName":this.state.playlist.playlistName})
        .catch(err=>{
          console.error(err);
        });
      })
  }

  getSuggestedPlaylist(){
    if((this.state.sharedData.sharedArtist).length>0){
      
      axios
      .get('http://localhost:2345/suggestedPlaylist', {params:{ 
        user1: this.state.otherSelectedUser  //entered user (ie: tessjenkins19 types in oscrhiber)

      }})
      .then(res=>{
        console.log(res);
        this.setState({
          sharedData:{
            playlist:res.data
          }
        })
      })
      .catch(function (err){
        console.log(err);
      })
    }
    else{
      this.setState({
        playlist:{
          set:'Users have no shared artists, so no playlists can be suggested'
        }
      })
    }
    
  }

  handleChange1(event){
    console.log(event.target.value); //console logging state can be unreliable bc react doesnt always do things in order
    this.setState({otherSelectedUser: event.target.value});
  }

  // handleOptionChange = changeEvent => {
  //   this.setState({selectedOption: changeEvent.target.value})
  // }

  getOverlappingData(event){
    // handleFormSubmit = formSubmitEvent => {
    //   formSubmitEvent.preventDefault();
    
    //   console.log("You have submitted:", this.state.selectedOption);
    // };

    event.preventDefault();

    axios
    .get('http://localhost:2345/overlappingData', {params:{
      user1:this.state.basicUserInfo.username, //current user (ie: I would be tessjenkins19)
      user2: this.state.otherSelectedUser  //entered user (ie: tessjenkins19 types in oscrhiber)

    }})
    .then(res=>{
      console.log(res);
      this.setState({
        sharedData:{
          sharedArtist: res.data.artists,
          sharedTracks:res.data.tracks,
          sharedGenres:res.data.genres,
          numArtists:(res.data.artists).length,
          numTracks:(res.data.tracks).length,
          numGenres:(res.data.genres).length,
        }
      })
    })
    .catch(function (err){
      console.log(err);
    })
  }

  getOverallMatchScore(){
    let score=((this.state.sharedData.sharedArtist).length+(this.state.sharedData.sharedTracks).length+(this.state.sharedData.sharedGenres).length)/(15);
    let percentscore=score*100;
    let match=percentscore+"%";
    this.setState({
      matchScore:match
    })
    console.log(match);
  }
    //in here for checking state in if statements, need to declare shared state in parent component (i think we already do this in the constructor)
 // state is considered to be private to the component that defines it
    //use onClick for user to click when they want to view top artist, genres, compare w other users
    //how to communicate parent and child, alter things with different states

  render(){ 

    return (  
   <Router>
    
      <div className='container'>

        <div className="ball1">
        </div>

        </div>
        <div className='container'>
        <div className="ball2"> 
      </div>
      </div>

      <div className='container'>
        <div className="ball3"> 
      </div>
      </div>
    <div className="App">
      <Nav></Nav>
<div className='Homepage'>
      <h1> Shared Wrappify</h1>
    <h3>Compare your music taste with your friends </h3>
    </div>
      {/* <Route path="/" exact component={Home} /> */}
      {/* <Route path="/MyInsights" component= {MyInsights} /> */}
      <Route path="/SharedInsights" component= {SharedInsights} />
    
      {/* <div id='OURwebpageLogin'>
        Enter your spotify username (note that this should NOT be your email)
      <form onSubmit={this.handleSubmit}> 
          <label>
            Username:
            <input type="text" value={this.state.webLogin}  onChange={this.handleChange}/> 
             target is the input that triggered this function. for diff forms would have dif handleChange functions, handleCHange1, etc 
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div> */}

      {/* //use conditional rendering
      //how to change eveythng on site, look at react.js.com
      //app component is whole page
      // one state component could be the view we're loking at
      // can have state initially set to log in, so for render we can have if statements to control what is displayed on front end
      //ie if(this.state=)
      //change page by changing diff state variables */}

      <div id='routToSpotify'>
        
        <a href='http://localhost:3456'>
        <button className="LoginButton">Login with Spotify</button>
        </a>
      </div>

      <div>
      <Grid>
      <threeDotsWave />
      </Grid>
      {/* <BouncingBalls></BouncingBalls> */}
      </div>

     
      <div> Welcome, {this.state.basicUserInfo.username} </div>
      <div>
        <img src={this.state.basicUserInfo.image} style={{width: 250}}/>
      </div>
      <motion.button className="styledButton" onClick={() => this.getBasicUserInfo()}  whileHover={{scale: 1.1, textShadow: "0px 0px 8px rgb(255,255,255)",boxShadow: "0px 0px 8px rgb(255,255,255)"}} >
        Show Me Me
      </motion.button> 

   


    
    <div>Now Playing: {this.state.nowPlaying.name}</div>
      <div>
        <img src={this.state.nowPlaying.image} style={{width: 500}}/>
      </div>
      <motion.button className="styledButton" onClick={() => this.getNowPlaying()} whileHover={{scale: 1.1, textShadow: "0px 0px 8px rgb(255,255,255)",boxShadow: "0px 0px 8px rgb(255,255,255)"}}>
        Check Now Playing 
      </motion.button> 
    
      <div id= '12SavedTracks'>Last saved Track: {this.state.savedTracks.nameTrack1}</div>
      {/* <div>Second saved Track: {this.state.savedTracks.nameTrack2}</div> */}
      <div id='butSavedTracks'>
        <motion.button className="styledButton" onClick={() => this.getSavedTracks()} whileHover={{scale: 1.1, textShadow: "0px 0px 8px rgb(255,255,255)",boxShadow: "0px 0px 8px rgb(255,255,255)"}}>
          See your latest saved track
        </motion.button> 
      </div>

      <div id = 'UsersTopArtists'> Your Top Artists:  </div>
      <div id = 'UsersTopArtists1'> 1: {this.state.nameTopArtist.topArtist1}</div>
      <div id = 'UsersTopArtists2'> 2: {this.state.nameTopArtist.topArtist2}</div>
      <div id = 'UsersTopArtists3'> 3: {this.state.nameTopArtist.topArtist3}</div>
      <div id = 'UsersTopArtists4'> 4: {this.state.nameTopArtist.topArtist4}</div>
      <div id = 'UsersTopArtists5'> 5: {this.state.nameTopArtist.topArtist5}</div>
      <div id='butTopArtists'>
        <motion.button className="styledButton" onClick={() => this.getTopArtists()} whileHover={{scale: 1.1, textShadow: "0px 0px 8px rgb(255,255,255)",boxShadow: "0px 0px 8px rgb(255,255,255)"}}>
          See your top artists
        </motion.button> 


        <div id = 'UsersTopGenres'> Your Top Genres:  </div>
      <div id = 'UsersTopGenres1'> 1: {this.state.nameTopGenres.topGenre1}</div>
      <div id = 'UsersTopGenres2'> 2: {this.state.nameTopGenres.topGenre2}</div>
      <div id = 'UsersTopGenres3'> 3: {this.state.nameTopGenres.topGenre3}</div>
      <div id = 'UsersTopGenres4'> 4: {this.state.nameTopGenres.topGenre4}</div>
      <div id = 'UsersTopGenres5'> 5: {this.state.nameTopGenres.topGenre5}</div>
      <div id='butTopGenres'>
        <motion.button className="styledButton" onClick={() => this.getTopGenres()} whileHover={{scale: 1.1, textShadow: "0px 0px 8px rgb(255,255,255)",boxShadow: "0px 0px 8px rgb(255,255,255)"}}>
          See your top genres
        </motion.button> 
    </div>

        <div id = 'UsersTopTracks'> Your Top Tracks:  </div>
      <div id = 'UsersTopTracks1'> 1: {this.state.nameTopTracks.topTrack1} </div>
      <div id = 'UsersTopTracks2'> 2: {this.state.nameTopTracks.topTrack2} </div>
      <div id = 'UsersTopTracks3'> 3: {this.state.nameTopTracks.topTrack3} </div>
      <div id = 'UsersTopTracks4'> 4: {this.state.nameTopTracks.topTrack4} </div>
      <div id = 'UsersTopTracks5'> 5: {this.state.nameTopTracks.topTrack5} </div>
      <div id='butTopTracks'>
        <motion.button className="styledButton"onClick={() => this.getTopTracks()} whileHover={{scale: 1.1, textShadow: "0px 0px 8px rgb(255,255,255)",boxShadow: "0px 0px 8px rgb(255,255,255)"}}>
          See your top tracks
        </motion.button> 
      </div>

        <div id = 'UsersAudioFeaturesForTracks'> Your Audio Feature Statistics:  </div>
      <div id='butAudioFeaturesForTracks'> Danceability:{this.state.audioFeatures.danceability} </div> 
      <div id='butAudioFeaturesForTracks'> Acousticness:{this.state.audioFeatures.acousticness} </div>
      <div id='butAudioFeaturesForTracks'> Energy:{this.state.audioFeatures.energy} </div>
      <div id='butAudioFeaturesForTracks'> Liveness:{this.state.audioFeatures.liveness} </div>
      <div id='butAudioFeaturesForTracks'> Loudness:{this.state.audioFeatures.loudness} </div>
      <div id='butAudioFeatures'>
        <motion.button className="styledButton" onClick={() => this.getAudioFeatures()} whileHover={{scale: 1.1, textShadow: "0px 0px 8px rgb(255,255,255)",boxShadow: "0px 0px 8px rgb(255,255,255)"}}>
          See your audio features
        </motion.button> 
      </div>
    </div>
      {/* <motion.button className="styledButton" onClick={() => this.getOtherUsers()} whileHover={{scale: 1.1, textShadow: "0px 0px 8px rgb(255,255,255)",boxShadow: "0px 0px 8px rgb(255,255,255)"}}>
          See other users!
        </motion.button>  */}
        
        {/* to make this neater, maybe some how print out w a for
        loop so that all the names are spaced apart? i dont think you
        can do for loops w html, but i bet theres a way to at least get 
        spaces between. Also realizing this isnt actually what we wanna do
        w the data anyways. will prob just be accessing individually. */}
    


  {/* radio buttons for selecting users */}
          {/* <form onSubmit={this.handleFormSubmit}>

    <div className="form-check">
      <label>
        <input
          type="radio"
          name="react-tips"
          value="option1"
          checked={this.state.selectedOption == "option1"}
          onChange={this.handleOptionChange}
          className="form-check-input"
        />
        Option 1
      </label>
    </div>

    <div className="form-check">
      <label>
        <input
          type="radio"
          name="react-tips"
          value="option2"
          checked={this.state.selectedOption == "option2"}
          onChange={this.handleOptionChange}
          className="form-check-input"
        />
        Option 2
      </label>
    </div>

    <div className="form-check">
      <label>
        <input
          type="radio"
          name="react-tips"
          value="option3"
          checked={this.state.selectedOption == "option3"}
          onChange={this.handleOptionChange}
          className="form-check-input"
        />
        Option 3
      </label>
    </div>

    <div className="form-group">
      <button className="btn btn-primary mt-2" type="submit">
        Compare Music Taste
      </button>
    </div>

    </form> */}

      <div>Other Users: {this.state.otherUsersString} </div>

        <form onSubmit={this.getOverlappingData}> 
          <label>
            Enter one of the above users to see shared music taste
            <input type="text" value={this.state.otherSelectedUser} onChange={this.handleChange1}/>  
            
            {/* target is the input that triggered this function. for diff forms would have dif handleChange functions, handleCHange1, etc */}
          </label>
          <input type="submit" value="Submit" />
        </form>


        <div>
          You and {this.state.otherSelectedUser} both listen to music by {this.state.sharedData.sharedArtist}, the song(s){this.state.sharedData.sharedTracks}, and the genre(s) {this.state.sharedData.sharedGenres}
        </div>

        <div>
        <h3>You and {this.state.otherSelectedUser} share {this.state.sharedData.numArtists} artists, {this.state.sharedData.numGenres} genres, and {this.state.sharedData.numTracks} top tracks </h3>
        </div>
      <p>
        Score: {this.state.matchScore}
      </p>
      <motion.button className="styledButton"  onClick={()=> this.getOverallMatchScore()} whileHover={{scale: 1.1, textShadow: "0px 0px 8px rgb(255,255,255)",boxShadow: "0px 0px 8px rgb(255,255,255)"}}>
         See your overall match score with {this.state.otherSelectedUser}
      </motion.button> 
      

{/* 
      <div id='OURwebpageLogin'>
        Enter your spotify username (note that this should NOT be your email)
      <form onSubmit={this.handleSubmit}> 
          <label>
            Username:
            <input type="text" value={this.state.webLogin}  onChange={this.handleChange}/> 
            {/* target is the input that triggered this function. for diff forms would have dif handleChange functions, handleCHange1, etc 
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
*/} 
      <div>{this.state.playlist.set}</div>
      <div>  {this.state.sharedData.playlist} </div>
      <div>
        {/* <img src={this.state.playlist.playlistImage} style={{width: 250}}/> */}
     
        <motion.button className="styledButton" onClick={() => this.getSuggestedPlaylist()} whileHover={{scale: 1.1, textShadow: "0px 0px 8px rgb(255,255,255)",boxShadow: "0px 0px 8px rgb(255,255,255)"}}>
          Suggest a playlist
        </motion.button> 
        </div>
        </div>

      </Router>
    );
  }
}

function Grid({ children }) {
  return (
    <div className="grid">
      <LoadingBox>{children}</LoadingBox>
    </div>
  );
}

function LoadingBox({ children }) {
  return React.Children.map(children, child => {
    return <div className="loading-box">{child}</div>;
  });
}


//closes database
// db_spotifyShared.close((err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });

// const Home = () => (
//   <div>
//     <h1 id='Homepage'> Shared Wrappify</h1>
//     <h3>Compare your music taste with your friends! </h3>
//   </div>
// );

export default App;

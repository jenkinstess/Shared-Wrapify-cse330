//import logo from './logo.svg';
import React,{Component} from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import ThreeDotsWave from './threeDotsWave';
import axios from 'axios';


//connects to sqlite3, opens the spotifyShared.db that contains tables storing pertinent info
// let sqlite3 = require('sqlite3').verbose();
// let db_spotifyShared=new sqlite3.Database('./spotifyShared.db', sqlite3.OPEN_READWRITE,(err)=>{
//   if(err){
//     console.error(err.message);
//   }
//   console.log('Connected to the spotifyShared database.');
// });

// Jamie test git push
const spotifyWebApi = new Spotify();

class App extends Component{
  constructor(){
    super();
    const params= this.getHashParams(); //gives obj that has access and refresh tokens
    this.state={
      loggedIn: params.access_token ? true : false, //checks if access token is set or not to see if logged in 
      webLogin:'tbd',

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
        topArtist:'TBD'
      },

      nameTopTracks:{
        topTrack:'TBD'
      },

      //get Top Tracks

      audioFeatures:{
        danceability: 'TBD'
      }
    

   
     // have view set here
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    if (params.access_token){
      spotifyWebApi.setAccessToken(params.access_token);
    }
  }

  handleChange(event){
    console.log(event.target.value); //console logging state can be unreliable bc react doesnt always do things in order
    this.setState({webLogin: event.target.value});
  }
  handleSubmit(event){
    alert('A name was submitted: ' + this.state.webLogin); //to test and see what value was submitted
   
    event.preventDefault();
    axios
      .post('http://localhost:2345/userWebLogin', this.state.webLogin)
      .then((res)=> console.log('Username Passed'))
      .catch(err=>{
        console.error(err);
      });
  }

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
  })
  }

  getNowPlaying() { //can alter this function and make more like it, using diff calls after spotifyWebApi.
    spotifyWebApi.getMyCurrentPlaybackState()
    .then((response)=>{
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
          

        }
      }) 
    })
  }


  getAudioFeatures(){
    spotifyWebApi.getAudioFeaturesForTracks()
    .then((response)=>{
      this.setState({ 
        audioFeatures:{
          danceability: response.audio_features //we are having trouble w dis

        }
      }) 
    })
  }

  
  

    //in here for checking state in if statements, need to declare shared state in parent component (i think we already do this in the constructor)
 // state is considered to be private to the component that defines it
    //use onClick for user to click when they want to view top artist, genres, compare w other users
    //how to communicate parent and child, alter things with different states

  render(){ 


    return (  



    <div className="App">
      <ThreeDotsWave></ThreeDotsWave>
      <div id='OURwebpageLogin'>
        Enter your spotify username (note that this should NOT be your email)
      <form onSubmit={this.handleSubmit}> 
          <label>
            Username:
            <input type="text" value={this.state.webLogin}  onChange={this.handleChange}/> 
            {/* target is the input that triggered this function. for diff forms would have dif handleChange functions, handleCHange1, etc */}
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
      {/* pass form data to back-end,  */}


      {/* take form data wrap in form request to back end, back end verify 
      rather than directly modifying state, 
      pass to backend, backend pass to front end
      user hits login. 
      
      store data in database in back end */}

      {/* //use conditional rendering
      //how to change eveythng on site, look at react.js.com
      //app component is whole page
      // one state component could be the view we're loking at
      // can have state initially set to log in, so for render we can have if statements to control what is displayed on front end
      //ie if(this.state=)
      //change page by changing diff state variables */}

      <div id='routToSpotify'>
        
        <a href='http://localhost:3456'>
        <button>Login with Spotify</button>
        </a>
      </div>

      <div>
        <p> This is a test </p>
      <Grid>
      <threeDotsWave />
      </Grid>
      </div>

     
      <div> Welcome, {this.state.basicUserInfo.username} </div>
      <div>
        <img src={this.state.basicUserInfo.image} style={{width: 100}}/>
      </div>
      <button onClick={() => this.getBasicUserInfo()}>
        Show Me Me!
      </button> 


    
    <div>Now Playing: {this.state.nowPlaying.name}</div>
      <div>
        <img src={this.state.nowPlaying.image} style={{width: 100}}/>
      </div>
      <button onClick={() => this.getNowPlaying()}>
        Check Now Playing 
      </button> 
    
      <div id= '12SavedTracks'>First saved Track: {this.state.savedTracks.nameTrack1}</div>
      {/* <div>Second saved Track: {this.state.savedTracks.nameTrack2}</div> */}
      <div id='butSavedTracks'>
        <button onClick={() => this.getSavedTracks()}>
          See first saved track!
        </button> 
      </div>

      <div id = 'UsersTopArtists'> Your Top Artists:  </div>
      <div id = 'UsersTopArtists1'> 1: {this.state.nameTopArtist.topArtist1}</div>
      <div id = 'UsersTopArtists1'> 2: {this.state.nameTopArtist.topArtist2}</div>
      <div id = 'UsersTopArtists1'> 3: {this.state.nameTopArtist.topArtist3}</div>
      <div id = 'UsersTopArtists1'> 4: {this.state.nameTopArtist.topArtist4}</div>
      <div id = 'UsersTopArtists1'> 5: {this.state.nameTopArtist.topArtist5}</div>
      <div id='butTopArtists'>
        <button onClick={() => this.getTopArtists()}>
          See your top artists!
        </button> 

        <div id = 'UsersTopTracks'> Your Top Tracks:  </div>
      <div id = 'UsersTopTracks1'> 1: {this.state.nameTopTracks.topTrack1} </div>
      <div id = 'UsersTopTracks2'> 2: {this.state.nameTopTracks.topTrack2} </div>
      <div id = 'UsersTopTracks3'> 3: {this.state.nameTopTracks.topTrack3} </div>
      <div id = 'UsersTopTracks4'> 4: {this.state.nameTopTracks.topTrack4} </div>
      <div id = 'UsersTopTracks5'> 5: {this.state.nameTopTracks.topTrack5} </div>
      <div id='butTopTracks'>
        <button onClick={() => this.getTopTracks()}>
          See your top tracks!
        </button> 
      </div>

        <div id = 'UsersAudioFeaturesForTracks'> Your Audio Features: {this.state.audioFeatures.danceability} </div>
      <div id='butAudioFeaturesForTracks'>
        <button onClick={() => this.getAudioFeatures()}>
          See your audio features!
        </button> 
      </div>


  

      </div>

      </div>
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

export default App;

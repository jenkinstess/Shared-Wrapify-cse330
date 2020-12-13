//import logo from './logo.svg';
import React,{Component} from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
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
    //store state.weblogin in database here
    // db_spotifyShared.run('INSERT INTO user_info(username) VALUES(?)', [this.state.webLogin], function(err){
    //   if(err){
    //     return console.log(err.message);
    //   }
    //   console.log(`A row has been inserted with rowid ${this.lastID}`);
    // });
    event.preventDefault();
    axios
      .post('http://localhost:2345/userWebLogin', this.state.webLogin)
      .then(()=> console.log('Username Passed'))
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

// function App() {
   
//   // function constructor(){
//   //   //super();
//   //   const params= this.getHashParams(); //gives obj that has access and refresh tokens
//   //   this.state={
//   //     loggedIn: params.access_token ? true : false, //checks if access token is set or not to see if logged in 
//   //     nowPlaying:{
//   //       name: 'Not Checked',
//   //       image: ''
//   //     }
//   //   }
//   // }
//   // function getHashParams() {
//   //   var hashParams = {};
//   //   var e, r = /([^&;=]+)=?([^&;]*)/g,
//   //       q = window.location.hash.substring(1);
//   //   while ( e = r.exec(q)) {
//   //      hashParams[e[1]] = decodeURIComponent(e[2]);
//   //   }
//   //   return hashParams;
//   // }
//   return (
//     <div className="App">
//       <a href='http://localhost:3456'>
//       <button>Login with Spotify</button>
//       </a>
//     </div>
//   );
// }

//closes database
// db_spotifyShared.close((err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });

export default App;

/*
{
  "href": "https://api.spotify.com/v1/me/tracks?offset=5&limit=10&market=ES",
  "items": [
    { //start here
      "added_at": "2017-04-17T00:56:22Z",
      "track": {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/2GDNbg4B7fHn1PqHlEdtd1"
              },
              "href": "https://api.spotify.com/v1/artists/2GDNbg4B7fHn1PqHlEdtd1",
              "id": "2GDNbg4B7fHn1PqHlEdtd1",
              "name": "Janet Devlin",
              "type": "artist",
              "uri": "spotify:artist:2GDNbg4B7fHn1PqHlEdtd1"
            }
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/6OXBz5gtawKmj7LAswmBco"
          },
          "href": "https://api.spotify.com/v1/albums/6OXBz5gtawKmj7LAswmBco",
          "id": "6OXBz5gtawKmj7LAswmBco",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/ab67616d0000b2735cd1937185d4f7b10649d73b",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/ab67616d00001e025cd1937185d4f7b10649d73b",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/ab67616d000048515cd1937185d4f7b10649d73b",
              "width": 64
            }
          ],
          "name": "Running With Scissors",
          "release_date": "2014-06-09",
          "release_date_precision": "day",
          "total_tracks": 10,
          "type": "album",
          "uri": "spotify:album:6OXBz5gtawKmj7LAswmBco"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/2GDNbg4B7fHn1PqHlEdtd1"
            },
            "href": "https://api.spotify.com/v1/artists/2GDNbg4B7fHn1PqHlEdtd1",
            "id": "2GDNbg4B7fHn1PqHlEdtd1",
            "name": "Janet Devlin",
            "type": "artist",
            "uri": "spotify:artist:2GDNbg4B7fHn1PqHlEdtd1"
          }
        ],
        "available_markets": [],
        "disc_number": 1,
        "duration_ms": 187160,
        "explicit": false,
        "external_ids": {
          "isrc": "GBW4C1400013"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/7sLr8Sa70V3mni9kndPugq"
        },
        "href": "https://api.spotify.com/v1/tracks/7sLr8Sa70V3mni9kndPugq",
        "id": "7sLr8Sa70V3mni9kndPugq",
        "is_local": false,
        "is_playable": true,
        "linked_from": {
          "external_urls": {
            "spotify": "https://open.spotify.com/track/43mw4CXpyENxJ1iv6Znfzs"
          },
          "href": "https://api.spotify.com/v1/tracks/43mw4CXpyENxJ1iv6Znfzs",
          "id": "43mw4CXpyENxJ1iv6Znfzs",
          "type": "track",
          "uri": "spotify:track:43mw4CXpyENxJ1iv6Znfzs"
        },
        "name": "Friday I'm In Love", //get value here
        "popularity": 46,
        "preview_url": "https://p.scdn.co/mp3-preview/bb07eb11fcf2e454b73a682dc12f06c487437ee0?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 8,
        "type": "track",
        "uri": "spotify:track:7sLr8Sa70V3mni9kndPugq"
      }
    }, //end here
    {
      "added_at": "2017-04-17T00:48:46Z",
      "track": {
        "album": {
          "album_type": "single",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/0MeLMJJcouYXCymQSHPn8g"
              },
              "href": "https://api.spotify.com/v1/artists/0MeLMJJcouYXCymQSHPn8g",
              "id": "0MeLMJJcouYXCymQSHPn8g",
              "name": "Sleeping At Last",
              "type": "artist",
              "uri": "spotify:artist:0MeLMJJcouYXCymQSHPn8g"
            }
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/09dM9UZeA5l3Hyd5cGe6Td"
          },
          "href": "https://api.spotify.com/v1/albums/09dM9UZeA5l3Hyd5cGe6Td",
          "id": "09dM9UZeA5l3Hyd5cGe6Td",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/ab67616d0000b273fddfa3c4fb3530903a69c8ff",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/ab67616d00001e02fddfa3c4fb3530903a69c8ff",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/ab67616d00004851fddfa3c4fb3530903a69c8ff",
              "width": 64
            }
          ],
          "name": "Chasing Cars",
          "release_date": "2015-04-23",
          "release_date_precision": "day",
          "total_tracks": 1,
          "type": "album",
          "uri": "spotify:album:09dM9UZeA5l3Hyd5cGe6Td"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/0MeLMJJcouYXCymQSHPn8g"
            },
            "href": "https://api.spotify.com/v1/artists/0MeLMJJcouYXCymQSHPn8g",
            "id": "0MeLMJJcouYXCymQSHPn8g",
            "name": "Sleeping At Last",
            "type": "artist",
            "uri": "spotify:artist:0MeLMJJcouYXCymQSHPn8g"
          }
        ],
        "available_markets": [],
        "disc_number": 1,
        "duration_ms": 240426,
        "explicit": false,
        "external_ids": {
          "isrc": "USGES1530001"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/2EDYchd8hhwAOWKGQxJoro"
        },
        "href": "https://api.spotify.com/v1/tracks/2EDYchd8hhwAOWKGQxJoro",
        "id": "2EDYchd8hhwAOWKGQxJoro",
        "is_local": false,
        "is_playable": true,
        "name": "Chasing Cars",
        "popularity": 58,
        "preview_url": "https://p.scdn.co/mp3-preview/b4fcb28b35885c84cd9929a1ade05c5ba04422dc?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 1,
        "type": "track",
        "uri": "spotify:track:2EDYchd8hhwAOWKGQxJoro"
      }
    },
    {
      "added_at": "2016-10-31T19:50:11Z",
      "track": {
        "album": {
          "album_type": "single",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/72luDUYRlE8N8lPSgyhiwo"
              },
              "href": "https://api.spotify.com/v1/artists/72luDUYRlE8N8lPSgyhiwo",
              "id": "72luDUYRlE8N8lPSgyhiwo",
              "name": "John Gibbons",
              "type": "artist",
              "uri": "spotify:artist:72luDUYRlE8N8lPSgyhiwo"
            }
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/6tHarvRIGXudUdkcQcf3NE"
          },
          "href": "https://api.spotify.com/v1/albums/6tHarvRIGXudUdkcQcf3NE",
          "id": "6tHarvRIGXudUdkcQcf3NE",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/ab67616d0000b2739652d1d927f52fd6d1bfb40f",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/ab67616d00001e029652d1d927f52fd6d1bfb40f",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/ab67616d000048519652d1d927f52fd6d1bfb40f",
              "width": 64
            }
          ],
          "name": "Would I Lie to You",
          "release_date": "2016-08-12",
          "release_date_precision": "day",
          "total_tracks": 1,
          "type": "album",
          "uri": "spotify:album:6tHarvRIGXudUdkcQcf3NE"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/72luDUYRlE8N8lPSgyhiwo"
            },
            "href": "https://api.spotify.com/v1/artists/72luDUYRlE8N8lPSgyhiwo",
            "id": "72luDUYRlE8N8lPSgyhiwo",
            "name": "John Gibbons",
            "type": "artist",
            "uri": "spotify:artist:72luDUYRlE8N8lPSgyhiwo"
          }
        ],
        "available_markets": [],
        "disc_number": 1,
        "duration_ms": 200462,
        "explicit": false,
        "external_ids": {
          "isrc": "UK8E21600401"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/6Zp0OnaLtS9AjtK1jeC930"
        },
        "href": "https://api.spotify.com/v1/tracks/6Zp0OnaLtS9AjtK1jeC930",
        "id": "6Zp0OnaLtS9AjtK1jeC930",
        "is_local": false,
        "is_playable": true,
        "linked_from": {
          "external_urls": {
            "spotify": "https://open.spotify.com/track/4karzvPZYOqGprojUT3imC"
          },
          "href": "https://api.spotify.com/v1/tracks/4karzvPZYOqGprojUT3imC",
          "id": "4karzvPZYOqGprojUT3imC",
          "type": "track",
          "uri": "spotify:track:4karzvPZYOqGprojUT3imC"
        },
        "name": "Would I Lie to You",
        "popularity": 40,
        "preview_url": "https://p.scdn.co/mp3-preview/96b90398c697f6b79c8afb9daa3dfc8d64e5164a?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 1,
        "type": "track",
        "uri": "spotify:track:6Zp0OnaLtS9AjtK1jeC930"
      }
    },
    {
      "added_at": "2016-10-10T14:37:30Z",
      "track": {
        "album": {
          "album_type": "single",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/26VFTg2z8YR0cCuwLzESi2"
              },
              "href": "https://api.spotify.com/v1/artists/26VFTg2z8YR0cCuwLzESi2",
              "id": "26VFTg2z8YR0cCuwLzESi2",
              "name": "Halsey",
              "type": "artist",
              "uri": "spotify:artist:26VFTg2z8YR0cCuwLzESi2"
            }
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/6XMQpJUwiG6KAniW9nziXt"
          },
          "href": "https://api.spotify.com/v1/albums/6XMQpJUwiG6KAniW9nziXt",
          "id": "6XMQpJUwiG6KAniW9nziXt",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/ab67616d0000b273d044ae5b8e91f4e69e20b1a7",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/ab67616d00001e02d044ae5b8e91f4e69e20b1a7",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/ab67616d00004851d044ae5b8e91f4e69e20b1a7",
              "width": 64
            }
          ],
          "name": "Room 93: The Remixes",
          "release_date": "2015-03-03",
          "release_date_precision": "day",
          "total_tracks": 3,
          "type": "album",
          "uri": "spotify:album:6XMQpJUwiG6KAniW9nziXt"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/26VFTg2z8YR0cCuwLzESi2"
            },
            "href": "https://api.spotify.com/v1/artists/26VFTg2z8YR0cCuwLzESi2",
            "id": "26VFTg2z8YR0cCuwLzESi2",
            "name": "Halsey",
            "type": "artist",
            "uri": "spotify:artist:26VFTg2z8YR0cCuwLzESi2"
          },
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/1rSGNXhhYuWoq9BEz5DZGO"
            },
            "href": "https://api.spotify.com/v1/artists/1rSGNXhhYuWoq9BEz5DZGO",
            "id": "1rSGNXhhYuWoq9BEz5DZGO",
            "name": "ARTY",
            "type": "artist",
            "uri": "spotify:artist:1rSGNXhhYuWoq9BEz5DZGO"
          }
        ],
        "available_markets": [],
        "disc_number": 1,
        "duration_ms": 224520,
        "explicit": false,
        "external_ids": {
          "isrc": "USUM71502002"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/65n4DkUhKUO4tECIabKwy1"
        },
        "href": "https://api.spotify.com/v1/tracks/65n4DkUhKUO4tECIabKwy1",
        "id": "65n4DkUhKUO4tECIabKwy1",
        "is_local": false,
        "is_playable": true,
        "name": "Hurricane - Arty Remix",
        "popularity": 57,
        "preview_url": "https://p.scdn.co/mp3-preview/35bf726a9366e5a12b2e09dbff9d91f1e7948a60?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 1,
        "type": "track",
        "uri": "spotify:track:65n4DkUhKUO4tECIabKwy1"
      }
    },
    {
      "added_at": "2016-10-10T14:36:24Z",
      "track": {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/26VFTg2z8YR0cCuwLzESi2"
              },
              "href": "https://api.spotify.com/v1/artists/26VFTg2z8YR0cCuwLzESi2",
              "id": "26VFTg2z8YR0cCuwLzESi2",
              "name": "Halsey",
              "type": "artist",
              "uri": "spotify:artist:26VFTg2z8YR0cCuwLzESi2"
            }
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/5OZJflQcQCdZLQjtUudCin"
          },
          "href": "https://api.spotify.com/v1/albums/5OZJflQcQCdZLQjtUudCin",
          "id": "5OZJflQcQCdZLQjtUudCin",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/ab67616d0000b27374fefed78db6d6cf4d963fdc",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/ab67616d00001e0274fefed78db6d6cf4d963fdc",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/ab67616d0000485174fefed78db6d6cf4d963fdc",
              "width": 64
            }
          ],
          "name": "BADLANDS (Deluxe)",
          "release_date": "2015-08-28",
          "release_date_precision": "day",
          "total_tracks": 16,
          "type": "album",
          "uri": "spotify:album:5OZJflQcQCdZLQjtUudCin"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/26VFTg2z8YR0cCuwLzESi2"
            },
            "href": "https://api.spotify.com/v1/artists/26VFTg2z8YR0cCuwLzESi2",
            "id": "26VFTg2z8YR0cCuwLzESi2",
            "name": "Halsey",
            "type": "artist",
            "uri": "spotify:artist:26VFTg2z8YR0cCuwLzESi2"
          }
        ],
        "available_markets": [],
        "disc_number": 1,
        "duration_ms": 223081,
        "explicit": false,
        "external_ids": {
          "isrc": "USUM71415016"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/5Dg2h1wsm7ZijCo0yLmbvR"
        },
        "href": "https://api.spotify.com/v1/tracks/5Dg2h1wsm7ZijCo0yLmbvR",
        "id": "5Dg2h1wsm7ZijCo0yLmbvR",
        "is_local": false,
        "is_playable": true,
        "name": "Hurricane",
        "popularity": 61,
        "preview_url": "https://p.scdn.co/mp3-preview/1f50bf7ed55a0a820f88eb90ee994dbcac428d7a?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 5,
        "type": "track",
        "uri": "spotify:track:5Dg2h1wsm7ZijCo0yLmbvR"
      }
    },
    {
      "added_at": "2016-10-09T19:29:02Z",
      "track": {
        "album": {
          "album_type": "single",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/0HjYETXAvcL6mzaKjAmH2K"
              },
              "href": "https://api.spotify.com/v1/artists/0HjYETXAvcL6mzaKjAmH2K",
              "id": "0HjYETXAvcL6mzaKjAmH2K",
              "name": "Wes Walker",
              "type": "artist",
              "uri": "spotify:artist:0HjYETXAvcL6mzaKjAmH2K"
            },
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1dfpwerOGBId6qD7LVwpoB"
              },
              "href": "https://api.spotify.com/v1/artists/1dfpwerOGBId6qD7LVwpoB",
              "id": "1dfpwerOGBId6qD7LVwpoB",
              "name": "Dyl",
              "type": "artist",
              "uri": "spotify:artist:1dfpwerOGBId6qD7LVwpoB"
            }
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/4G2vHAnHSkuzj1VVBJrRbF"
          },
          "href": "https://api.spotify.com/v1/albums/4G2vHAnHSkuzj1VVBJrRbF",
          "id": "4G2vHAnHSkuzj1VVBJrRbF",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/ab67616d0000b27316d9cd79b60c6062036bfadc",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/ab67616d00001e0216d9cd79b60c6062036bfadc",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/ab67616d0000485116d9cd79b60c6062036bfadc",
              "width": 64
            }
          ],
          "name": "Jordan Belfort",
          "release_date": "2015-08-26",
          "release_date_precision": "day",
          "total_tracks": 1,
          "type": "album",
          "uri": "spotify:album:4G2vHAnHSkuzj1VVBJrRbF"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/0HjYETXAvcL6mzaKjAmH2K"
            },
            "href": "https://api.spotify.com/v1/artists/0HjYETXAvcL6mzaKjAmH2K",
            "id": "0HjYETXAvcL6mzaKjAmH2K",
            "name": "Wes Walker",
            "type": "artist",
            "uri": "spotify:artist:0HjYETXAvcL6mzaKjAmH2K"
          },
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/1dfpwerOGBId6qD7LVwpoB"
            },
            "href": "https://api.spotify.com/v1/artists/1dfpwerOGBId6qD7LVwpoB",
            "id": "1dfpwerOGBId6qD7LVwpoB",
            "name": "Dyl",
            "type": "artist",
            "uri": "spotify:artist:1dfpwerOGBId6qD7LVwpoB"
          }
        ],
        "available_markets": [],
        "disc_number": 1,
        "duration_ms": 207911,
        "explicit": true,
        "external_ids": {
          "isrc": "USAT21502771"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/6qMXubogFdMrvVMJwqATzd"
        },
        "href": "https://api.spotify.com/v1/tracks/6qMXubogFdMrvVMJwqATzd",
        "id": "6qMXubogFdMrvVMJwqATzd",
        "is_local": false,
        "is_playable": true,
        "name": "Jordan Belfort",
        "popularity": 66,
        "preview_url": "https://p.scdn.co/mp3-preview/c6bd6249628d591e145fadb27703495f5a26eb4f?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 1,
        "type": "track",
        "uri": "spotify:track:6qMXubogFdMrvVMJwqATzd"
      }
    },
    {
      "added_at": "2016-10-09T19:26:11Z",
      "track": {
        "album": {
          "album_type": "single",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/0bdfiayQAKewqEvaU6rXCv"
              },
              "href": "https://api.spotify.com/v1/artists/0bdfiayQAKewqEvaU6rXCv",
              "id": "0bdfiayQAKewqEvaU6rXCv",
              "name": "MØ",
              "type": "artist",
              "uri": "spotify:artist:0bdfiayQAKewqEvaU6rXCv"
            }
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/2gcqSlK5xTxcpuLZ1iik3Z"
          },
          "href": "https://api.spotify.com/v1/albums/2gcqSlK5xTxcpuLZ1iik3Z",
          "id": "2gcqSlK5xTxcpuLZ1iik3Z",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/ab67616d0000b273b7a02217229178b771ed0d4c",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/ab67616d00001e02b7a02217229178b771ed0d4c",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/ab67616d00004851b7a02217229178b771ed0d4c",
              "width": 64
            }
          ],
          "name": "Final Song",
          "release_date": "2016-05-13",
          "release_date_precision": "day",
          "total_tracks": 1,
          "type": "album",
          "uri": "spotify:album:2gcqSlK5xTxcpuLZ1iik3Z"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/0bdfiayQAKewqEvaU6rXCv"
            },
            "href": "https://api.spotify.com/v1/artists/0bdfiayQAKewqEvaU6rXCv",
            "id": "0bdfiayQAKewqEvaU6rXCv",
            "name": "MØ",
            "type": "artist",
            "uri": "spotify:artist:0bdfiayQAKewqEvaU6rXCv"
          }
        ],
        "available_markets": [],
        "disc_number": 1,
        "duration_ms": 235826,
        "explicit": false,
        "external_ids": {
          "isrc": "GBARL1600463"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/4qqArAiTPueDxIp7cf87h7"
        },
        "href": "https://api.spotify.com/v1/tracks/4qqArAiTPueDxIp7cf87h7",
        "id": "4qqArAiTPueDxIp7cf87h7",
        "is_local": false,
        "is_playable": true,
        "name": "Final Song",
        "popularity": 68,
        "preview_url": "https://p.scdn.co/mp3-preview/148f0781d2f66f3f2252fbf18cd8b46f90a34763?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 1,
        "type": "track",
        "uri": "spotify:track:4qqArAiTPueDxIp7cf87h7"
      }
    },
    {
      "added_at": "2016-10-09T19:17:18Z",
      "track": {
        "album": {
          "album_type": "single",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/4IWBUUAFIplrNtaOHcJPRM"
              },
              "href": "https://api.spotify.com/v1/artists/4IWBUUAFIplrNtaOHcJPRM",
              "id": "4IWBUUAFIplrNtaOHcJPRM",
              "name": "James Arthur",
              "type": "artist",
              "uri": "spotify:artist:4IWBUUAFIplrNtaOHcJPRM"
            }
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/0BL67dR6x0CPU7B7J9P8qC"
          },
          "href": "https://api.spotify.com/v1/albums/0BL67dR6x0CPU7B7J9P8qC",
          "id": "0BL67dR6x0CPU7B7J9P8qC",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/ab67616d0000b2731de3cbdb04e475e61acbc33d",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/ab67616d00001e021de3cbdb04e475e61acbc33d",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/ab67616d000048511de3cbdb04e475e61acbc33d",
              "width": 64
            }
          ],
          "name": "Say You Won't Let Go",
          "release_date": "2016-09-09",
          "release_date_precision": "day",
          "total_tracks": 1,
          "type": "album",
          "uri": "spotify:album:0BL67dR6x0CPU7B7J9P8qC"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4IWBUUAFIplrNtaOHcJPRM"
            },
            "href": "https://api.spotify.com/v1/artists/4IWBUUAFIplrNtaOHcJPRM",
            "id": "4IWBUUAFIplrNtaOHcJPRM",
            "name": "James Arthur",
            "type": "artist",
            "uri": "spotify:artist:4IWBUUAFIplrNtaOHcJPRM"
          }
        ],
        "available_markets": [],
        "disc_number": 1,
        "duration_ms": 211240,
        "explicit": false,
        "external_ids": {
          "isrc": "DEE861600586"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/1Pw5C4N6Fn5E4mGCxmbbVa"
        },
        "href": "https://api.spotify.com/v1/tracks/1Pw5C4N6Fn5E4mGCxmbbVa",
        "id": "1Pw5C4N6Fn5E4mGCxmbbVa",
        "is_local": false,
        "is_playable": true,
        "name": "Say You Won't Let Go",
        "popularity": 73,
        "preview_url": "https://p.scdn.co/mp3-preview/b079cbca31f049a450a35a329259f44244443043?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 1,
        "type": "track",
        "uri": "spotify:track:1Pw5C4N6Fn5E4mGCxmbbVa"
      }
    },
    {
      "added_at": "2016-10-09T17:19:23Z",
      "track": {
        "album": {
          "album_type": "single",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/7xEFii6utZmQ61kX59HmLH"
              },
              "href": "https://api.spotify.com/v1/artists/7xEFii6utZmQ61kX59HmLH",
              "id": "7xEFii6utZmQ61kX59HmLH",
              "name": "FRENSHIP",
              "type": "artist",
              "uri": "spotify:artist:7xEFii6utZmQ61kX59HmLH"
            }
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/5qeKpDQFyotJjLh61pUZQo"
          },
          "href": "https://api.spotify.com/v1/albums/5qeKpDQFyotJjLh61pUZQo",
          "id": "5qeKpDQFyotJjLh61pUZQo",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/ab67616d0000b273670048174db73ef55039c7bf",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/ab67616d00001e02670048174db73ef55039c7bf",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/ab67616d00004851670048174db73ef55039c7bf",
              "width": 64
            }
          ],
          "name": "Truce - EP",
          "release_date": "2016-09-02",
          "release_date_precision": "day",
          "total_tracks": 5,
          "type": "album",
          "uri": "spotify:album:5qeKpDQFyotJjLh61pUZQo"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/7xEFii6utZmQ61kX59HmLH"
            },
            "href": "https://api.spotify.com/v1/artists/7xEFii6utZmQ61kX59HmLH",
            "id": "7xEFii6utZmQ61kX59HmLH",
            "name": "FRENSHIP",
            "type": "artist",
            "uri": "spotify:artist:7xEFii6utZmQ61kX59HmLH"
          }
        ],
        "available_markets": [],
        "disc_number": 1,
        "duration_ms": 240293,
        "explicit": false,
        "external_ids": {
          "isrc": "USSM11605357"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/2mb32CDk3XusDc87vjeAoG"
        },
        "href": "https://api.spotify.com/v1/tracks/2mb32CDk3XusDc87vjeAoG",
        "id": "2mb32CDk3XusDc87vjeAoG",
        "is_local": false,
        "is_playable": true,
        "name": "1000 Nights",
        "popularity": 40,
        "preview_url": "https://p.scdn.co/mp3-preview/731e9fab29b741b145aa5c45ca18953e977181aa?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 4,
        "type": "track",
        "uri": "spotify:track:2mb32CDk3XusDc87vjeAoG"
      }
    },
    {
      "added_at": "2016-10-09T16:44:02Z",
      "track": {
        "album": {
          "album_type": "single",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/69GGBxA162lTqCwzJG5jLp"
              },
              "href": "https://api.spotify.com/v1/artists/69GGBxA162lTqCwzJG5jLp",
              "id": "69GGBxA162lTqCwzJG5jLp",
              "name": "The Chainsmokers",
              "type": "artist",
              "uri": "spotify:artist:69GGBxA162lTqCwzJG5jLp"
            }
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/0xmaV6EtJ4M3ebZUPRnhyb"
          },
          "href": "https://api.spotify.com/v1/albums/0xmaV6EtJ4M3ebZUPRnhyb",
          "id": "0xmaV6EtJ4M3ebZUPRnhyb",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/ab67616d0000b273ff8d8c5662a96d41433e9ee1",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/ab67616d00001e02ff8d8c5662a96d41433e9ee1",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/ab67616d00004851ff8d8c5662a96d41433e9ee1",
              "width": 64
            }
          ],
          "name": "All We Know",
          "release_date": "2016-09-29",
          "release_date_precision": "day",
          "total_tracks": 1,
          "type": "album",
          "uri": "spotify:album:0xmaV6EtJ4M3ebZUPRnhyb"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/69GGBxA162lTqCwzJG5jLp"
            },
            "href": "https://api.spotify.com/v1/artists/69GGBxA162lTqCwzJG5jLp",
            "id": "69GGBxA162lTqCwzJG5jLp",
            "name": "The Chainsmokers",
            "type": "artist",
            "uri": "spotify:artist:69GGBxA162lTqCwzJG5jLp"
          },
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4N874uPqBka1QiCvnCVOtr"
            },
            "href": "https://api.spotify.com/v1/artists/4N874uPqBka1QiCvnCVOtr",
            "id": "4N874uPqBka1QiCvnCVOtr",
            "name": "Phoebe Ryan",
            "type": "artist",
            "uri": "spotify:artist:4N874uPqBka1QiCvnCVOtr"
          }
        ],
        "available_markets": [],
        "disc_number": 1,
        "duration_ms": 194080,
        "explicit": false,
        "external_ids": {
          "isrc": "USQX91602153"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/2rizacJSyD9S1IQUxUxnsK"
        },
        "href": "https://api.spotify.com/v1/tracks/2rizacJSyD9S1IQUxUxnsK",
        "id": "2rizacJSyD9S1IQUxUxnsK",
        "is_local": false,
        "is_playable": true,
        "name": "All We Know",
        "popularity": 69,
        "preview_url": "https://p.scdn.co/mp3-preview/179c414697a1599fbda0e8a1ba8c3f8764adeb34?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 1,
        "type": "track",
        "uri": "spotify:track:2rizacJSyD9S1IQUxUxnsK"
      }
    }
  ],
  "limit": 10,
  "next": "https://api.spotify.com/v1/me/tracks?offset=15&limit=10&market=ES",
  "offset": 5,
  "previous": "https://api.spotify.com/v1/me/tracks?offset=0&limit=10&market=ES",
  "total": 38
}
*/






//Tess data from top-artists
/*
{
  "items": [
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/0xPoVNPnxIIUS1vrxAYV00"
      },
      "followers": {
        "href": null,
        "total": 31215
      },
      "genres": [
        "deep new americana",
        "indie pop"
      ],
      "href": "https://api.spotify.com/v1/artists/0xPoVNPnxIIUS1vrxAYV00",
      "id": "0xPoVNPnxIIUS1vrxAYV00",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/6ba828052e83bd68d0dc0a49445865e0a9647318",
          "width": 640
        },
        {
          "height": 320,
          "url": "https://i.scdn.co/image/b660e7f7860921af4055056272d37a7f17d8b8c5",
          "width": 320
        },
        {
          "height": 160,
          "url": "https://i.scdn.co/image/f519e33a63522646b968cbc08291dfc6749e9f35",
          "width": 160
        }
      ],
      "name": "Del Water Gap",
      "popularity": 52,
      "type": "artist",
      "uri": "spotify:artist:0xPoVNPnxIIUS1vrxAYV00"
    },
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/0wyMPXGfOuQzNR54ujR9Ix"
      },
      "followers": {
        "href": null,
        "total": 206678
      },
      "genres": [
        "indie folk",
        "new americana",
        "stomp and holler"
      ],
      "href": "https://api.spotify.com/v1/artists/0wyMPXGfOuQzNR54ujR9Ix",
      "id": "0wyMPXGfOuQzNR54ujR9Ix",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/70d6ff0739947e15624c0c47f2f033076a538768",
          "width": 640
        },
        {
          "height": 320,
          "url": "https://i.scdn.co/image/9df23e4976b9fdcb7980a63ac373281743c702a5",
          "width": 320
        },
        {
          "height": 160,
          "url": "https://i.scdn.co/image/36ac401af5742a44ad7568bc339371e9681a22c5",
          "width": 160
        }
      ],
      "name": "Caamp",
      "popularity": 68,
      "type": "artist",
      "uri": "spotify:artist:0wyMPXGfOuQzNR54ujR9Ix"
    },
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/6V70yeZQCoSR2M3fyW8qiA"
      },
      "followers": {
        "href": null,
        "total": 47467
      },
      "genres": [
        "australian garage punk",
        "australian indie",
        "australian indie rock",
        "fremantle indie",
        "perth indie"
      ],
      "href": "https://api.spotify.com/v1/artists/6V70yeZQCoSR2M3fyW8qiA",
      "id": "6V70yeZQCoSR2M3fyW8qiA",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/bece5d93eea185306e140425b1d9a231f372e808",
          "width": 640
        },
        {
          "height": 320,
          "url": "https://i.scdn.co/image/6b059e360843bc0bd0eef4f793a40c56d4d57eda",
          "width": 320
        },
        {
          "height": 160,
          "url": "https://i.scdn.co/image/2c006ebd7e91fbfa7f406e8e4291ba6732611761",
          "width": 160
        }
      ],
      "name": "Spacey Jane",
      "popularity": 59,
      "type": "artist",
      "uri": "spotify:artist:6V70yeZQCoSR2M3fyW8qiA"
    },
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/1fZpYWNWdL5Z3wrDtISFUH"
      },
      "followers": {
        "href": null,
        "total": 372921
      },
      "genres": [
        "austin americana",
        "austindie",
        "deep new americana",
        "indie folk",
        "indie rock",
        "new americana",
        "stomp and holler"
      ],
      "href": "https://api.spotify.com/v1/artists/1fZpYWNWdL5Z3wrDtISFUH",
      "id": "1fZpYWNWdL5Z3wrDtISFUH",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/cb4b25f8163032a4465a5ab23bf903101ff127a3",
          "width": 640
        },
        {
          "height": 320,
          "url": "https://i.scdn.co/image/a5d1e6d0bfe182488a0d85d712a1082d78917f50",
          "width": 320
        },
        {
          "height": 160,
          "url": "https://i.scdn.co/image/bf57ea7387428947366160ce6bd27cbca191aa7b",
          "width": 160
        }
      ],
      "name": "Shakey Graves",
      "popularity": 63,
      "type": "artist",
      "uri": "spotify:artist:1fZpYWNWdL5Z3wrDtISFUH"
    },
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/4hz8tIajF2INpgM0qzPJz2"
      },
      "followers": {
        "href": null,
        "total": 440486
      },
      "genres": [
        "indie folk",
        "indie rock",
        "modern alternative rock",
        "modern rock",
        "stomp and holler"
      ],
      "href": "https://api.spotify.com/v1/artists/4hz8tIajF2INpgM0qzPJz2",
      "id": "4hz8tIajF2INpgM0qzPJz2",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/9a9c0097d453de54c0a08ed21f3b72be68a1dd17",
          "width": 640
        },
        {
          "height": 320,
          "url": "https://i.scdn.co/image/33156b475081df5f70d2656d121ef0da46b4fc96",
          "width": 320
        },
        {
          "height": 160,
          "url": "https://i.scdn.co/image/80c901c5c93a2b3c88b50fe626a9e21daae81fb2",
          "width": 160
        }
      ],
      "name": "Rainbow Kitten Surprise",
      "popularity": 68,
      "type": "artist",
      "uri": "spotify:artist:4hz8tIajF2INpgM0qzPJz2"
    },
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/69tiO1fG8VWduDl3ji2qhI"
      },
      "followers": {
        "href": null,
        "total": 187130
      },
      "genres": [
        "indie folk",
        "indie rock",
        "modern rock",
        "stomp and holler"
      ],
      "href": "https://api.spotify.com/v1/artists/69tiO1fG8VWduDl3ji2qhI",
      "id": "69tiO1fG8VWduDl3ji2qhI",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/b5a08288ed05813d0bffabb6f3704e5d9272dc13",
          "width": 640
        },
        {
          "height": 320,
          "url": "https://i.scdn.co/image/cdcfc64f6cc00328829e1de52108fa9ad0f22db5",
          "width": 320
        },
        {
          "height": 160,
          "url": "https://i.scdn.co/image/4b9ddd1a3da46dfea0dc8a1c4548efd9a42366e6",
          "width": 160
        }
      ],
      "name": "Mt. Joy",
      "popularity": 67,
      "type": "artist",
      "uri": "spotify:artist:69tiO1fG8VWduDl3ji2qhI"
    },
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/7pbDxGE6nQSZVfiFdq9lOL"
      },
      "followers": {
        "href": null,
        "total": 2574331
      },
      "genres": [
        "bedroom pop",
        "pop"
      ],
      "href": "https://api.spotify.com/v1/artists/7pbDxGE6nQSZVfiFdq9lOL",
      "id": "7pbDxGE6nQSZVfiFdq9lOL",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/ccf08d0daab08ec8bcc76d549d0d62bb6da1ab14",
          "width": 640
        },
        {
          "height": 320,
          "url": "https://i.scdn.co/image/ecda49b90475c4cb452b6a02cec36ba878775fca",
          "width": 320
        },
        {
          "height": 160,
          "url": "https://i.scdn.co/image/321b61bad8f9c7337c59798a8a3c7dcc8b997730",
          "width": 160
        }
      ],
      "name": "Rex Orange County",
      "popularity": 79,
      "type": "artist",
      "uri": "spotify:artist:7pbDxGE6nQSZVfiFdq9lOL"
    },
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/0ZED1XzwlLHW4ZaG4lOT6m"
      },
      "followers": {
        "href": null,
        "total": 3349327
      },
      "genres": [
        "dance pop",
        "electropop",
        "pop",
        "pop dance",
        "post-teen pop"
      ],
      "href": "https://api.spotify.com/v1/artists/0ZED1XzwlLHW4ZaG4lOT6m",
      "id": "0ZED1XzwlLHW4ZaG4lOT6m",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/197f548899c94f33cdf198b2985e9d5e267bb47b",
          "width": 640
        },
        {
          "height": 320,
          "url": "https://i.scdn.co/image/db6ce375523e63787e0c2d9834f2ed9b07a7c1aa",
          "width": 320
        },
        {
          "height": 160,
          "url": "https://i.scdn.co/image/5b87a5a45ccb4d35538207270898f39c7d38116a",
          "width": 160
        }
      ],
      "name": "Julia Michaels",
      "popularity": 81,
      "type": "artist",
      "uri": "spotify:artist:0ZED1XzwlLHW4ZaG4lOT6m"
    },
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/1Tp7C6LzxZe9Mix6rn4zbI"
      },
      "followers": {
        "href": null,
        "total": 39757
      },
      "genres": [
        "deep new americana",
        "indie folk",
        "modern rock",
        "new americana",
        "stomp and holler"
      ],
      "href": "https://api.spotify.com/v1/artists/1Tp7C6LzxZe9Mix6rn4zbI",
      "id": "1Tp7C6LzxZe9Mix6rn4zbI",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/c29a2f772ffe679a3d43d4e3416db0fa54420c60",
          "width": 640
        },
        {
          "height": 320,
          "url": "https://i.scdn.co/image/95966b2c5feca62d3ce1c5e76a4af12275a3ff60",
          "width": 320
        },
        {
          "height": 160,
          "url": "https://i.scdn.co/image/07f38e1afdfb131eaa8160ab55db11e5ded3e53e",
          "width": 160
        }
      ],
      "name": "Wilderado",
      "popularity": 54,
      "type": "artist",
      "uri": "spotify:artist:1Tp7C6LzxZe9Mix6rn4zbI"
    },
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/4iMO20EPodreIaEl8qW66y"
      },
      "followers": {
        "href": null,
        "total": 553082
      },
      "genres": [
        "bedroom pop",
        "modern rock",
        "oakland indie",
        "pop"
      ],
      "href": "https://api.spotify.com/v1/artists/4iMO20EPodreIaEl8qW66y",
      "id": "4iMO20EPodreIaEl8qW66y",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/86c32e84aab6272165902fdb2752ba0f99b26591",
          "width": 640
        },
        {
          "height": 320,
          "url": "https://i.scdn.co/image/0c620e267b50102d46ceaca0f56bfa74caad8788",
          "width": 320
        },
        {
          "height": 160,
          "url": "https://i.scdn.co/image/0378bdcc457bab8d6abae315a547049eeb881061",
          "width": 160
        }
      ],
      "name": "Still Woozy",
      "popularity": 72,
      "type": "artist",
      "uri": "spotify:artist:4iMO20EPodreIaEl8qW66y"
    },
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02"
      },
      "followers": {
        "href": null,
        "total": 34336338
      },
      "genres": [
        "dance pop",
        "pop",
        "pop dance",
        "post-teen pop"
      ],
      "href": "https://api.spotify.com/v1/artists/06HL4z0CvFAxyc27GXpf02",
      "id": "06HL4z0CvFAxyc27GXpf02",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/3c5d5f324e0a7fc40b8dbb4b6cee181ca4434113",
          "width": 640
        },
        {
          "height": 320,
          "url": "https://i.scdn.co/image/63ecd8bdaa7a7e33897f13bcadbdd513dddc3f42",
          "width": 320
        },
        {
          "height": 160,
          "url": "https://i.scdn.co/image/e58d5c80a072d94342dc1c5fab390b22e4f48dcf",
          "width": 160
        }
      ],
      "name": "Taylor Swift",
      "popularity": 93,
      "type": "artist",
      "uri": "spotify:artist:06HL4z0CvFAxyc27GXpf02"
    },
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/0SJxTOELZJa2Cf19TjNEfm"
      },
      "followers": {
        "href": null,
        "total": 16835
      },
      "genres": [
        "australian reggae fusion"
      ],
      "href": "https://api.spotify.com/v1/artists/0SJxTOELZJa2Cf19TjNEfm",
      "id": "0SJxTOELZJa2Cf19TjNEfm",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/876023244e8c9df05d5073597e8a02f1dd4a8255",
          "width": 640
        },
        {
          "height": 320,
          "url": "https://i.scdn.co/image/d01cc5c64d07b4ec318ea4850b2225ea4f77d12b",
          "width": 320
        },
        {
          "height": 160,
          "url": "https://i.scdn.co/image/48de47ccd10fceb890165b523083eb70520ac179",
          "width": 160
        }
      ],
      "name": "Shag Rock",
      "popularity": 49,
      "type": "artist",
      "uri": "spotify:artist:0SJxTOELZJa2Cf19TjNEfm"
    },
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/5zKinanOH8komuiAx6fmvL"
      },
      "followers": {
        "href": null,
        "total": 11335
      },
      "genres": [
        "lo-fi indie"
      ],
      "href": "https://api.spotify.com/v1/artists/5zKinanOH8komuiAx6fmvL",
      "id": "5zKinanOH8komuiAx6fmvL",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/ab67616d0000b273d534c1ab936971ab8434a97f",
          "width": 640
        },
        {
          "height": 300,
          "url": "https://i.scdn.co/image/ab67616d00001e02d534c1ab936971ab8434a97f",
          "width": 300
        },
        {
          "height": 64,
          "url": "https://i.scdn.co/image/ab67616d00004851d534c1ab936971ab8434a97f",
          "width": 64
        }
      ],
      "name": "Bedside Kites",
      "popularity": 46,
      "type": "artist",
      "uri": "spotify:artist:5zKinanOH8komuiAx6fmvL"
    },
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/3hSFS64223jyO9Ck66rLOf"
      },
      "followers": {
        "href": null,
        "total": 23166
      },
      "genres": [
        "indie garage rock",
        "nashville indie"
      ],
      "href": "https://api.spotify.com/v1/artists/3hSFS64223jyO9Ck66rLOf",
      "id": "3hSFS64223jyO9Ck66rLOf",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/2978e23874e060352c56b0ac959e918f489f7175",
          "width": 640
        },
        {
          "height": 320,
          "url": "https://i.scdn.co/image/527cb5c673785a207d538ab9c77d6b2bde7ba82f",
          "width": 320
        },
        {
          "height": 160,
          "url": "https://i.scdn.co/image/0d99ea6a03e4fc5ee31d39bb2eeb69964b0b075f",
          "width": 160
        }
      ],
      "name": "Okey Dokey",
      "popularity": 45,
      "type": "artist",
      "uri": "spotify:artist:3hSFS64223jyO9Ck66rLOf"
    },
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/5wugb0kaq0J6nyQ5Xgd17i"
      },
      "followers": {
        "href": null,
        "total": 418320
      },
      "genres": [
        "dance pop",
        "electropop",
        "girl group",
        "indie poptimism",
        "neo mellow",
        "pop",
        "pop dance",
        "post-teen pop"
      ],
      "href": "https://api.spotify.com/v1/artists/5wugb0kaq0J6nyQ5Xgd17i",
      "id": "5wugb0kaq0J6nyQ5Xgd17i",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/4941710ee29e368a9a4282a941d8151588077251",
          "width": 640
        },
        {
          "height": 320,
          "url": "https://i.scdn.co/image/09e46b72b9a345f7e678d1479f7ae389ff0b170c",
          "width": 320
        },
        {
          "height": 160,
          "url": "https://i.scdn.co/image/eee614d825097790a30176ac94240eea7f4a6d7d",
          "width": 160
        }
      ],
      "name": "Aly & AJ",
      "popularity": 64,
      "type": "artist",
      "uri": "spotify:artist:5wugb0kaq0J6nyQ5Xgd17i"
    },
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/6qGkLCMQkNGOJ079iEcC5k"
      },
      "followers": {
        "href": null,
        "total": 325981
      },
      "genres": [
        "hollywood",
        "show tunes"
      ],
      "href": "https://api.spotify.com/v1/artists/6qGkLCMQkNGOJ079iEcC5k",
      "id": "6qGkLCMQkNGOJ079iEcC5k",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/66e9f9ffa9fc4e6d677b87b786dd943d50fc5aa7",
          "width": 640
        },
        {
          "height": 320,
          "url": "https://i.scdn.co/image/c7cc0a75f02e5168f1174c7ae2c78eeb56ca5cff",
          "width": 320
        },
        {
          "height": 160,
          "url": "https://i.scdn.co/image/85acac0283926e0e386c2ee82b907b6c1b7ce74f",
          "width": 160
        }
      ],
      "name": "Ben Platt",
      "popularity": 71,
      "type": "artist",
      "uri": "spotify:artist:6qGkLCMQkNGOJ079iEcC5k"
    },
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/4xXQxNcBCtsaz6Gw1IblE3"
      },
      "followers": {
        "href": null,
        "total": 41597
      },
      "genres": [
        "anti-folk",
        "canadian indie folk",
        "small room"
      ],
      "href": "https://api.spotify.com/v1/artists/4xXQxNcBCtsaz6Gw1IblE3",
      "id": "4xXQxNcBCtsaz6Gw1IblE3",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/ab67616d0000b2730409a2c89b43fc33d1f3cb0d",
          "width": 640
        },
        {
          "height": 300,
          "url": "https://i.scdn.co/image/ab67616d00001e020409a2c89b43fc33d1f3cb0d",
          "width": 300
        },
        {
          "height": 64,
          "url": "https://i.scdn.co/image/ab67616d000048510409a2c89b43fc33d1f3cb0d",
          "width": 64
        }
      ],
      "name": "Michael Cera",
      "popularity": 44,
      "type": "artist",
      "uri": "spotify:artist:4xXQxNcBCtsaz6Gw1IblE3"
    },
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/3LiQA7CeDBEpoWI0TNBJgv"
      },
      "followers": {
        "href": null,
        "total": 10181
      },
      "genres": [
        "australian garage punk"
      ],
      "href": "https://api.spotify.com/v1/artists/3LiQA7CeDBEpoWI0TNBJgv",
      "id": "3LiQA7CeDBEpoWI0TNBJgv",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/2d0bbf62a3c49d4a8fe38289183aea298e5342eb",
          "width": 640
        },
        {
          "height": 320,
          "url": "https://i.scdn.co/image/fa8d97cfde0536986fc3fd117e3625adf6ac9ced",
          "width": 320
        },
        {
          "height": 160,
          "url": "https://i.scdn.co/image/c4cedc74389795c7b3508dfcd812cebb91c29b1e",
          "width": 160
        }
      ],
      "name": "The Grogans",
      "popularity": 44,
      "type": "artist",
      "uri": "spotify:artist:3LiQA7CeDBEpoWI0TNBJgv"
    },
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/1GJ1uwDfaA8GVVpVc2I2d2"
      },
      "followers": {
        "href": null,
        "total": 113819
      },
      "genres": [
        "australian garage punk",
        "australian indie",
        "indie surf"
      ],
      "href": "https://api.spotify.com/v1/artists/1GJ1uwDfaA8GVVpVc2I2d2",
      "id": "1GJ1uwDfaA8GVVpVc2I2d2",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/1261c574bd101a23f2125c8a4fdbe658f2abd151",
          "width": 640
        },
        {
          "height": 320,
          "url": "https://i.scdn.co/image/e7f7d28f4aa33874c6f146e3bd6bf81d1367aaf7",
          "width": 320
        },
        {
          "height": 160,
          "url": "https://i.scdn.co/image/d781f056139f525eed152801d33c7e5b14958e46",
          "width": 160
        }
      ],
      "name": "Hockey Dad",
      "popularity": 55,
      "type": "artist",
      "uri": "spotify:artist:1GJ1uwDfaA8GVVpVc2I2d2"
    },
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/5Dk3G2pCM54sYxkRpzcMUh"
      },
      "followers": {
        "href": null,
        "total": 640
      },
      "genres": [
        "new orleans indie"
      ],
      "href": "https://api.spotify.com/v1/artists/5Dk3G2pCM54sYxkRpzcMUh",
      "id": "5Dk3G2pCM54sYxkRpzcMUh",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/0b495f710040e0a0da9cdeaf05ec95f71647acbd",
          "width": 640
        },
        {
          "height": 320,
          "url": "https://i.scdn.co/image/d442c94f265bf7546c9e22d5443904854b449817",
          "width": 320
        },
        {
          "height": 160,
          "url": "https://i.scdn.co/image/bcf9b6139381d904ec6af8526773fff110dcad27",
          "width": 160
        }
      ],
      "name": "Lawn",
      "popularity": 13,
      "type": "artist",
      "uri": "spotify:artist:5Dk3G2pCM54sYxkRpzcMUh"
    }
  ],
  "total": 43,
  "limit": 20,
  "offset": 0,
  "href": "https://api.spotify.com/v1/me/top/artists",
  "previous": null,
  "next": "https://api.spotify.com/v1/me/top/artists?limit=20&offset=20"
}

//sample audio features from Jamie's spotify
{
  "audio_features": [
    {
      "danceability": 0.808,
      "energy": 0.626,
      "key": 7,
      "loudness": -12.733,
      "mode": 1,
      "speechiness": 0.168,
      "acousticness": 0.00187,
      "instrumentalness": 0.159,
      "liveness": 0.376,
      "valence": 0.37,
      "tempo": 123.99,
      "type": "audio_features",
      "id": "4JpKVNYnVcJ8tuMKjAj50A",
      "uri": "spotify:track:4JpKVNYnVcJ8tuMKjAj50A",
      "track_href": "https://api.spotify.com/v1/tracks/4JpKVNYnVcJ8tuMKjAj50A",
      "analysis_url": "https://api.spotify.com/v1/audio-analysis/4JpKVNYnVcJ8tuMKjAj50A",
      "duration_ms": 535223,
      "time_signature": 4
    },
    {
      "danceability": 0.457,
      "energy": 0.815,
      "key": 1,
      "loudness": -7.199,
      "mode": 1,
      "speechiness": 0.034,
      "acousticness": 0.102,
      "instrumentalness": 0.0319,
      "liveness": 0.103,
      "valence": 0.389,
      "tempo": 96.083,
      "type": "audio_features",
      "id": "2NRANZE9UCmPAS5XVbXL40",
      "uri": "spotify:track:2NRANZE9UCmPAS5XVbXL40",
      "track_href": "https://api.spotify.com/v1/tracks/2NRANZE9UCmPAS5XVbXL40",
      "analysis_url": "https://api.spotify.com/v1/audio-analysis/2NRANZE9UCmPAS5XVbXL40",
      "duration_ms": 187800,
      "time_signature": 4
    },
    {
      "danceability": 0.281,
      "energy": 0.402,
      "key": 4,
      "loudness": -17.921,
      "mode": 1,
      "speechiness": 0.0291,
      "acousticness": 0.0734,
      "instrumentalness": 0.83,
      "liveness": 0.0593,
      "valence": 0.0793,
      "tempo": 115.7,
      "type": "audio_features",
      "id": "24JygzOLM0EmRQeGtFcIcG",
      "uri": "spotify:track:24JygzOLM0EmRQeGtFcIcG",
      "track_href": "https://api.spotify.com/v1/tracks/24JygzOLM0EmRQeGtFcIcG",
      "analysis_url": "https://api.spotify.com/v1/audio-analysis/24JygzOLM0EmRQeGtFcIcG",
      "duration_ms": 497493,
      "time_signature": 3
    }
  ]
}

// Sample code for top track
{
  "items": [
    {
      "album": {
        "album_type": "ALBUM",
        "artists": [
              BLEH
        ],
        "available_markets": [
          "AD",
        ],
        "external_urls": {
          "spotify": "https://open.spotify.com/album/2fenSS68JI1h4Fo296JfGr"
        },
        "href": "https://api.spotify.com/v1/albums/2fenSS68JI1h4Fo296JfGr",
        "id": "2fenSS68JI1h4Fo296JfGr",
        "images": [
        BLLEH
        ],
        "name": "folklore",
        "release_date": "2020-07-24",
        "release_date_precision": "day",
        "total_tracks": 16,
        "type": "album",
        "uri": "spotify:album:2fenSS68JI1h4Fo296JfGr"
      },
      "artists": [
        {
          "external_urls": {
            "spotify": "https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02"
          },
          "href": "https://api.spotify.com/v1/artists/06HL4z0CvFAxyc27GXpf02",
          "id": "06HL4z0CvFAxyc27GXpf02",
          "name": "Taylor Swift",
          "type": "artist",
          "uri": "spotify:artist:06HL4z0CvFAxyc27GXpf02"
        }
      ],
      "available_markets": [
        "ZA"
      ],
      "disc_number": 1,
      "duration_ms": 210251,
      "explicit": true,
      "external_ids": {
        "isrc": "USUG12002835"
      },
      "external_urls": {
        "spotify": "https://open.spotify.com/track/0Jlcvv8IykzHaSmj49uNW8"
      },
      "href": "https://api.spotify.com/v1/tracks/0Jlcvv8IykzHaSmj49uNW8",
      "id": "0Jlcvv8IykzHaSmj49uNW8",
      "is_local": false,
      "name": "the 1",
      "popularity": 81,
      "preview_url": "https://p.scdn.co/mp3-preview/efebd9d9b761b7685da9264c637a1db1cd994f19?cid=774b29d4f13844c495f206cafdad9c86",
      "track_number": 1,
      "type": "track",
      "uri": "spotify:track:0Jlcvv8IykzHaSmj49uNW8"
    }
  ],
  "total": 50,
  "limit": 1,
  "offset": 0,
  "href": "https://api.spotify.com/v1/me/top/tracks?limit=1&offset=0",
  "previous": null,
  "next": "https://api.spotify.com/v1/me/top/tracks?limit=1&offset=1"
}
*/
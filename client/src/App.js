//import logo from './logo.svg';
import React,{Component} from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';

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
      // nowPlaying:{
      //   name: 'Not Checked',
      //   image: ''
      // },
      savedTracks:{
        nameTrack1:'TBD'
        //nameTrack2:'TBD'
      }
      //have view set here
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
  // getNowPlaying() { //can alter this function and make more like it, using diff calls after spotifyWebApi.
  //   spotifyWebApi.getMyCurrentPlaybackState()
  //   .then((response)=>{
  //       this.setState({
  //         nowPlaying:{
  //         name:response.item.name,  // .item is used to access variables
  //         image: response.item.album.images[0].url //img not displaying
  //       }
  //     })
  //   })
  // }

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
    
    {/* <div>Now Playing: {this.state.nowPlaying.name}</div>
      <div>
        <img stc={this.state.nowPlaying.image} syle={{width: 100}}/>
      </div>
      <button onClick={() => this.getNowPlaying()}>
        Check Now Playing 
      </button>  */}
    
      <div id= '12SavedTracks'>First saved Track: {this.state.savedTracks.nameTrack1}</div>
      {/* <div>Second saved Track: {this.state.savedTracks.nameTrack2}</div> */}
      <div id='butSavedTracks'>
        <button onClick={() => this.getSavedTracks()}>
          See first two saved tracks!
        </button> 
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
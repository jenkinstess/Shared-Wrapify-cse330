//import logo from './logo.svg';
import React,{Component} from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class App extends Component{
  constructor(){
    super();
    const params= this.getHashParams(); //gives obj that has access and refresh tokens
    this.state={
      loggedIn: params.access_token ? true : false, //checks if access token is set or not to see if logged in 
      nowPlaying:{
        name: 'Not Checked',
        image: ''
      }
    }
    if (params.access_token){
      spotifyWebApi.setAccessToken(params.access_token);
    }
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
getNowPlaying() { //can alter this function and make more like it, using diff calls after spotifyWebApi.
  spotifyWebApi.getMyCurrentPlaybackState()
  .then((response)=>{
      this.setState({
        nowPlaying:{
        name:response.item.name,  // .item is used to access variables
        image: response.item.album.images[0].url //img not displaying
      }
    })
  })
}

  render(){
  return (
    <div className="App">
      <a href='http://localhost:3456'>
      <button>Login with Spotify</button>
      </a>
    <div>Now Playing: {this.state.nowPlaying.name}</div>
    <div>
      <img stc={this.state.nowPlaying.image} syle={{width: 100}}/>
    </div>
    <button onClick={() => this.getNowPlaying()}>
      Check Now Playing 
      </button> 
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

export default App;

import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import 'normalize.css';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBvgLHZPZrSbKCeZOEtLJGpmhkBaNbqWec",
  authDomain: "bloc-chat-react-c196e.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-c196e.firebaseio.com",
  projectId: "bloc-chat-react-c196e",
  storageBucket: "bloc-chat-react-c196e.appspot.com",
  messagingSenderId: "475728885488"
};

firebase.initializeApp(config);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: {},
      currentUser: null
    };
  }

  setUser(user) {
    this.setState({
      currentUser: user
    })
  }

  setActiveRoom(room) {
    this.setState({activeRoom: room});
  }

  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase} setActiveRoom={this.setActiveRoom.bind(this)} setUser={this.setUser.bind(this)} currentUser={this.state.currentUser}/>
        <MessageList firebase={firebase} activeRoom={this.state.activeRoom} currentUser={this.state.currentUser}/>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
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
  render() {
    return (
      <div className="App">
        <RoomList firebase={ firebase } />
      </div>
    );
  }
}

export default App;

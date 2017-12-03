import React, { Component } from 'react';
import styled from 'styled-components';
import User from './../components/User';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.state = {
            rooms: [],
            newRoomName: ''
        }
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            let newRoom = snapshot.val();
            newRoom.key = snapshot.key;
            this.setState({rooms: this.state.rooms.concat(newRoom)});
        })
    }

    handleChange(event) {
        this.setState({newRoomName: event.target.value})
    }

    handleClick() {
        if (this.state.newRoomName) {
            this.roomsRef.push({name: this.state.newRoomName});
            this.setState({newRoomName: ''})
        }
    }

    setNewUser(user) {
        this.props.setUser(user)
    }

    setActiveRoom(room) {
        this.props.setActiveRoom(room);
    }

    render() {
        return (
            <div className='side-panel'>
                <User firebase={this.props.firebase} setNewUser={this.setNewUser.bind(this)}/>
                <h1 className='heading-primary'>Welcome to Chatty!</h1>
                <h2 className='heading-secondary'> get your chat on </h2>
                <ul className=''>
                    {
                        this.state.rooms.map((room,index ) => {
                            return <RoomItem key={index} roomName={room.name} handleActiveRoom={() =>  this.setActiveRoom(room)} />
                        })
                    }
                </ul>
                <div className="new-room-box">
                    <input className="new-room-input" type="text" value={this.state.newRoomName}  onChange={this.handleChange.bind(this)} />
                    <button className="btn new-room-btn" onClick={this.handleClick.bind(this)}> Create Room </button>
                </div>
            </div>
        )
    }
}

const RoomItem = (props) => {
    return (
        <li className="room-item" onClick={props.handleActiveRoom}> {props.roomName} </li> 
    )
}

export default RoomList;
import React, { Component } from 'react';
import styled from 'styled-components';

class RoomList extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.state = {
            rooms: [],
            newRoomName: ''
        }
    }
    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            this.setState({rooms: this.state.rooms.concat(snapshot.val().name)});
        })
    }
    handleChange(event) {
        this.setState({newRoomName: event.target.value})
    }
    handleClick() {
        this.roomsRef.push({name: this.state.newRoomName});
        this.setState({newRoomName: ''})
    }
    render() {
        return (
            <SidePanel> 
                <Title> Welcome to Bloc Chat! </Title>
                <SubTitle> Please select your room </SubTitle>
                <StyledUl>
                    {
                        this.state.rooms.map((roomName,index ) => {
                            return <RoomItem key={index} roomName={roomName} />
                        })
                    }
                </StyledUl>
                <NewRoomDiv>
                    <NewRoomInput type="text" value={this.state.newRoomName}  onChange={this.handleChange.bind(this)} />
                    <SubmitButton onClick={this.handleClick.bind(this)}> + </SubmitButton>
                </NewRoomDiv>
            </SidePanel>
        )
    }
}

const RoomItem = (props) => {
    return (
        <StyledLi> {props.roomName} </StyledLi> 
    )
}

const StyledUl = styled.ul`
    margin: auto;
`

const SidePanel = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 75%;
    background: #FFE082;
`

const Title = styled.h1`
    color: black;
    text-align: center;
    margin: auto;
`

const SubTitle = styled.h3`
    color: black;
    text-align: center;
    margin: auto;
`

const StyledLi = styled.li`
    color: black;
    cursor: pointer;
    margin: 0.5rem 0 0.5rem 0;
`

const NewRoomDiv = styled.div`
    width: 100%;
    text-align: center;
`
const NewRoomInput = styled.input`
    margin:auto; 
    width: 60%;
`

const SubmitButton = styled.button`
    width: 10%;
`

export default RoomList;
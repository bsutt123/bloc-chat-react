import React, { Component } from 'react';
import styled from 'styled-components';

class RoomList extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.state = {
            rooms: []
        }
    }
    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            console.log(snapshot.val());
            this.setState({rooms: this.state.rooms.concat(snapshot.val().name)});
        })
    }
    render() {
        return (
            <SidePanel> 
                <Title> Welcome to Bloc Chat! </Title>
                <SubTitle> Please select your room </SubTitle>
                <ul>
                    {
                        this.state.rooms.map((roomName,index ) => {
                            return <RoomItem key={index} roomName={roomName} />
                        })
                    }
                </ul>
            </SidePanel>
        )
    }
}

const RoomItem = (props) => {
    return (
        <StyledLi> {props.roomName} </StyledLi> 
    )
}

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

export default RoomList;
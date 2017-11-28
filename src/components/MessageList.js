import React, {Component} from 'react';
import styled from 'styled-components';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.messagesRef = this.props.firebase.database().ref('messages')
        this.state = {
            messages: []
        }
        this.newRef = null;
    }

    componentWillReceiveProps(nextProps) {
        if (this.newRef) {
            this.newRef.off();
        }
        this.setState({messages: []});
        const key = nextProps.activeRoom.key
        if (key) {
            this.newRef = this.messagesRef.orderByChild('roomId').equalTo(key)
            this.newRef.on("child_added", (snapshot)=> {
                this.setState({messages: this.state.messages.concat(snapshot.val())});
            })
        }
    }


    render() {
        return (
            <MessageContainer> 
                <ul>
                    {
                        this.state.messages.map((message, index) => {
                            return <li key={index}> {message.content} </li>     
                        })                 
                    }
                </ul>
            </MessageContainer>
        )
    }
}
const MessageContainer = styled.div`
    position: absolute;
    left: 25%;
    top: 0;
    bottom: 0;
    right: 0;
    background: blue;
`
export default MessageList;
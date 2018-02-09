import React, {Component} from 'react';
import styled from 'styled-components';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.messagesRef = this.props.firebase.database().ref('messages')
        this.state = {
            messages: [],
            newMessage: ''
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

    handleChange(event) {
        this.setState({newMessage: event.target.value});
    }

    messageUsername() {
        if (this.props.currentUser) {
            return this.props.currentUser;
        } else {
            return "Anonymous";
        }
    } 

    handleClick() {
        if (this.props.activeRoom.key && this.state.newMessage) {
            let stringDate = new Date
            stringDate = stringDate.toDateString();
            this.messagesRef.push({
                content: this.state.newMessage,
                user: this.messageUsername(),
                sentAt: stringDate,
                roomId: this.props.activeRoom.key
            });
            this.setState({newMessage:''});
        }
    }
    render() {
        return (
            <div className="message-container"> 
                <h1 className="heading-primary"> {this.props.activeRoom.name} </h1>
                <ul className="message-list">
                    {
                        this.state.messages.map((message, index) => {
                            return (<li key={index}> <Message message={message} date={message.sentAt} />  </li> )
                        })                 
                    }
                </ul>
                <div className="new-message-box">
                    <textarea className="new-message-input" type="text" value={this.state.newMessage} onChange={this.handleChange.bind(this)} ></textarea>
                    <button className="btn new-message-btn" onClick={this.handleClick.bind(this)} > Submit Message </button>
                </div>
            </div>
        )
    }
}

const Message = (props) => {
    return (
        <div className="message-box">
            <div className="message-user"> {props.message.user} </div>
            <p className="message-content"> {props.message.content} </p>
            <div className="message-time"> {props.date} </div>
        </div>
    )
}

export default MessageList;
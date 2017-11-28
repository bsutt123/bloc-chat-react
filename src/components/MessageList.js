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
        console.log("I'm handling a changed message event");
        this.setState({newMessage: event.target.value});
    }

    messageUsername() {
        if (this.props.currentUser) {
            return this.props.currentUser;
        } else {
            return "Anonymous";
        }
    } 

    convertDate(dateNum) {
        const d = new Date(dateNum);
        const stringDate=  d.toString();
        if (stringDate === "Invalid Date") {
            return ""
        } else {
            return stringDate;
        }
    }

    handleClick() {
        console.log("I handled a click event");
        this.messagesRef.push({
            content: this.state.newMessage,
            user: this.messageUsername(),
            sentAt: Date.now(),
            roomId: this.props.activeRoom.key
        });
        this.setState({newMessage:''});
    }
    render() {
        return (
            <MessageContainer> 
                <MessageUl>
                    {
                        this.state.messages.map((message, index) => {
                            return (<li key={index}> <Message message={message} date={this.convertDate(message.sentAt)} />  </li> )
                        })                 
                    }
                </MessageUl>
                <NewMessageDiv>
                    <NewMessageInput type="text" value={this.state.newMessage} onChange={this.handleChange.bind(this)}/>
                    <NewMessageButton onClick={this.handleClick.bind(this)} > Submit Message </NewMessageButton>
                </NewMessageDiv>
            </MessageContainer>
        )
    }
}

const Message = (props) => {
    return (
        <MessageBox>
            <span> {props.message.user} </span>
            <p> {props.message.content} </p>
            <span> {props.date} </span>
        </MessageBox>
    )
}
const MessageContainer = styled.div`
    position: absolute;
    left: 25%;
    top: 0;
    right: 0;
    bottom: 30px;
    background: blue;
`

const MessageUl = styled.ul`
    list-style-type: none;
    margin:0;
    padding:0;
`
const MessageBox =  styled.div`
    border: 2px solid #dedede;
    background-color: #f1f1f1;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0;
`

const NewMessageInput = styled.input`
    width: 80%;
    height: 30px;
`
const NewMessageButton = styled.button`
    width: 18%;
    height: 30px;
`
const NewMessageDiv = styled.div`
    position: fixed;
    left:25%;
    right: 0;
    bottom: 0;
    background: red;
`
export default MessageList;
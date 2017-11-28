import React, {Component} from 'react';
import styled from 'styled-components';

class User extends Component {
    constructor(props) {
        super(props);
        this.state=({
            signedIn: false
        })

        this.provider = new this.props.firebase.auth.GoogleAuthProvider();
    }
    userText() {
        if (this.state.signedIn) {
            return "Sign Out";
        } else {
            return "Sign In";
        }
    }
    handleClick() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        if (!this.state.signedIn) {
            this.props.firebase.auth().signInWithPopup(provider).then( (result) => {
                this.props.setNewUser(result.user.email)
                this.setState({signedIn: true});
            });
        } else {
            this.props.firebase.auth().signOut();
            this.props.setNewUser(null);
            this.setState({signedIn:false})
        }
    }
    render() {
        return (
            <UserButton onClick={() => this.handleClick()}> {this.userText()} </UserButton>
        )
    }
}

const UserButton = styled.button`
    width: 80%;
    color: black;
    margin: auto;
    text-align: center;
`

export default User;
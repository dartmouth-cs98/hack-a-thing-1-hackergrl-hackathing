
require('../styles/ChatApp.css');

import React from 'react';
import io from 'socket.io-client';
import config from '../config';

import Messages from './Messages';
import ChatInput from './ChatInput';

// This is where the main logic of the app will be. Here is where we will
// communicate with the chat server (send and receive messages). We will
// then pass the data received from the server to other components to be
// displayed
class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: []};

    this.sendHandler = this.sendHandler.bind(this);

    //we finally connect to server
    this.socket = io(config.api).connect();

    this.socket.on('server:message', message => {
      this.addMessage(message);
    });
  }
  addMessage(message) {
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }
  sendHandler(message) {
    const messageObject = {
    username: this.props.username,
    message
    };
    // Emit the message to the server
    this.socket.emit('client:message', messageObject);
    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

  render() {
    return(
      <div>
        <h2>Chat with your ride</h2>
        <Messages messages={this.state.messages}/>
        <ChatInput onSend={this.sendHandler}/>
      </div>
    );
  }

}
ChatApp.defaultProps = {
  username: 'Anonymous'
};

export default ChatApp;
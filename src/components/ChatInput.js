import React from 'react';

// This component is where the user can type their message and send it
// to the chat room. We shouldn't communicate with the server here though.
class ChatInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = { chatInput: '' };
    // This is trash I need the arrow functions
    this.submitHandler = this.submitHandler.bind(this);
    this.textChangeHandler = this.textChangeHandler.bind(this);
  }

  textChangeHandler(event)  {
    this.setState({ chatInput: event.target.value });
  }

  submitHandler(event) {
    // Stop the form from refreshing the page on submit
    event.preventDefault();
    this.props.onSend(this.state.chatInput);
    this.setState({ chatInput: '' });
  }
  render() {
    return (
      <form className="chat-input" onSubmit={this.submitHandler}>
        <input type="text"
          onChange={this.textChangeHandler}
          value={this.state.chatInput}
          placeholder="Write a message..."
          required />
      </form>
    );
  }
}

ChatInput.defaultProps = {
};

export default ChatInput;
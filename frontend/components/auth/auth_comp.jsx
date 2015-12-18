var React = require('react');
var AuthStore = require('../../stores/auth');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('../../util/api_util');

var Auth = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function () {
    return {
      username: "",
      password: "",
      messages: []
    };
  },

  componentDidMount: function () {
    this.authListener = AuthStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.authListener.remove();
  },

  _onChange: function () {
    var messages = AuthStore.all();
    // debugger;
    if (messages[0] === "Success!") {
      this.props.callback();
    } else {
      this.setState({ messages: messages });
    }
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var user = {
      username: this.state.username,
      password: this.state.password,
      artist: false
    };
    this.props.method === "Sign Up!" ? ApiUtil.createUser(user) : ApiUtil.signInUser(user)
  },

  render: function () {
    var displayMessages = ""
    if (this.state.messages.length > 0) {
      displayMessages = <ul>
        {this.state.messages.map(function (message) {
          return <li>{message}</li>
          })
        }
      </ul>

    }

    return (
      <div className='modal-screen'>
        <div className='modal-content'>
          <p>{this.props.method}</p>
          {displayMessages}
          <form>
            Username: <input type="text" valueLink={this.linkState('username')}/>
            <br/>
            Password: <input type="password" valueLink={this.linkState('password')}/>
            <br/>
            <button onClick={this.handleSubmit}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = Auth;

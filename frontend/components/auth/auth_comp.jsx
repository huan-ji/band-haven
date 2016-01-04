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
      <form>
        <div className="col-md-12">
          <div className="login-input">
            <input type="text"
                   valueLink={this.linkState("username")}
                   placeholder="Username"
                   className="form-control input-sm" />
          </div>
        </div>

        <div className="col-md-12">
          <div className="login-input">
            <input type="password"
                   valueLink={this.linkState("password")}
                   placeholder="Password"
                   className="form-control input-sm" />
          </div>
        </div>

        <div className="col-md-12">
          <div className="login-submit-button">
            <button type="submit"
                    className="btn btn-success btn-sm"
                    onClick={this.handleSubmit}>Log in</button>

            <button className="btn btn-success btn-sm"
                    onClick={this.guest}>Guest</button>

            <span className="flash-error"><br/>{this.state.flash}</span>
          </div>
        </div>
      </form>
    );
  }
});

module.exports = Auth;

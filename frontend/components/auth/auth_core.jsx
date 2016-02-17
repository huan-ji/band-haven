var React = require('react');
var Auth = require('./auth_comp');
var ApiUtil = require('../../util/api_util');
var AuthStore = require('../../stores/auth');

var AuthCore = React.createClass({
  getInitialState: function () {
    return {
      loggedIn: false,
      user: null,
    };
  },

  componentDidMount: function () {
    this.authListener = AuthStore.addListener(this.authChange);
  },

  componentWillUnmount: function () {
    this.authListener.remove();
  },

  checkAuth: function () {
    ApiUtil.checkAuth();
  },

  handleLogOut: function (e) {
    e.preventDefault();
    ApiUtil.signOutUser();
  },

  authChange: function () {
    var user = AuthStore.user();
    if (user) {
      this.setState({ loggedIn: true, user: user })
    } else {
      this.setState({ loggedIn: false, user: null })
    }
  },

  doNothing: function (e) {
    e.preventDefault();
  },

  render: function () {
    var authMenu;
    if (this.state.loggedIn) {
      authMenu = (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a onClick={this.doNothing} style={{ cursor: "default" }}>{this.state.user.username}</a>
          </li>
          <li>
            <a onClick={this.handleLogOut}>Log Out</a>
          </li>
        </ul>
      )
    } else {
      authMenu = (
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">New User<span className="caret"></span></a>
            <div className="dropdown-menu" id="login-dropdown">
              <Auth method="Sign Up" callback={this.checkAuth}/>
            </div>
          </li>
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Log In<span className="caret"></span></a>
            <div className="dropdown-menu" id="login-dropdown">
              <Auth method="Sign In" callback={this.checkAuth}/>
            </div>
          </li>
        </ul>
      )
    }

    return (
      <div className="nav navbar-nav navbar-right" style={{ marginRight: "0"}}>
        {authMenu}
      </div>
    );
  }
})

module.exports = AuthCore

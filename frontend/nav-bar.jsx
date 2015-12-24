var React = require('react');
var History = require('react-router').History;
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var FrontPage = require('./components/front_page');
var Auth = require('./components/auth/auth_comp');
var ApiUtil = require('./util/api_util');
var Scroll = require('react-scroll');
var ScrollLink = Scroll.Link;
var Element = Scroll.Element;
var OnScroll = require("react-window-mixins").OnScroll;

var NavBar = React.createClass({
  mixins: [History, OnScroll],
  getInitialState: function () {
    return {
      auth: false,
      method: "",
      loggedIn: false,
      height: 0
    };
  },

  onScroll: function () {
    var discoverHeight = document.getElementById("discover").offsetTop;

    if (document.getElementById("discover") && (window.pageYOffset >= document.getElementById("discover").offsetTop - 10) && !this.disappear) {
      // debugger;
      this.disappear = true;
      this.setState({ height: "0px" });
    } else if (document.getElementById("discover") && window.pageYOffset < document.getElementById("discover").offsetTop - 11 && this.disappear) {
      this.disappear = false
      this.setState({ height: "50px" })
    }
  },

  handleAuth: function (authMethod) {
    this.setState({ auth: true, method: authMethod })
  },

  finishAuth: function () {
    this.setState({ auth: false, loggedIn: true })
  },

  handleLogOut: function () {
    ApiUtil.signOutUser();
    this.setState({ loggedIn: false })
  },

  discoverPath: function () {
    if (location.hash.split("/")[2]) {
      // debugger;
      // this.history.
      return <Link to="/discover" style={{cursor: "pointer"}}>Discover</Link>
    } else {
      return <ScrollLink style={{cursor: "pointer"}} to="discover" spy={true} smooth={true} offset={50} duration={500}>Discover</ScrollLink>
    }
  },

  goHome: function () {
    if (location.hash.split("/")[2]) {
      return <Link className="navbar-brand" to="/" style={{cursor: "pointer"}}>BandHaven</Link>
    } else {
      return <ScrollLink className="navbar-brand" style={{cursor: "pointer"}} to="top" spy={true} smooth={true} offset={50} duration={500}>BandHaven</ScrollLink>
    }
  },

  render: function () {
    var modal = "";
    if (this.state.auth) {
      modal = <Auth method={this.state.method} callback={this.finishAuth}/>
    };

    var buttons;
    if (this.state.loggedIn) {
      buttons = <button onClick={this.handleLogOut}>Log Out</button>
    } else {
      buttons = (
        <div>
          <button onClick={this.handleAuth.bind(this, "Sign Up!")}>Sign Up</button>
          <button onClick={this.handleAuth.bind(this, "Sign In!")}>Sign In</button>
        </div>
      )
    }
    return (
      <nav id="navbar" style={{ height: "50px" }} className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            {this.goHome()}
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="active">{this.discoverPath()}</li>
            </ul>
            <form className="navbar-form navbar-left" role="search">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Does not work yet"/>
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
            </form>
            <ul className="nav navbar-nav navbar-right">
              <li><a onClick={this.handleAuth.bind(this, "Sign Up!")} style={{cursor:"pointer"}}>New User</a></li>
              <li><a onClick={this.handleAuth.bind(this, "Sign In!")} style={{cursor:"pointer"}}>Log In</a></li>
            </ul>
          </div>
        </div>
        {modal}
      </nav>
    )
  }
});
              // <li className="dropdown">
              //   <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
              //   <ul className="dropdown-menu">
              //     <li><a href="#">Action</a></li>
              //     <li><a href="#">Another action</a></li>
              //     <li><a href="#">Something else here</a></li>
              //     <li role="separator" className="divider"></li>
              //     <li><a href="#">Separated link</a></li>
              //   </ul>
              // </li>

module.exports = NavBar;

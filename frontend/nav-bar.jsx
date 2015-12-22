var React = require('react');
var History = require('react-router').History;
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var FrontPage = require('./components/front_page');
var Auth = require('./components/auth/auth_comp');
var ApiUtil = require('./util/api_util');


var NavBar = React.createClass({
  mixins: [History],
  getInitialState: function () {
    return {
      auth: false,
      method: "",
      loggedIn: false
    };
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

    // debugger;
    if (location.hash.split("/")[2]) {
      this.history.push("/");
      setTimeout(function () {
        window.location.hash = "#discover";
        // var node = document.getElementById("navbar");
        // node.classList.add("navbar-disappear");
      }, 800)
    } else {
      window.location.hash = "#discover"
      // var node = document.getElementById("navbar");
      // node.classList.add("navbar-disappear");
    }

  },
              // <li className="dropdown">
              //   <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
              //   // <ul className="dropdown-menu">
              //   //   <li><a href="#">Action</a></li>
              //   //   <li><a href="#">Another action</a></li>
              //   //   <li><a href="#">Something else here</a></li>
              //   //   <li role="separator" className="divider"></li>
              //   //   <li><a href="#">Separated link</a></li>
              //   //   <li role="separator" className="divider"></li>
              //   //   <li><a href="#">One more separated link</a></li>
              //   // </ul>
              // </li>
              // <li><a href="#">Link</a></li>

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
      <nav id="navbar" className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">BandHaven</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="active"><a style={{cursor: "pointer"}} onClick={this.discoverPath}>Discover <span className="sr-only">(current)</span></a></li>
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

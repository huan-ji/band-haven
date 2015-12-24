var React = require('react');
var Auth = require('./auth/auth_comp');
var ApiUtil = require('../util/api_util');
var AlbumIndex = require('./albums/album_index');
var FilterArea = require('./filters/filter_area');
var History = require('react-router').History;
var AlbumDiscovery = require('./albums/album_discovery');
var Scroll = require('react-scroll');
var Element = Scroll.Element;
var Events = Scroll.Events;
var ScrollLink = Scroll.Link;

var FrontPage = React.createClass({
  mixins: [History, Events],
  getInitialState: function () {
    // debugger;
    return {
      auth: false,
      method: "",
      loggedIn: false
    };
  },

  componentDidMount: function() {
    this.scrollEvent.register('begin', function(to, element) {
    });

    this.scrollEvent.register('end', function(to, element) {
    });

    // debugger;
    var path = this.props.location.pathname;
    if (path === "/discover") {
      var discover = document.getElementById("discover");
      var height = discover.offsetTop;
      window.scrollTo(0, height);
    }
  },

  componentWillUnmount: function() {
    this.scrollEvent.remove('begin');
    this.scrollEvent.remove('end');
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

  // handleSlide: function () {
  //   this.history.push("/albums")
  // },

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
    };



    return (
      <div>
        <Element name="weekly" className="weekly">
        </Element>
        {modal}
        <Element id="discover" name="discover" className="discover">
          <FilterArea/>
          <AlbumDiscovery/>
        </Element>
      </div>
    )
  }
});

module.exports = FrontPage;

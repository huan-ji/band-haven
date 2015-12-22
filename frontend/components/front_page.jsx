var React = require('react');
var Auth = require('./auth/auth_comp');
var ApiUtil = require('../util/api_util');
var AlbumIndex = require('./albums/album_index');
var FilterArea = require('./filters/filter_area');
var History = require('react-router').History;
var AlbumDiscovery = require('./albums/album_discovery');

var FrontPage = React.createClass({
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

  handleSlide: function () {
    this.history.push("/albums")
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
          // <img className="weekly-img" src="http://res.cloudinary.com/dzqfe9334/image/upload/v1450813093/0006428130_0_h0wikv.jpg"></img>
    return (
      <div>
        <div className="weekly">
        </div>
        {modal}
        <div className="discover">
          <FilterArea/>
          <AlbumDiscovery/>
        </div>
      </div>
    )
  }
});

module.exports = FrontPage;

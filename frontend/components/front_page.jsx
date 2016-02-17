var React = require('react');
var Auth = require('./auth/auth_comp');
var ApiUtil = require('../util/api_util');
var ApiActions = require('../actions/api_actions');
var AlbumIndex = require('./albums/album_index');
var FilterArea = require('./filters/filter_area');
var History = require('react-router').History;
var AlbumDiscovery = require('./albums/album_discovery');
var Scroll = require('react-scroll');
var Element = Scroll.Element;
var Events = Scroll.Events;
var ScrollLink = Scroll.Link;
var FeaturedAlbum = require('./albums/featured_album');
var DiscoverBar = require('./albums/discover_bar');

var FrontPage = React.createClass({
  mixins: [History, Events],

  getInitialState: function () {
    return {
      album: "",
      buttonImg: "assets/play.png",
      imgClass: "featured-play-img",
      buttonClass: "featured-play",
    };
  },

  componentDidMount: function() {
    this.scrollEvent.register('begin', function(to, element) {});
    this.scrollEvent.register('end', function(to, element) {});

    this.scrollToDiscover();
  },

  componentWillUnmount: function() {
    this.scrollEvent.remove('begin');
    this.scrollEvent.remove('end');
  },

  scrollToDiscover: function () {
    var path = this.props.location.pathname;
    if (path === "/discover") {
      ApiActions.setNavigateDiscover(false);
      var discover = document.getElementById("discover");
      var height = discover.offsetTop;
      window.scrollTo(0, height);
    }
  },

  render: function () {
    return (
      <div>
        <FeaturedAlbum/>
        <Element id="discover" name="discover" className="discover">
          <DiscoverBar/>
          <FilterArea/>
          <AlbumDiscovery/>
        </Element>
      </div>
    )
  }
});

module.exports = FrontPage;

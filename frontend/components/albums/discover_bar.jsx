var React = require('react');
var Scroll = require('react-scroll');
var ScrollLink = Scroll.Link;

var DiscoverBar = React.createClass({
  render: function () {
    return (
      <div className="discover-bar">
        <ScrollLink to="top" spy={true} smooth={true} offset={0} duration={500}>
          <img className="top-img" src="assets/top.png"/>
        </ScrollLink>
        <h3>Discover new music</h3>
      </div>
    )
  }
})

module.exports = DiscoverBar;

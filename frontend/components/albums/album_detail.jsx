var React = require('react');
var ReactCSS = require('react-addons-css-transition-group');
var History = require('react-router').History;

var AlbumDetail = React.createClass({
  mixins: [History],
  handleSlideBack: function () {
    this.history.push("/")
  },

  render: function () {
    return (
        <div className="album-detail">
          TESTING TESTING TESTING
          <button onClick={this.handleSlideBack}>Slide Back</button>
        </div>
    )
  }
});

module.exports = AlbumDetail;

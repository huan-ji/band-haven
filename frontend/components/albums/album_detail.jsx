var React = require('react');
var ReactCSS = require('react-addons-css-transition-group');
var History = require('react-router').History;

var AlbumDetail = React.createClass({
  mixins: [History],
  handleSlideBack: function () {
    this.history.push("/")
  },

      // <ReactCSS key={Math.random()} transitionName="album-detail-transition"
      //   transitionAppear={true} transitionAppearTimeout={600}
      //   transitionEnterTimeout={600} transitionLeaveTimeout={600}>
  render: function () {
    return (
        <div className="album-detail">
          TESTING TESTING TESTING
          <button onClick={this.handleSlideBack}>Slide Back</button>
        </div>
    )
  }
});
      // </ReactCSS>

module.exports = AlbumDetail;

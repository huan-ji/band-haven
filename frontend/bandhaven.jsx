var React = require('react');
var ReactDOM = require('react-dom')
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var FrontPage = require('./components/front_page');
var AlbumDetail = require('./components/albums/album_detail');
var ReactCSS = require('react-addons-css-transition-group');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <header><h1>BandHaven</h1></header>
        <FrontPage/>
        {this.props.children}
      </div>
    );
  },

})

    // <IndexRoute component={FrontPage}/>
var routes = (
  <Route path="/" component={App}>
    <Route path="albums" component={AlbumDetail}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById("content"));
});

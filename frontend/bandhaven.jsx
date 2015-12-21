var React = require('react');
var ReactDOM = require('react-dom')
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var FrontPage = require('./components/front_page');
var AlbumDetail = require('./components/albums/album_detail');
var ReactCSS = require('react-addons-css-transition-group');
var RouteHandler = require('react-router').RouteHandler;
var TransitionGroup = require('react-addons-transition-group')
var MockIndex = require('./components/index_route');

var App = React.createClass({
  render: function () {
    var path = this.props.location.pathname;
    return (
      <div>
        <header><h1>BandHaven</h1></header>
        <FrontPage/>
        <ReactCSS component='div' transitionName="pageSwap"
          transitionEnterTimeout={600} transitionLeaveTimeout={600}>
            {React.cloneElement(this.props.children, { key: path })}
        </ReactCSS>
      </div>
    );
  },

})

    // <IndexRoute component={FrontPage}/>
var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={MockIndex}/>
    <Route path="albums/:albumId" component={AlbumDetail}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById("content"));
});

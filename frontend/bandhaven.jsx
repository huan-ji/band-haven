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
var NavBar = require('./nav-bar');
var CurrentAlbum = require('./components/albums/current_album');
var Scroll = require('react-scroll');
var Element = Scroll.Element;


var App = React.createClass({
  render: function () {
    var path = this.props.location.pathname;
    var segment = path.split('/')[2] || 'root';


    return (
      <Element name="top">
        <NavBar/>
        <ReactCSS component='div' transitionName={segment === 'root' ? 'reversePageSwap' : 'pageSwap'}
          transitionEnterTimeout={600} transitionLeaveTimeout={600}>
            {React.cloneElement(this.props.children, { key: path, style: {top: window.pageYOffset + 60} })}
        </ReactCSS>

      </Element>
    );
  },

})

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={FrontPage}/>
    <Route path="discover" component={FrontPage}/>
    <Route path="albums/:albumId" component={AlbumDetail}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById("content"));
});

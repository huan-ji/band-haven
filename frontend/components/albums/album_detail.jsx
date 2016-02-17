var React = require('react');
var ReactCSS = require('react-addons-css-transition-group');
var History = require('react-router').History;
var AlbumStore = require('../../stores/album');
var DiscoverStore = require('../../stores/discover');
var SongIndex = require('../songs/song_index');
var ApiActions = require('../../actions/api_actions');
var ApiUtil = require('../../util/api_util');

var AlbumDetail = React.createClass({
  mixins: [History],
  getInitialState: function () {
    return {
      top: this.props.style.top,
      album: null
    }
  },

  handleDiscover: function () {
    if (DiscoverStore.navigateDiscover()) {
      // Featured background set to show 100% width, therefore can use its height to
      // width ratio to find how to position album detail page during transition
      var featuredBGHeight = 810
      var featuredBGWidth = 1440
      var featuredBackgroundRatio = featuredBGHeight / featuredBGWidth
      var navbarHeight = 60
      this.setState({
        top: window.innerWidth * featuredBackgroundRatio + navbarHeight
      })
    }
  },

  componentDidMount: function () {
    this.discoverListener = DiscoverStore.addListener(this.handleDiscover);
    this.albumListener = AlbumStore.addListener(this.onChange);

    this.closeTopPositionGap();
    ApiUtil.showSingleAlbum(parseInt(this.props.params.albumId));
    this.selectBannerImg();
  },

  componentWillUnmount: function () {
    this.albumListener.remove();
    this.discoverListener.remove();
  },

  onChange: function () {
    this.setState({ album: AlbumStore.showAlbum() });
  },

  closeTopPositionGap: function () {
    var that = this;
    setTimeout(function () {
      that.setState({ top: "60" });
      window.scrollTo(0, 0);
    }, 600);
  },

  selectBannerImg: function () {
    var bannerArray = [
      "http://res.cloudinary.com/dzqfe9334/image/upload/v1451763346/0006354568_0_bn0rwh.jpg",
      "http://res.cloudinary.com/dzqfe9334/image/upload/v1452731786/0006360714_0_asak4i.jpg",
      "http://res.cloudinary.com/dzqfe9334/image/upload/v1451763359/0006482592_0_cac0xb.jpg",
      "http://res.cloudinary.com/dzqfe9334/image/upload/v1450813093/0006428130_0_h0wikv.jpg"
     ]
    this.bannerUrl = bannerArray[Math.floor(Math.random()*bannerArray.length)];
  },

  render: function () {
    var albumDetail = "";

    if (this.state.album) {
      albumDetail = (
        <div style={{ top: this.state.top }} className="album-detail">
          <div className="album-detail-info container">
            <div className="album-detail-banner"
              style={{ backgroundImage: "url(" + this.bannerUrl + ")" }}/>
            <div className="album-detail-detail">
              <div className="col-xs-6">
                <h3>{this.state.album.title}</h3>
                <div>By {this.state.album.artist}</div>
                <SongIndex album={this.state.album}/>
              </div>

              <div className="col-xs-6">
                <img src={this.state.album.cover_image} className="album-detail-img"/>
              </div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        {albumDetail}
      </div>
    )
  }
});

module.exports = AlbumDetail;

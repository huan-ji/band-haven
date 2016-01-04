var React = require('react');
var ApiUtil = require('../../util/api_util');
var AlbumStore = require('../../stores/album');
var ApiActions = require('../../actions/api_actions');

var FeaturedAlbum = React.createClass({
  getInitialState: function () {
    return {
      album: "",
      buttonImg: "assets/play.png",
      imgClass: "featured-play-img",
      buttonClass: "featured-play",
    };
  },

  componentDidMount: function () {
    this.listener = AlbumStore.addListener(this.onChange);

    var initialAlbumId = parseInt(document.getElementsByClassName("item active")[0].children[0].alt);
    ApiUtil.fetchSingleAlbum(initialAlbumId);
    $('#myCarousel').on('slid.bs.carousel', function () {
      var featuredAlbumId = parseInt(document.getElementsByClassName("item active")[0].children[0].alt);
      ApiUtil.fetchSingleAlbum(featuredAlbumId);
    })
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  onChange: function () {
    if (AlbumStore.featuredAlbum()) {
      this.setState({ album: AlbumStore.featuredAlbum() });
    }

    if (AlbumStore.selectedSong() && AlbumStore.selectedSong().playing && this.state.album.id === AlbumStore.selectedAlbum().id) {
      this.setState({
        buttonImg: "assets/pause.png",
        imgClass: "featured-pause-img",
        buttonClass: "featured-pause",
      })
    } else {
      this.setState({
        buttonClass: "featured-play",
        imgClass: "featured-play-img",
        buttonImg: "assets/play.png"
      })
    }
  },

  handleClickFeature: function () {
    ApiActions.selectAlbum(this.state.album)
  },

  render: function () {
    return (
      <div id="myCarousel" className="carousel slide" data-ride="carousel">
        <div className="featured-play-btn" onClick={this.handleClickFeature}>
          <img className={this.state.imgClass} src={this.state.buttonImg}></img>
        </div>
        <div className="featured-caption">
          <h4>Featured Album:</h4>
          {this.state.album.title}
        </div>

        <ol className="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
          <li data-target="#myCarousel" data-slide-to="3"></li>
        </ol>

        <div className="carousel-inner" role="listbox">
          <div className="item active">
            <img src="http://res.cloudinary.com/dzqfe9334/image/upload/v1450813093/0006428130_0_h0wikv.jpg" alt="1"/>
          </div>

          <div className="item" albumId="2">
            <img src="http://res.cloudinary.com/dzqfe9334/image/upload/v1451763359/0006482592_0_cac0xb.jpg" alt="2"/>
          </div>

          <div className="item" albumId="3">
            <img src="http://res.cloudinary.com/dzqfe9334/image/upload/v1451763346/0006354568_0_bn0rwh.jpg" alt="3"/>
          </div>
        </div>

        <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    )
  }
})

module.exports = FeaturedAlbum;

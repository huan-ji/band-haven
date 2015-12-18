var React = require('react');
var FilterItem = require('./filter_item');
var FilterStore = require('../../stores/filter');
var ApiUtil = require('../../util/api_util');

var SubGenreFilter = React.createClass({
  getInitialState: function () {
    return {
      subGenres: []
    }
  },

  componentDidMount: function () {
    this.listener = FilterStore.addListener(this._onChange);
    ApiUtil.fetchAllSubGenres();
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  _onChange: function () {
    this.setState({ subGenres: FilterStore.allSubGenres() })
  },

  render: function () {
    var subGenres = "";
    if (this.state.subGenres.length > 0) {
      subGenres = this.state.subGenres.map(function (item, key) {
        return <FilterItem item={item} key={key} callback=""/>
      });
    }
    return (
      <ul className="filter-row">
        {subGenres}
      </ul>
    );
  }
});

module.exports = SubGenreFilter;

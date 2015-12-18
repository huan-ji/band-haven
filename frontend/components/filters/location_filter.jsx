var React = require('react');
var FilterItem = require('./filter_item');
var FilterStore = require('../../stores/filter');
var ApiUtil = require('../../util/api_util');

var LocationFilter = React.createClass({
  getInitialState: function () {
    return {
      locations: []
    }
  },

  componentDidMount: function () {
    this.listener = FilterStore.addListener(this._onChange);
    ApiUtil.fetchAllLocations();
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  _onChange: function () {
    this.setState({ locations: FilterStore.allLocations() })
  },

  render: function () {
    var locations = "";
    if (this.state.locations.length > 0) {
      locations = this.state.locations.map(function (item, key) {
        return <FilterItem item={item} key={key} callback=""/>
      });
    }

    return (
      <ul className="filter-row">
        {locations}
      </ul>
    );
  }
});

module.exports = LocationFilter;

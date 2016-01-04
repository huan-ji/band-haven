var React = require('react');
var FilterItem = require('./filter_item');
var FilterStore = require('../../stores/filter');
var ApiUtil = require('../../util/api_util');
var ReactCSS = require('react-addons-css-transition-group');

var GenreFilter = React.createClass({
  getInitialState: function () {
    return {
      filters: [],
      selectedText: "all"
    }
  },

  componentDidMount: function () {
    this.listener = FilterStore.addListener(this._onChange);
    if (this.props.apiFetch) {
      this.props.apiFetch();
    }
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  _onChange: function () {

    this.setState({ filters: this.props.storeAll() })
    if (this.props.filterType === "subGenre") {
      this.setState({ selectedText: "all" });
      this.props.callback("all")
    }
  },

  filterCallback: function (element, item) {
    if (this.state.selectedText !== item.name) {
      this.setState({
        selectedText: item.name
      });
    }
    this.props.callback(element.innerHTML)
  },

  render: function () {
    var content = "";
    var filters = "";
    var that = this;
    var currentDisplay;
    if (this.state.filters.length > 0) {
      filters = this.state.filters.map(function (item, key) {
        var selected = false
        if (that.state.selectedText === item.name) {
          selected = true
        }
        return <FilterItem item={item} selected={selected} key={key} callback={that.filterCallback}/>
      });

      var selected = false
      if (this.state.selectedText === "all") {
        selected = true
      }
      var allObj = {name: "all"}
      this.allFilter = <FilterItem item={allObj} selected={selected} key="100" callback={this.filterCallback}/>
      filters.unshift(this.allFilter)

      content = <div className="filter-row" style={this.props.testStyle}>{filters}</div>;
    }

    return (
        <ReactCSS transitionName="filter-transition" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          { content }
        </ReactCSS>
    );
  }

});

module.exports = GenreFilter;

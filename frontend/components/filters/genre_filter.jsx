var React = require('react');
var FilterItem = require('./filter_item');
var FilterStore = require('../../stores/filter');
var ApiUtil = require('../../util/api_util');
var ReactCSS = require('react-addons-css-transition-group');

var GenreFilter = React.createClass({
  getInitialState: function () {
    return {
      filters: [],
      selectedText: "",
      selectedElement: "",
      selectedItem: ""
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
  },

  filterCallback: function (element, item) {
    // debugger;
    element.classList.add("selected-filter");
    this.state.selectedElement !== "" ? this.state.selectedElement.classList.remove("selected-filter") : "";
    this.setState({
      selectedText: element.innerHTML,
      selectedElement: element,
      selectedItem: item
    });
    // debugger;
    this.props.callback(element.innerHTML)
  },

  render: function () {
    var content = "";
    var filters = "";
    var that = this;
    var currentDisplay;
    if (this.state.filters.length > 0) {
      filters = this.state.filters.map(function (item, key) {
        return <FilterItem item={item} key={key} callback={that.filterCallback}/>
      });
      // currentDisplay = "filter-row"
      var allObj = {name: "all"}
      filters.unshift(<FilterItem item={allObj} key="100" callback={that.filterCallback}/>)
      content = <ul className="filter-row" style={this.props.testStyle}>{filters}</ul>;
    }

    return (
        <ReactCSS transitionName="filter-transition" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          { content }
        </ReactCSS>
    );
  }

});

module.exports = GenreFilter;

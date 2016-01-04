var React = require('react');

var FilterItem = React.createClass({
  handleClick: function (e) {
    // debugger;
    this.props.callback(e.target, this.props.item);
  },

  render: function () {
    var className = "filter-item";
    if (this.props.selected === true) {
      className = "filter-item selected-filter"
    }
    return (
      <div onClick={this.handleClick} className={className}>
        {this.props.item.name}
      </div>
    )
  }
});

module.exports = FilterItem;

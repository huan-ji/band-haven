var React = require('react');

var FilterItem = React.createClass({
  handleClick: function (e) {
    // debugger;
    this.props.callback(e.target, this.props.item);
  },

  render: function () {
    return (
      <div onClick={this.handleClick} className="filter-item">
        {this.props.item.name}
      </div>
    )
  }
});

module.exports = FilterItem;

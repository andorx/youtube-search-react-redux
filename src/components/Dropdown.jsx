import React, { PropTypes } from 'react';

/**
 * Content filter components
 */
class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Filter change handler
   * @param  {Object} event DOMEvent
   */
  handleChange(event) {
    var filterValue = event.target.value;

    this.props.onFilterChange(this.props.filterBy, filterValue);
  }

  render() {
    function createOption(value, text) {
      return (<option value={value} key={value}>{text}</option>);
    }

    function genOptionsFromObject(options) {
      var optionNodes = [];

      Object.keys(options).map(function(prop) {
        optionNodes.push(createOption(prop, options[prop]));
      });

      return optionNodes;
    }

    return (
      <select
        className="form-select dropdown"
        disabled={this.props.isProcessing === true}
        onChange={this.handleChange}>
        {genOptionsFromObject(this.props.values)}
      </select>
    );
  }
}

Dropdown.propTypes = {
  filterBy: PropTypes.string,
  values: PropTypes.object,
  isProcessing: PropTypes.bool,
  onChange: PropTypes.func
};

export default Dropdown;

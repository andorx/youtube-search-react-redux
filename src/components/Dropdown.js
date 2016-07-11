import React from 'react';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    var filterValue = event.target.value;

    this.props.actions.setContentFilter(this.props.filterBy, filterValue);
    this.props.actions.fetchSearchResults();
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
      <select className="form-select" onChange={this.handleChange}>
        {genOptionsFromObject(this.props.values)}
      </select>
    );
  }
}

export default Dropdown;

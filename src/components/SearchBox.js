import React from 'react';

class SearchBox extends React.Component {
  // state = {
  //   keyword: ''
  // }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({
      keyword: this.refs.keyword.value
    });
  }

  render() {
    return (
      <div className="form-group search-box">
        <input
          type="text"
          className="form-input input-lg"
          placeholder="Type anything to start searching..."
          // value={this.state.keyword}
          ref="keyword"
          onChange={this.handleChange}
          />
      </div>
    );
  }
}

export default SearchBox;

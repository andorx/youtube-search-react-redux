import React, { PropTypes } from 'react';

class KeywordInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const keyword = this.refs.keyword.value;

    if (event.which === 13) {
      event.preventDefault();

      this.props.onSubmit(keyword);
    }
  }

  render() {
    return (
      <div className="form-group search-box">
        <input
          type="text"
          className="form-input input-lg"
          placeholder="Type anything to start searching..."
          disabled={this.props.isProcessing == true}
          ref="keyword"
          onKeyDown={this.handleSubmit}
          />
      </div>
    );
  }
}

KeywordInput.propTypes = {
  isProcessing: PropTypes.bool,
  onSubmit: PropTypes.func
};

export default KeywordInput;

import React, { PropTypes } from 'react';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
  }

  handleNavigate(direction) {
    if (direction === 'prev' && !this.props.hasPrevPage()) {
      return;
    }

    if (direction === 'next' && !this.props.hasNextPage()) {
      return;
    }

    this.props.onNavigate(direction);
  }

  render() {
    return (
      <ul className="pagination">
        <li className="page-item">
          <a href='javascript: void(0)'
            className={(this.props.hasPrevPage() && !this.props.isProcessing) ? '' : 'disabled' }
            onClick={this.handleNavigate.bind(this, 'prev')}>
            &larr;
            Previous
          </a>
        </li>
        <li className="page-item">
          <a href='javascript: void(0)'
            className={(this.props.hasNextPage() && !this.props.isProcessing) ? '' : 'disabled' }
            onClick={this.handleNavigate.bind(this, 'next')}>
            Next
            &rarr;
          </a>
        </li>
      </ul>
    );
  }
}

Pagination.propTypes = {
  hasPrevPage: PropTypes.func,
  hasNextPage: PropTypes.func,
  isProcessing: PropTypes.bool,
  onNavigate: PropTypes.func
}

export default Pagination;

import React, { PropTypes } from 'react';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="pagination">
        <li className="page-item prev">
          <a
            href='javascript: void(0)'
            className={(this.props.hasPrevPage() && !this.props.isProcessing) ? '' : 'disabled' }
            onClick={this.props.onNavigate.bind(this, 'prev')}>
            &larr;
            Previous
          </a>
        </li>
        <li className="page-item next">
          <a
            href='javascript: void(0)'
            className={(this.props.hasNextPage() && !this.props.isProcessing) ? '' : 'disabled' }
            onClick={this.props.onNavigate.bind(this, 'next')}>
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

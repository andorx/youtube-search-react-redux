import React, { PropTypes } from 'react';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
  }

  handleNavigate(direction) {
    if (direction === 'prev') {
      if (!this.props.prevPageToken) return;
      this.props.actions.navigateToPrevPage(this.props.prevPageToken);
    } else if (direction === 'next') {
      if (!this.props.nextPageToken) return;
      this.props.actions.navigateToNextPage(this.props.nextPageToken);
    }

    this.props.actions.fetchSearchResults();
  }

  render() {
    return (
      <ul className="pagination">
        <li className="page-item">
          <a href='javascript: void(0)'
            className={(this.props.prevPageToken && !this.props.isProcessing) ? '' : 'disabled' }
            onClick={this.handleNavigate.bind(this, 'prev')}>
            &larr;
            Previous
          </a>
        </li>
        <li className="page-item">
          <a href='javascript: void(0)'
            className={(this.props.nextPageToken && !this.props.isProcessing) ? '' : 'disabled' }
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
  nextPageToken: PropTypes.string,
  prevPageToken: PropTypes.string,
  isProcessing: PropTypes.bool
}

export default Pagination;

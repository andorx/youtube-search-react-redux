import React, { PropTypes } from 'react';
import DropdownFilter from '../containers/DropdownFilter';

/**
 * Component that wraps content filter components
 */
class ContentFilter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="text-center content-filter">
        <div className="form-group inline mr-5 order">
          <DropdownFilter filterBy="order" values={this.props.order} />
        </div>
        <div className="form-group inline mr-5 video-duration">
          <DropdownFilter filterBy="videoDuration" values={this.props.videoDuration} />
        </div>
        <div className="form-group inline mr-5 video-type">
          <DropdownFilter filterBy="videoType" values={this.props.videoType} />
        </div>
      </div>
    );
  }
}

/**
 * Listing of filter values
 * @type {Object}
 */
ContentFilter.defaultProps = {
  // Method is used to order resources
  order: {
    '': 'Sort by',
    'date': 'Upload date',
    'rating': 'Rating',
    'viewCount': 'View count'
  },
  // Filter results based on their duration
  videoDuration: {
    '': 'Duration',
    'long': 'Long (> 20 mins)',
    'medium': 'Medium (4-20 mins)',
    'short': 'Short (< 4 mins)'
  },
  // Restrict a search to a particular type of videos
  videoType: {
    '': 'Type',
    'episode': 'Episode',
    'movie': 'Movie'
  }
};

ContentFilter.propTypes = {
  order: PropTypes.object,
  videoDuration: PropTypes.object,
  videoType: PropTypes.object
}

export default ContentFilter;

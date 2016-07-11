import React from 'react';
import DropdownFilter from '../containers/DropdownFilter';

class ContentFilter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="text-center content-filter">
        <div className="form-group inline mr-5">
          <DropdownFilter filterBy="order" values={this.props.order} />
        </div>
        <div className="form-group inline mr-5">
          <DropdownFilter filterBy="videoDuration" values={this.props.videoDuration} />
        </div>
        <div className="form-group inline mr-5">
          <DropdownFilter filterBy="videoType" values={this.props.videoType} />
        </div>
      </div>
    );
  }
}

ContentFilter.defaultProps = {
  order: {
    '': 'Sort by',
    'date': 'Upload date',
    'rating': 'Rating',
    'viewCount': 'View count'
  },
  videoDuration: {
    '': 'Duration',
    'long': 'Long (> 20 mins)',
    'medium': 'Medium (4-20 mins)',
    'short': 'Short (< 4 mins)'
  },
  videoType: {
    '': 'Type',
    'episode': 'Episode',
    'movie': 'Movie'
  }
};

export default ContentFilter;

import React from 'react';

class ContentFilter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    function createOption(value, text) {
      return (<option value={ value } key={ value }>{ text }</option>);
    }

    function genrateOptionsFromObject(options) {
      var optionNodes = [];

      Object.keys(options).map(function(prop) {
        optionNodes.push(createOption(prop, options[prop]));
      });

      return optionNodes;
    }

    return (
      <div className="text-center content-filter">
        <div className="form-group inline mr-5">
          <select
            className="form-select"
            >
            {genrateOptionsFromObject(this.props.sortBy)}
          </select>
        </div>
        <div className="form-group inline mr-5">
          <select
            className="form-select"
            >
            {genrateOptionsFromObject(this.props.duration)}
          </select>
        </div>
        <div className="form-group inline mr-5">
          <select
            className="form-select"
            >
            {genrateOptionsFromObject(this.props.videoType)}
          </select>
        </div>
      </div>
    );
  }
}

ContentFilter.defaultProps = {
  sortBy: {
    '': 'Sort by',
    'date': 'Upload date',
    'rating': 'Rating',
    'viewCount': 'View count'
  },
  duration: {
    '': 'Duration',
    'any': 'Any',
    'long': 'Long (> 20 mins)',
    'medium': 'Medium (4-20 mins)',
    'short': 'Short (< 4 mins)'
  },
  videoType: {
    '': 'Type',
    'any': 'Any',
    'episode': 'Episode',
    'movie': 'Movie'
  }
};

export default ContentFilter;

import { connect } from 'react-redux';

import VideoList from '../components/VideoList';

/**
 * Mapping necessary state to component props
 * @param  {Object} state Search state
 * @return {Object}       Component props
 */
function mapStateToProps(state) {
  const props = {
    results: state.search.results,
    videoDetails: state.search.videoDetails,
    isProcessing: state.search.isProcessing
  };

  return props;
}

export default connect(mapStateToProps)(VideoList);

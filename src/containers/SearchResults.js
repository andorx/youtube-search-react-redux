import { connect } from 'react-redux';

import VideoList from '../components/VideoList';

function mapStateToProps(state) {
  const props = {
    results: state.search.results
  };

  return props;
}

export default connect(mapStateToProps)(VideoList);

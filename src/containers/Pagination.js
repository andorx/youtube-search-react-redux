import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  navigateToNextPage,
  navigateToPrevPage,
  fetchSearchResults
} from '../actions/actions';
import Pagination from '../components/Pagination';

function mapStateToProps(state) {
  const props = {
    nextPageToken: state.search.nextPageToken,
    prevPageToken: state.search.prevPageToken,
    isProcessing: state.search.isProcessing
  };

  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    navigateToNextPage,
    navigateToPrevPage,
    fetchSearchResults
  };

  const actionMap = {
    actions: bindActionCreators(actions, dispatch)
  };

  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);

import { connect } from 'react-redux';

import {
  navigateToNextPage,
  navigateToPrevPage,
  fetchSearchResults
} from '../actions/actions';
import Pagination from '../components/Pagination';

function mapStateToProps(state) {
  const props = {
    hasPrevPage: function() {
      return state.search.prevPageToken != '';
    },
    hasNextPage: function() {
      return state.search.nextPageToken != '';
    },
    isProcessing: state.search.isProcessing
  };

  return props;
}

function mapDispatchToProps(dispatch) {
  return {
    onNavigate: function(direction) {
      if (direction === 'prev') {
        dispatch(navigateToPrevPage());
      } else if (direction === 'next') {
        dispatch(navigateToNextPage());
      }

      dispatch(fetchSearchResults());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);

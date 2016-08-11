import { connect } from 'react-redux';

import {
  navigateToNextPage,
  navigateToPrevPage,
  fetchSearchResults
} from '../actions/actions';
import Pagination from '../components/Pagination';

/**
 * Mapping necessary state to component props
 * @param  {Object} state Search state
 * @return {Object}       Component props
 */
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

/**
 * Mapping actions to component this.props
 * @param  {Function} dispatch
 * @return {Object}
 */
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

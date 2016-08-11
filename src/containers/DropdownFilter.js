import { connect } from 'react-redux';

import { setContentFilter, resetPageToken, fetchSearchResults } from '../actions/actions';
import Dropdown from '../components/Dropdown';

/**
 * Mapping necessary state to component props
 * @param  {Object} state Search state
 * @return {Object}       Component props
 */
function mapStateToProps(state) {
  const props = {
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
  return  {
    // Content filter change handler
    // thats dispatch related actions
    onFilterChange: function(filterType, filterValue) {
      dispatch(setContentFilter(filterType, filterValue));
      dispatch(resetPageToken());
      dispatch(fetchSearchResults());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);

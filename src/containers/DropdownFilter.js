import { connect } from 'react-redux';

import { setContentFilter, resetPageToken, fetchSearchResults } from '../actions/actions';
import Dropdown from '../components/Dropdown';

// Note: this statement attachs `dispatch` method to props,
// that will be used later in event handler follow dispatch(fetchData())
function mapStateToProps(state) {
  const props = {
    isProcessing: state.search.isProcessing
  };

  return props;
}

// Note: this state attachs specific actions to props,
// that will be used later follow this.props.actions.fetchData()
function mapDispatchToProps(dispatch) {
  return  {
    onFilterChange: function(filterType, filterValue) {
      dispatch(setContentFilter(filterType, filterValue));
      dispatch(resetPageToken());
      dispatch(fetchSearchResults());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);

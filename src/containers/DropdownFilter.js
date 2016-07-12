import { connect } from 'react-redux';

import { setContentFilter, resetPageToken, fetchSearchResults } from '../actions/actions';
import Dropdown from '../components/Dropdown';

function mapStateToProps(state) {
  const props = {
    isProcessing: state.search.isProcessing
  };

  return props;
}

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

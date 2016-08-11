import { connect } from 'react-redux';

import { changeKeyword, resetPageToken, fetchSearchResults } from '../actions/actions';
import KeywordInput from '../components/KeywordInput';

/**
 * Mapping necessary state to component props
 * @param  {Object} state Search state
 * @return {Object}       Component props
 */
function mapStateToProps(state) {
  const props = {
    keyword: state.search.keyword,
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
    onSubmit: function(keyword) {
      dispatch(changeKeyword(keyword));
      dispatch(resetPageToken());
      dispatch(fetchSearchResults());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(KeywordInput);

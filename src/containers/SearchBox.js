import { connect } from 'react-redux';

import { changeKeyword, fetchSearchResults } from '../actions/actions';
import KeywordInput from '../components/KeywordInput';

function mapStateToProps(state) {
  const props = {
    keyword: state.search.keyword,
    isProcessing: state.search.isProcessing
  };

  return props;
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: function(keyword) {
      dispatch(changeKeyword(keyword));
      dispatch(fetchSearchResults());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(KeywordInput);

import { bindActionCreators } from 'redux';
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
  const actions = {
    changeKeyword,
    fetchSearchResults
  };

  const actionMap = {
    actions: bindActionCreators(actions, dispatch)
  };

  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(KeywordInput);

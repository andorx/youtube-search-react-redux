import { combineReducers } from 'redux';

import * as actionTypes from '../constants/actionTypes';

const reducers = {
  search
};

function search(state = {
  isProcessing: false,
  keyword: '',
  filters: {
    order: '',
    videoDuration: '',
    videoType: ''
  },
  pageToken: '',
  nextPageToken: '',
  prevPageToken: '',
  results: []
}, action) {
  switch(action.type) {
    case actionTypes.CHANGE_KEYWORD: {
      return Object.assign({}, state, {
        keyword: action.keyword
      });
    }

    case actionTypes.SEARCH_FOR_VIDEOS: {
      return Object.assign({}, state, {
        isProcessing: true
      });
    }

    case actionTypes.RECEIVE_SEARCH_RESULTS: {
      return Object.assign({}, state, {
        isProcessing: false,
        results: action.results
      });
    }

    case actionTypes.NAVIGATE_TO_NEXT_PAGE: {
      return Object.assign({}, state, {
        pageToken: action.pageToken
      });
    }

    case actionTypes.NAVIGATE_TO_PREV_PAGE: {
      return Object.assign({}, state, {
        pageToken: action.pageToken
      });
    }

    case actionTypes.SET_CONTENT_FILTER: {
      var filters = Object.assign({}, state.filters, {
        [action.filterType]: action.filterValue
      });

      return Object.assign({}, state, {
        filters
      });
    }

    case actionTypes.SET_PREV_PAGE_TOKEN: {
      return Object.assign({}, state, {
        prevPageToken: action.prevPageToken
      });
    }

    case actionTypes.SET_NEXT_PAGE_TOKEN: {
      return Object.assign({}, state, {
        nextPageToken: action.nextPageToken
      });
    }

    default:
      return state;
  }
}

export default combineReducers(reducers);

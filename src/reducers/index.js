import { combineReducers } from 'redux';

import * as actionTypes from '../constants/actionTypes';

const reducers = {
  search
};
/**
 * Search actions reducer
 * @param  {Object} state   Search state
 * @param  {Object} action  Minimal action description
 * @return {Object}         Next state after action in another instance
 */
function search(state = {
  isProcessing: false, // processing flag
  keyword: '', // search keyword
  filters: { // content filters
    order: '',
    videoDuration: '',
    videoType: ''
  },
  pageToken: '', // Current page token
  nextPageToken: '', // Next page token if existed
  prevPageToken: '', // Previous page token if existed
  results: [], // Search results
  videoDetails: {} // Video details
}, action) {

  switch(action.type) {
    case actionTypes.CHANGE_KEYWORD: {
      // Update keyword
      return Object.assign({}, state, {
        keyword: action.keyword
      });
    }

    case actionTypes.SEARCH_FOR_VIDEOS: {
      // Update processing flag
      return Object.assign({}, state, {
        isProcessing: true
      });
    }

    case actionTypes.RECEIVE_SEARCH_RESULTS: {
      // Update processing flag and search results
      return Object.assign({}, state, {
        isProcessing: false,
        results: action.results
      });
    }

    case actionTypes.SEARCH_FOR_VIDEOS_FAILURE: {
      // Update processing flag
      return Object.assign({}, state, {
        isProcessing: false
      });
    }

    case actionTypes.NAVIGATE_TO_NEXT_PAGE: {
      // Set pageToken to next page token
      return Object.assign({}, state, {
        pageToken: state.nextPageToken
      });
    }

    case actionTypes.NAVIGATE_TO_PREV_PAGE: {
      // Set pageToken to previous page token
      return Object.assign({}, state, {
        pageToken: state.prevPageToken
      });
    }

    case actionTypes.SET_CONTENT_FILTER: {
      // Update content filter key value pair
      var filters = Object.assign({}, state.filters, {
        [action.filterType]: action.filterValue
      });

      return Object.assign({}, state, {
        filters
      });
    }

    case actionTypes.SET_PREV_PAGE_TOKEN: {
      // Set previous page token
      return Object.assign({}, state, {
        prevPageToken: action.prevPageToken
      });
    }

    case actionTypes.SET_NEXT_PAGE_TOKEN: {
      // Set next page token
      return Object.assign({}, state, {
        nextPageToken: action.nextPageToken
      });
    }

    case actionTypes.RESET_PAGE_TOKEN: {
      // Clear page tokens
      return Object.assign({}, state, {
        nextPageToken: '',
        prevPageToken: '',
        pageToken: ''
      });
    }

    case actionTypes.RECEIVE_VIDEO_DETAILS: {
      // Update video details
      return Object.assign({}, state, {
        videoDetails: action.results
      });
    }

    default:
      return state;
  }
}

export default combineReducers(reducers);

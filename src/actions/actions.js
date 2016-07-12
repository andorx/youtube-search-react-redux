import fetch from 'isomorphic-fetch';

import * as actionTypes from '../constants/actionTypes';
import * as YoutubeAPI from '../constants/YoutubeAPI';

export function changeKeyword(keyword) {
  return {
    type: actionTypes.CHANGE_KEYWORD,
    keyword
  };
}

function searchForVideos() {
  return {
    type: actionTypes.SEARCH_FOR_VIDEOS
  };
}

function receiveSearchResult(results) {
  return {
    type: actionTypes.RECEIVE_SEARCH_RESULTS,
    results
  };
}

export function setContentFilter(filterType, filterValue) {
  return {
    type: actionTypes.SET_CONTENT_FILTER,
    filterType,
    filterValue
  };
}

export function navigateToNextPage() {
  return {
    type: actionTypes.NAVIGATE_TO_NEXT_PAGE
  };
}

export function navigateToPrevPage() {
  return {
    type: actionTypes.NAVIGATE_TO_PREV_PAGE
  };
}

function setPrevPageToken(prevPageToken) {
  return {
    type: actionTypes.SET_PREV_PAGE_TOKEN,
    prevPageToken
  }
}

function setNextPageToken(nextPageToken) {
  return {
    type: actionTypes.SET_NEXT_PAGE_TOKEN,
    nextPageToken
  }
}

export function resetPageToken() {
  return {
    type: actionTypes.RESET_PAGE_TOKEN
  };
}

export function fetchSearchResults() {
  return (dispatch, getState) => {
    const state = getState();
    const {
      keyword,
      filters,
      pageToken,
      maxResults
    } = state.search;

    const SEARCH_API =
      YoutubeAPI.URL +
      queryBuilder(YoutubeAPI.KEY, keyword, filters, pageToken, maxResults);

    dispatch(searchForVideos());

    return fetch(SEARCH_API)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveSearchResult(json.items));

        if (json.prevPageToken) {
          dispatch(setPrevPageToken(json.prevPageToken));
        } else {
          dispatch(setPrevPageToken(''));
        }

        if (json.nextPageToken) {
          dispatch(setNextPageToken(json.nextPageToken));
        } else {
          dispatch(setNextPageToken(''));
        }
      })
      .catch(error => { throw error; });
  };
}

function queryBuilder(key, keyword, filters, pageToken, maxResults) {
  var params = {
      part: 'snippet',
      type: 'video',
      q: keyword,
      pageToken,
      key,
      maxResults,
      ...filters
    };

  return '?' + Object.keys(params).map(function(key) {
    if (params[key]) {
      return [key, params[key]].map(encodeURIComponent).join('=');
    }

    return '';
  }).join('&');
}

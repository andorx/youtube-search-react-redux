import fetch from 'isomorphic-fetch';

import * as actionTypes from '../constants/actionTypes';
import * as YoutubeAPI from '../constants/YoutubeAPI';

/**
 * Changing keyword action
 * @param  {string} keyword Search keyword
 * @return {Object}         Minimal action description
 */
export function changeKeyword(keyword) {
  return {
    type: actionTypes.CHANGE_KEYWORD,
    keyword
  };
}

/**
 * Searching action
 * @return {Object} Minimal action description
 */
export function searchForVideos() {
  return {
    type: actionTypes.SEARCH_FOR_VIDEOS
  };
}

/**
 * Receiving search results action
 * @param  {Array} results Search results
 * @return {Object}         Minimal action description
 */
export function receiveSearchResult(results) {
  return {
    type: actionTypes.RECEIVE_SEARCH_RESULTS,
    results
  };
}

/**
 * Searching failure action
 * @param  {String} reason Reason
 * @return {Object}        Minimal action description
 */
export function searchVideoFailure(reason) {
  return {
    type: actionTypes.SEARCH_FOR_VIDEOS_FAILURE,
    reason
  }
}

/**
 * Fetching video details action
 * @return {Object} Minimal action description
 */
export function requestVideoDetails() {
  return {
    type: actionTypes.REQUEST_VIDEO_DETAILS
  }
}

/**
 * Receiving video details action
 * @param  {Object} results Video details
 * @return {Object}         Minimal action description
 */
export function receiveVideoDetails(results) {
  return {
    type: actionTypes.RECEIVE_VIDEO_DETAILS,
    results
  }
}

/**
 * Requesting video failure action
 * @param  {String} reason Reason
 * @return {Object}        Minimal action description
 */
export function requestVideoDetailsFailure(reason) {
  return {
    type: actionTypes.REQUEST_VIDEO_DETAILS_FAILURE,
    reason
  }
}

/**
 * Changing content filter action
 * @param {String} filterType  Filter type
 * @param {String} filterValue Filter value
 * @return {Object}            Minimal action description
 */
export function setContentFilter(filterType, filterValue) {
  return {
    type: actionTypes.SET_CONTENT_FILTER,
    filterType,
    filterValue
  };
}

/**
 * Navigating to next page action
 * @return {Object} Minimal action description
 */
export function navigateToNextPage() {
  return {
    type: actionTypes.NAVIGATE_TO_NEXT_PAGE
  };
}

/**
 * Navigating to prev page action
 * @return {Object} Minimal action description
 */
export function navigateToPrevPage() {
  return {
    type: actionTypes.NAVIGATE_TO_PREV_PAGE
  };
}

/**
 * Setting previous page token
 * @param {String} prevPageToken Previous page token
 * @return {Object}              Minimal action description
 */
export function setPrevPageToken(prevPageToken) {
  return {
    type: actionTypes.SET_PREV_PAGE_TOKEN,
    prevPageToken
  }
}

/**
 * Setting next page token
 * @param {String} nextPageToken Next page token
 * @return {Object}              Minimal action description
 */
export function setNextPageToken(nextPageToken) {
  return {
    type: actionTypes.SET_NEXT_PAGE_TOKEN,
    nextPageToken
  }
}

/**
 * Resetting page token
 * @return {Object} Minimal action description
 */
export function resetPageToken() {
  return {
    type: actionTypes.RESET_PAGE_TOKEN
  };
}

/**
 * Fetching search results async action
 * @return {Function} Tail function that will be called by dispatch
 */
export function fetchSearchResults() {
  return (dispatch, getState) => {
    const state = getState();
    const {
      keyword,
      filters,
      pageToken
    } = state.search;

    // Building search endpoint
    const SEARCH_API = YoutubeAPI.URL + 'search' +
      searchQueryBuilder(YoutubeAPI.KEY, keyword, filters, pageToken);

    // Dispatch searching action
    dispatch(searchForVideos());

    return fetch(SEARCH_API)
      .then(response => {
        // Request error handler
        if (response.status >= 400) {
          return response.json()
            .then(function(json) {
              throw json.error.message;
            });
        }

        return response.json();
      })
      .then(searchResults => {
        // Dispatch receiving search results
        dispatch(receiveSearchResult(searchResults.items));

        // Dispatch setting prev page token
        if (searchResults.prevPageToken) {
          dispatch(setPrevPageToken(searchResults.prevPageToken));
        } else {
          dispatch(setPrevPageToken(''));
        }

        // Dispatch setting next page token
        if (searchResults.nextPageToken) {
          dispatch(setNextPageToken(searchResults.nextPageToken));
        } else {
          dispatch(setNextPageToken(''));
        }

        // Dispatch fetching video details if there are items in search results
        if (searchResults.items && searchResults.items.length > 0) {
          dispatch(fetchVideoDetails(searchResults.items));
        }

        return searchResults.items;
      })
      .catch(reason => {
        // Dispatch searching failure
        dispatch(searchVideoFailure(reason));
      });
  };
}

/**
 * Fetching video videos async action
 * @param  {Array} videoSnippets Search video results
 * @return {Object}              Tail function that will be called by dispatch
 */
export function fetchVideoDetails(videoSnippets) {
  return dispatch => {
    let VIDEO_DETAILS_API,
        // Filter out video ids
        videoIds = videoSnippets.map(function(snippet) {
          return snippet.id.videoId;
        });

    // Building fetch video details endpoint
    VIDEO_DETAILS_API = YoutubeAPI.URL + 'videos' +
      videoDetailsQueryBuilder(YoutubeAPI.KEY, videoIds);

    // Dispatch requesting video details
    dispatch(requestVideoDetails(videoIds));

    return fetch(VIDEO_DETAILS_API)
      .then(response => {
        // Request error handler
        if (response.status >= 400) {
          return response.json()
            .then(function(json) {
              throw json.error.message;
            });
        }

        return response.json();
      })
      .then(results => {
        var videoDetails = {};

        // Build up a object contains video details
        if (results.items && results.items.length > 0) {
          results.items.forEach(function(item) {
            videoDetails[item.id] = item;
          });

          // Dispatch receving video details
          dispatch(receiveVideoDetails(videoDetails));
        }

        return videoDetails;
      })
      .catch(reason => {
        // Dispatch fetching failure
        dispatch(requestVideoDetailsFailure(reason));
      });
  };
}

/**
 * Building search video query
 * @param  {String} key       YoutubeAPI key
 * @param  {String} keyword   Search keyword
 * @param  {Object} filters   Content filters
 * @param  {String} pageToken Page token
 * @return {String}           Search video query
 */
function searchQueryBuilder(key, keyword, filters, pageToken) {
  var params = {
      key,
      part: 'snippet',
      type: 'video',
      q: keyword,
      pageToken,
      maxResults: YoutubeAPI.MAX_RESULTS,
      ...filters
    };

  return paramsBuilder(params);
}

/**
 * Building fetch video details query
 * @param  {String} key      YoutubeAPI key
 * @param  {String} videoIds Comma-delimited video ids list
 * @return {String}          Fetch video details query
 */
function videoDetailsQueryBuilder(key, videoIds) {
  var params = {
      key,
      part: 'contentDetails,statistics,status',
      id: videoIds.join(','),
      maxResults: YoutubeAPI.MAX_RESULTS
    };

  return paramsBuilder(params);
}

/**
 * Building query string from given parameters
 * @param  {Object} params Parameters
 * @return {String}
 */
export function paramsBuilder(params) {
  var query = '?' + Object.keys(params).map(function(key) {
    if (params[key]) {
      return [key, params[key]].map(encodeURIComponent).join('=');
    }

    return '';
  }).join('&');

  return query
    .replace(/&+/gm, '&') // Reduce sequence ampersands
    .replace(/&+$/gm,''); // Remove ending ampersands
}

import fetch from 'isomorphic-fetch';

import * as actionTypes from '../constants/actionTypes';
import * as YoutubeAPI from '../constants/YoutubeAPI';

export function changeKeyword(keyword) {
  return {
    type: actionTypes.CHANGE_KEYWORD,
    keyword
  };
}

export function searchForVideos() {
  return {
    type: actionTypes.SEARCH_FOR_VIDEOS
  };
}

export function receiveSearchResult(results) {
  return {
    type: actionTypes.RECEIVE_SEARCH_RESULTS,
    results
  };
}

export function searchVideoFailure(reason) {
  return {
    type: actionTypes.SEARCH_FOR_VIDEOS_FAILURE,
    reason
  }
}

export function requestVideoDetails() {
  return {
    type: actionTypes.REQUEST_VIDEO_DETAILS
  }
}

export function receiveVideoDetails(results) {
  return {
    type: actionTypes.RECEIVE_VIDEO_DETAILS,
    results
  }
}

export function requestVideoDetailsFailure(reason) {
  return {
    type: actionTypes.REQUEST_VIDEO_DETAILS_FAILURE,
    reason
  }
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

export function setPrevPageToken(prevPageToken) {
  return {
    type: actionTypes.SET_PREV_PAGE_TOKEN,
    prevPageToken
  }
}

export function setNextPageToken(nextPageToken) {
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
      pageToken
    } = state.search;

    const SEARCH_API = YoutubeAPI.URL + 'search' +
      searchQueryBuilder(YoutubeAPI.KEY, keyword, filters, pageToken);

    dispatch(searchForVideos());

    return fetch(SEARCH_API)
      .then(response => {
        if (response.status >= 400) {
          return response.json()
            .then(function(json) {
              throw json.error.message;
            });
        }

        return response.json();
      })
      .then(searchResults => {
        dispatch(receiveSearchResult(searchResults.items));

        if (searchResults.prevPageToken) {
          dispatch(setPrevPageToken(searchResults.prevPageToken));
        } else {
          dispatch(setPrevPageToken(''));
        }

        if (searchResults.nextPageToken) {
          dispatch(setNextPageToken(searchResults.nextPageToken));
        } else {
          dispatch(setNextPageToken(''));
        }

        if (searchResults.items && searchResults.items.length > 0) {
          dispatch(fetchVideoDetails(searchResults.items));
        }

        return searchResults.items;
      })
      .catch(reason => {
        dispatch(searchVideoFailure(reason));
      });
  };
}

export function fetchVideoDetails(videoSnippets) {
  return dispatch => {
    let VIDEO_DETAILS_API,
        videoIds = videoSnippets.map(function(snippet) {
          return snippet.id.videoId;
        });

    VIDEO_DETAILS_API = YoutubeAPI.URL + 'videos' +
      videoDetailsQueryBuilder(YoutubeAPI.KEY, videoIds);

    dispatch(requestVideoDetails(videoIds));

    return fetch(VIDEO_DETAILS_API)
      .then(response => {
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

        if (results.items && results.items.length > 0) {
          results.items.forEach(function(item) {
            videoDetails[item.id] = item;
          });

          dispatch(receiveVideoDetails(videoDetails));
        }

        return videoDetails;
      })
      .catch(reason => {
        dispatch(requestVideoDetailsFailure(reason));
      });
  };
}

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

function videoDetailsQueryBuilder(key, videoIds) {
  var params = {
      key,
      part: 'contentDetails,statistics,status',
      id: videoIds.join(','),
      maxResults: YoutubeAPI.MAX_RESULTS
    };

  return paramsBuilder(params);
}

export function paramsBuilder(params) {
  var query = '?' + Object.keys(params).map(function(key) {
    if (params[key]) {
      return [key, params[key]].map(encodeURIComponent).join('=');
    }

    return '';
  }).join('&');

  return query
    .replace(/&+/gm, '&')
    .replace(/&+$/gm,'');
}

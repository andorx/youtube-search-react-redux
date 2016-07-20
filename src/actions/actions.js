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

function fetchVideoDetails(videoIds) {
  return {
    type: actionTypes.FETCH_VIDEO_DETAILS
  }
}

function receiveVideoDetails(results) {
  return {
    type: actionTypes.RECEIVE_VIDEO_DETAILS,
    results
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

    const SEARCH_API = YoutubeAPI.URL + 'search' +
      searchQueryBuilder(YoutubeAPI.KEY, keyword, filters, pageToken, maxResults);

    dispatch(searchForVideos());

    return fetch(SEARCH_API)
      .then(response => response.json())
      .then(json => {
        var videoIds = [];

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

        return json.items;
      })
      // Fetching video details in background
      .then(function(items) {
        let VIDEO_DETAILS_API,
            videoIds = items.map(function(item) {
              return item.id.videoId;
            });

        VIDEO_DETAILS_API = YoutubeAPI.URL + 'videos' +
          videoDetailsQueryBuilder(YoutubeAPI.KEY, videoIds, maxResults);

        dispatch(fetchVideoDetails(videoIds));

        return fetch(VIDEO_DETAILS_API)
          .then(response => response.json())
          .then(json => {
            var videoDetails = {};

            json.items.forEach(function(item) {
              videoDetails[item.id] = item;
            });
            dispatch(receiveVideoDetails(videoDetails));

            return videoDetails;
          });
      })
      .catch(error => { throw error; });
  };
}

function searchQueryBuilder(key, keyword, filters, pageToken, maxResults) {
  var params = {
      part: 'snippet',
      type: 'video',
      q: keyword,
      pageToken,
      key,
      maxResults,
      ...filters
    };

  return paramsBuilder(params);
}

function videoDetailsQueryBuilder(key, videoIds, maxResults) {
  var params = {
      key,
      part: 'contentDetails,statistics,status',
      id: videoIds.join(','),
      maxResults
    };

  return paramsBuilder(params);
}

function paramsBuilder(params) {
  return '?' + Object.keys(params).map(function(key) {
    if (params[key]) {
      return [key, params[key]].map(encodeURIComponent).join('=');
    }

    return '';
  }).join('&');
}

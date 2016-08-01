import { expect } from 'chai';

import * as actionTypes from '../src/constants/actionTypes.js';
import reducer from '../src/reducers/index';

describe('search reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal({
      search: {
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
        results: [],
        videoDetails: {}
      }
    });
  });

  it('should handle CHANGE_KEYWORD', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.CHANGE_KEYWORD,
        keyword: 'foo'
      })
    ).to.have.deep.property('search.keyword', 'foo');
  });

  it('should handle SEARCH_FOR_VIDEOS', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.SEARCH_FOR_VIDEOS
      })
    ).to.have.deep.property('search.isProcessing', true);
  });

  it('should handle RECEIVE_SEARCH_RESULTS', () => {
    var nextState = reducer(undefined, {
      type: actionTypes.RECEIVE_SEARCH_RESULTS,
      results: [{
        foo: 'foo'
      }]
    });

    expect(nextState.search.isProcessing).to.not.be.true;
    expect(nextState.search.results).to.be.instanceof(Array);
  });

  it('should handle SEARCH_FOR_VIDEOS_FAILURE', () => {
    var nextState = reducer(undefined, {
      type: actionTypes.SEARCH_FOR_VIDEOS_FAILURE,
      reason: 'lorem ipsum'
    });

    expect(nextState.search.isProcessing).to.not.be.true;
    expect(nextState.search.results).to.be.empty;;
  });

  it('should handle NAVIGATE_TO_NEXT_PAGE', () => {
    expect(
      reducer({
        search: {
          nextPageToken: 'foo'
        }
      }, {
        type: actionTypes.NAVIGATE_TO_NEXT_PAGE
      })
    ).to.have.deep.property('search.pageToken', 'foo');
  });

  it('should handle NAVIGATE_TO_PREV_PAGE', () => {
    expect(
      reducer({
        search: {
          prevPageToken: 'foo'
        }
      }, {
        type: actionTypes.NAVIGATE_TO_PREV_PAGE
      })
    ).to.have.deep.property('search.pageToken', 'foo');
  });

  it('should handle SET_CONTENT_FILTER', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.SET_CONTENT_FILTER,
        filterType: 'order',
        filterValue: 'foo'
      })
    ).to.have.deep.property('search.filters.order', 'foo');

    expect(
      reducer(undefined, {
        type: actionTypes.SET_CONTENT_FILTER,
        filterType: 'videoDuration',
        filterValue: 'foo'
      })
    ).to.have.deep.property('search.filters.videoDuration', 'foo');

    expect(
      reducer(undefined, {
        type: actionTypes.SET_CONTENT_FILTER,
        filterType: 'videoType',
        filterValue: 'foo'
      })
    ).to.have.deep.property('search.filters.videoType', 'foo');
  });

  it('should handle SET_PREV_PAGE_TOKEN', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.SET_PREV_PAGE_TOKEN,
        prevPageToken: 'foo'
      })
    ).to.have.deep.property('search.prevPageToken', 'foo');
  });

  it('should handle SET_NEXT_PAGE_TOKEN', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.SET_NEXT_PAGE_TOKEN,
        nextPageToken: 'foo'
      })
    ).to.have.deep.property('search.nextPageToken', 'foo');
  });

  it('should handle RESET_PAGE_TOKEN', () => {
    var nextState = reducer(undefined, {
      type: actionTypes.RESET_PAGE_TOKEN
    });

    expect(nextState.search.nextPageToken).to.be.empty;
    expect(nextState.search.prevPageToken).to.be.empty;
    expect(nextState.search.pageToken).to.be.empty;
  });

  it('should handle RECEIVE_VIDEO_DETAILS', () => {
    var nextState = reducer(undefined, {
      type: actionTypes.RECEIVE_VIDEO_DETAILS,
      results: {
        foo: { }
      }
    });

    expect(nextState.search.videoDetails).to.be.an('object');
  });
});

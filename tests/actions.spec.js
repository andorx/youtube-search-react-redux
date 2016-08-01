import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import * as YoutubeAPI from '../src/constants/YoutubeAPI.js';
import * as actionTypes from '../src/constants/actionTypes.js';
import * as actions from '../src/actions/actions.js';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  it('should create an action to change keyword', () => {
    expect(actions.changeKeyword('foo')).to.deep.equal({
      type: actionTypes.CHANGE_KEYWORD,
      keyword: 'foo'
    })
  });

  it('should create an action to search for videos', () => {
    expect(actions.searchForVideos()).to.deep.equal({
      type: actionTypes.SEARCH_FOR_VIDEOS
    });
  });

  it('should create an action to retrieve search results', () => {
    const results = ['foo', 'bar'];

    expect(actions.receiveSearchResult(results)).to.deep.equal({
      type: actionTypes.RECEIVE_SEARCH_RESULTS,
      results
    });
  });

  it('should create an action to inform search video failure', () => {
    const reason = 'no results found';

    expect(actions.searchVideoFailure(reason)).to.deep.equal({
      type: actionTypes.SEARCH_FOR_VIDEOS_FAILURE,
      reason
    });
  });

  it('should create an action to fetch video details', () => {
    expect(actions.requestVideoDetails()).to.deep.equal({
      type: actionTypes.REQUEST_VIDEO_DETAILS
    });
  });

  it('should create an action to receive video details', () => {
    const results = ['foo', 'bar'];

    expect(actions.receiveVideoDetails(results)).to.deep.equal({
      type: actionTypes.RECEIVE_VIDEO_DETAILS,
      results
    });
  });

  it('should create an action to set content filter', () => {
    const filterType = 'foo',
          filterValue = 'bar';

    expect(actions.setContentFilter(filterType, filterValue)).to.deep.equal({
      type: actionTypes.SET_CONTENT_FILTER,
      filterType,
      filterValue
    });
  });

  it('should create an action to navigate to next result page', () => {
    expect(actions.navigateToNextPage()).to.deep.equal({
      type: actionTypes.NAVIGATE_TO_NEXT_PAGE
    });
  });

  it('should create an action to navigate to previous result page', () => {
    expect(actions.navigateToPrevPage()).to.deep.equal({
      type: actionTypes.NAVIGATE_TO_PREV_PAGE
    });
  });

  it('should create an action to set next page token', () => {
    const nextPageToken = 'foo';

    expect(actions.setNextPageToken(nextPageToken)).to.deep.equal({
      type: actionTypes.SET_NEXT_PAGE_TOKEN,
      nextPageToken
    });
  });

  it('should create an action to set previous page token', () => {
    const prevPageToken = 'foo';

    expect(actions.setPrevPageToken(prevPageToken)).to.deep.equal({
      type: actionTypes.SET_PREV_PAGE_TOKEN,
      prevPageToken
    });
  });

  it('should create an action to reset page token', () => {
    expect(actions.resetPageToken()).to.deep.equal({
      type: actionTypes.RESET_PAGE_TOKEN
    });
  });

  it('should generate a url query from params', () => {
    const params = {
      foo: 'foo',
      bar: 'bar',
      blah: ''
    };

    expect(actions.paramsBuilder(params)).to.equal('?foo=foo&bar=bar');
  });

  it('creates RECEIVE_SEARCH_RESULTS when SEARCH_FOR_VIDEOS has been done', () => {
    nock(YoutubeAPI.URL + 'search')
      .get('?key=' + YoutubeAPI.KEY + '&part=snippet&type=video&q=react&maxResults=12')
      .reply(200, {
        nextPageToken: 'next',
        prevPageToken: 'prev',
        items: [{
          foo: 'foo',
          id: {
            videoId: 'bar'
          }
        }]
      });

    nock(YoutubeAPI.URL + 'videos')
      .get('?key=' + YoutubeAPI.KEY + '&part=contentDetails%2Cstatistics%2Cstatus&id=bar&maxResults=12')
      .reply(200, {
        items: [{
          foo: 'foo',
          id: 'bar'
        }]
      });
    const store = mockStore({
      search: {
        keyword: 'react',
        results: []
      }
    });


    const expectedActions = [
      { type: actionTypes.SEARCH_FOR_VIDEOS },
      { type: actionTypes.RECEIVE_SEARCH_RESULTS, results: [{
          foo: 'foo',
          id: {
            videoId: 'bar'
          }
        }]
      },
      { type: actionTypes.SET_PREV_PAGE_TOKEN, prevPageToken: 'prev' },
      { type: actionTypes.SET_NEXT_PAGE_TOKEN, nextPageToken: 'next' },
      { type: actionTypes.REQUEST_VIDEO_DETAILS }
    ];

    return store.dispatch(actions.fetchSearchResults())
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('creates RECEIVE_SEARCH_RESULTS when SEARCH_FOR_VIDEOS has been done with only one page result', () => {
    nock(YoutubeAPI.URL + 'search')
      .get('?key=' + YoutubeAPI.KEY + '&part=snippet&type=video&q=react&maxResults=12')
      .reply(200, {
        items: [{
          foo: 'foo',
          id: {
            videoId: 'bar'
          }
        }]
      });

    nock(YoutubeAPI.URL + 'videos')
      .get('?key=' + YoutubeAPI.KEY + '&part=contentDetails%2Cstatistics%2Cstatus&id=bar&maxResults=12')
      .reply(200, {
        items: [{
          foo: 'foo',
          id: 'bar'
        }]
      });
    const store = mockStore({
      search: {
        keyword: 'react',
        results: []
      }
    });

    const expectedActions = [
      { type: actionTypes.SEARCH_FOR_VIDEOS },
      { type: actionTypes.RECEIVE_SEARCH_RESULTS, results: [{
          foo: 'foo',
          id: {
            videoId: 'bar'
          }
        }]
      },
      { type: actionTypes.SET_PREV_PAGE_TOKEN, prevPageToken: '' },
      { type: actionTypes.SET_NEXT_PAGE_TOKEN, nextPageToken: '' },
      { type: actionTypes.REQUEST_VIDEO_DETAILS }
    ];

    return store.dispatch(actions.fetchSearchResults())
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('creates RECEIVE_SEARCH_RESULTS when SEARCH_FOR_VIDEOS has been done with no results', () => {
    nock(YoutubeAPI.URL + 'search')
      .get('?key=' + YoutubeAPI.KEY + '&part=snippet&type=video&q=react&maxResults=12')
      .reply(200, {
        items: []
      });

    const store = mockStore({
      search: {
        keyword: 'react',
        results: []
      }
    });

    const expectedActions = [
      { type: actionTypes.SEARCH_FOR_VIDEOS },
      { type: actionTypes.RECEIVE_SEARCH_RESULTS, results: [] },
      { type: actionTypes.SET_PREV_PAGE_TOKEN, prevPageToken: '' },
      { type: actionTypes.SET_NEXT_PAGE_TOKEN, nextPageToken: '' }
    ];

    return store.dispatch(actions.fetchSearchResults())
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('creates SEARCH_FOR_VIDEOS_FAILURE when SEARCH_FOR_VIDEOS has been done with error', () => {
    nock(YoutubeAPI.URL + 'search')
      .get('?key=' + YoutubeAPI.KEY + '&part=snippet&type=video&q=react&maxResults=12')
      .reply(400, {
        error: {
          code: 400,
          message: 'Foo'
        }
      });

    const store = mockStore({
      search: {
        keyword: 'react'
      }
    });

    const expectedActions = [
      { type: actionTypes.SEARCH_FOR_VIDEOS },
      { type: actionTypes.SEARCH_FOR_VIDEOS_FAILURE, reason: 'Foo' }
    ];

    return store.dispatch(actions.fetchSearchResults())
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('creates REQUEST_VIDEO_DETAILS_FAILURE when RECEIVE_VIDEO_DETAILS has been done with error', () => {
    nock(YoutubeAPI.URL + 'videos')
      .get('?key=' + YoutubeAPI.KEY + '&part=contentDetails%2Cstatistics%2Cstatus&id=bar&maxResults=12')
      .reply(400, {
        error: {
          code: 400,
          message: 'Foo'
        }
      });
    const store = mockStore({
      search: {
        keyword: 'react'
      }
    });

    const expectedActions = [
      { type: actionTypes.REQUEST_VIDEO_DETAILS },
      { type: actionTypes.REQUEST_VIDEO_DETAILS_FAILURE, reason: 'Foo' }
    ];

    return store.dispatch(actions.fetchVideoDetails([
        {
          foo: 'foo',
          id: {
            videoId: 'bar'
          }
        }
      ]))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });
});

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import { expect } from 'chai';

import createComponent from './helpers/shallowRenderHelper';
import KeywordInput from '../src/components/KeywordInput';
import Dropdown from '../src/components/Dropdown';
import Pagination from '../src/components/Pagination';
import VideoList from '../src/components/VideoList';

describe('components', () => {
  describe('KeywordInput', () => {
    it('should have className \'search-box\'', () => {
      const KeywordInputComponent = createComponent(KeywordInput, {
        isProcessing: false
      });

      expect(KeywordInputComponent.props.className).to.contain('search-box');
    });

    it('should have a disabled input', () => {
      const KeywordInputComponent = createComponent(KeywordInput, {
        isProcessing: true
      });
      const input = KeywordInputComponent.props.children;

      expect(input.props.disabled).to.be.true;
    });

    it('should handle keydown event', () => {
      const callback = function(keyword) {
        return keyword;
      };
      let callbackSpy = sinon.spy(callback);

      const component = TestUtils.renderIntoDocument(
         <KeywordInput onSubmit={ callbackSpy } />
      );
      const input = TestUtils.findRenderedDOMComponentWithTag(
         component, 'input'
      );

      input.value = 'foo';

      TestUtils.Simulate.keyDown(input, {
        key: 'Enter',
        keyCode: 13,
        which: 13
      });

      sinon.assert.calledWith(callbackSpy, 'foo');
    });
  });

  describe('Dropdown', () => {
    it('should have className \'dropdown\'', () => {
      const DropdownComponent = createComponent(Dropdown, {
        isProcessing: false,
        values: {}
      });

      expect(DropdownComponent.props.className).to.contain('dropdown');
    });

    it('should be disabled', () => {
      const DropdownComponent = createComponent(Dropdown, {
        isProcessing: true,
        values: {}
      });

      expect(DropdownComponent.props.disabled).to.be.true;
    });

    it('should handle change value', () => {
      // https://github.com/facebook/react/issues/4083
      let filterBy,
          filterValue;
      const callback = function(target, value) {
        filterBy = target;
        filterValue = value;

        return;
      };

      const options = {
        foo: 'foo',
        bar: 'bar'
      };
      const component = TestUtils.renderIntoDocument(
         <Dropdown
          filterBy='videoType'
          values={ options }
          onFilterChange={ callback } />
      );
      const select = TestUtils
        .findRenderedDOMComponentWithTag(component, 'select');

      TestUtils.Simulate.change(select, {
        target: {
          value: 'bar'
        }
      });

      expect(filterBy).to.equal('videoType');
      expect(filterValue).to.equal('bar');
    });
  });

  describe('Pagination', () => {
    it('should have className \'pagination\'', () => {
      const PaginationComponent = createComponent(Pagination, {
        isProcessing: false,
        hasPrevPage: () => {},
        hasNextPage: () => {},
        onNavigate: () => {}
      });

      expect(PaginationComponent.props.className).to.contain('pagination');
    });

    it('should disable next and prev buttons', () => {
      let prevButton, nextButton;
      const PaginationComponent = createComponent(Pagination, {
        isProcessing: true,
        hasPrevPage: () => { return true },
        hasNextPage: () => { return true },
        onNavigate: () => {}
      });

      [prevButton, nextButton] = PaginationComponent.props.children;

      expect(prevButton.props.children.props.className).to.contain('disabled');
      expect(nextButton.props.children.props.className).to.contain('disabled');
    });

    it('should disable prev button when hasPrevPage returns false', () => {
      let prevButton, nextButton;
      const PaginationComponent = createComponent(Pagination, {
        isProcessing: false,
        hasPrevPage: () => { return false },
        hasNextPage: () => { return true },
        onNavigate: () => {}
      });

      [prevButton, nextButton] = PaginationComponent.props.children;

      expect(prevButton.props.children.props.className).to.contain('disabled');
      expect(nextButton.props.children.props.className)
        .to.not.contain('disabled');
    });

    it('should disable next button when hasNextPage returns false', () => {
      let prevButton, nextButton;
      const PaginationComponent = createComponent(Pagination, {
        isProcessing: false,
        hasPrevPage: () => { return true },
        hasNextPage: () => { return false },
        onNavigate: () => {}
      });

      [prevButton, nextButton] = PaginationComponent.props.children;

      expect(prevButton.props.children.props.className)
        .to.not.contain('disabled');
      expect(nextButton.props.children.props.className)
        .to.contain('disabled');
    });

    it('should navigate to previous page', () => {
      let navigateDirection;
      const callback = function(direction) {
        navigateDirection = direction;

        return;
      };

      const component = TestUtils.renderIntoDocument(
         <Pagination
          hasPrevPage={ () => { return true; } }
          hasNextPage={ () => { return true; } }
          isProcessing={false}
          onNavigate={ callback } />
      );
      const [prevAnchor, nextAnchor] = TestUtils.scryRenderedDOMComponentsWithTag(
         component, 'a'
      );

      TestUtils.Simulate.click(prevAnchor);
      expect(navigateDirection).to.equal('prev');
      TestUtils.Simulate.click(nextAnchor);
      expect(navigateDirection).to.equal('next');
    });
  });

  describe('VideoList', () => {
    it('should have className \'search-results\'', () => {
      const VideoListComponent = createComponent(VideoList, {
        results: [],
        isProcessing: false
      });

      expect(VideoListComponent.props.className).to.contain('search-results');
    });

    it('should showing loading indicator', () => {
      const VideoListComponent = createComponent(VideoList, {
        results: [],
        isProcessing: true
      });
      const Column = VideoListComponent.props.children,
            LoadingIndicator = Column.props.children;

      expect(LoadingIndicator.props.className).to.contain('loading');
    });

    it('should showing No results found', () => {
      const VideoListComponent = createComponent(VideoList, {
        results: [],
        isProcessing: false
      });
      const Column = VideoListComponent.props.children,
            NotFoundHeading = Column.props.children;

      expect(NotFoundHeading.props.children).to.contain('No results found');
    });

    it('should showing results', () => {
      const VideoListComponent = createComponent(VideoList, {
        results: [
          {
            'id': {
              'kind': 'youtube#video',
              'videoId': 'fk4BbF7B29w'
             },
            'snippet': {
              'publishedAt': '2016-05-23T01:46:00.000Z',
              'title': 'Lorem ipsum dolor sit amet',
              'description': 'Consectetur adipisicing elit. Suscipit, illum.',
              'thumbnails': {
                'high': {
                  'url': 'https://i.ytimg.com/vi/fk4BbF7B29w/hqdefault.jpg'
                }
              }
            }
          },
          {
            'id': {
              'kind': 'youtube#video',
              'videoId': '-l2KPjQ2lJA'
             },
            'snippet': {
              'publishedAt': '2015-11-18T14:00:00.000Z',
              'title': 'Lorem ipsum dolor sit amet',
              'description': 'Consectetur adipisicing elit. Suscipit, illum.',
              'thumbnails': {
                'high': {
                  'url': 'https://i.ytimg.com/vi/-l2KPjQ2lJA/hqdefault.jpg'
                }
              }
            }
          }
        ],
        videoDetails: {
          'fk4BbF7B29w': {
            'statistics': {
              'viewCount': '139681751',
              'likeCount': '1492456'
            }
          }
        },
        isProcessing: false
      });
      const Columns = VideoListComponent.props.children;

      expect(Columns).to.have.lengthOf(2);
    });
  });
});

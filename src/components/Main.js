require('normalize.css/normalize.css');
require('spectre.css/dist/spectre.css');
require('styles/App.scss');

import React from 'react';
import SearchBox from './SearchBox';
import ContentFilter from './ContentFilter';
import SearchResults from './SearchResults';
import Pagination from './Pagination';

class YTSearchComponent extends React.Component {
  render() {
    return (
      <section className="yt-search">
        <header className="column col-8 centered">
          <h3 className="text-center mt-5">
            Youtube Search
          </h3>

          <SearchBox keyword="hello" />
          <ContentFilter />
        </header>

        <SearchResults />

        <nav className="centered text-center">
          <Pagination />
        </nav>
      </section>
    );
  }
}

YTSearchComponent.defaultProps = {
};

export default YTSearchComponent;

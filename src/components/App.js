require('normalize.css/normalize.css');
require('spectre.css/dist/spectre.css');
require('styles/App.scss');

import React from 'react';
import SearchBox from '../containers/SearchBox';
import ContentFilter from './ContentFilter';
import SearchResults from '../containers/SearchResults';
import Pagination from '../containers/Pagination';

class YTSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="yt-search">
        <header className="column col-8 centered">
          <h3 className="text-center mt-5">
            Youtube Search
          </h3>

          <SearchBox />
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

export default YTSearch;

import React from 'react';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    function createResultItem(index) {
      return (
        <div key={ index } className="column col-3">
          <div className="card">
            <div className="card-image">
              <img src="https://picturepan2.github.io/spectre/demo/img/osx-el-capitan.jpg" className="img-responsive" />
            </div>
            <div className="card-header">
              <h4 className="card-title">Microsoft</h4>
              <h6 className="card-meta">Software and hardware</h6>
            </div>
            <div className="card-body">
              To make a contribution to the world by making tools for the mind that advance humankind.
            </div>
          </div>
        </div>
      );
    }

    return (
      <section className="columns col-multiline search-results">
        {this.props.results.map(createResultItem)}
      </section>
    );
  }
}

SearchResults.defaultProps = {
  results: [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ]
}

export default SearchResults;

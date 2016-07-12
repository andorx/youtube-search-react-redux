import React, { PropTypes } from 'react';

class VideoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    function createItem(item) {
      var publishedAt = new Date(item.snippet.publishedAt).toLocaleString();

      return (
        <div key={ item.id.videoId } className="column col-3">
          <div className="card">
            <div className="card-image">
              <img src={ item.snippet.thumbnails.high.url } className="img-responsive" />
            </div>
            <div className="card-header">
              <a href={'https://youtu.be/' + item.id.videoId} target="_blank">
                <h4 className="card-title">{ item.snippet.title }</h4>
              </a>
              <h6 className="card-meta">{ publishedAt }</h6>
            </div>
            <div className="card-body">
              { item.snippet.description }
            </div>
          </div>
        </div>
      );
    }

    function renderItems(items) {
      if (items.length > 0) {
        return items.map(createItem);
      } else {
        return (
          <div className="column col-12 text-center">
            <h5>No results found.</h5>
          </div>
        );
      }
    }

    return (
      <section className="columns col-multiline search-results">
        {
          this.props.isProcessing ? (
          <div className="column col-12">
            <div className="loading"></div>
          </div>
          ) : renderItems(this.props.results)
        }
      </section>
    );
  }
}

VideoList.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
  isProcessing: PropTypes.bool
}

export default VideoList;

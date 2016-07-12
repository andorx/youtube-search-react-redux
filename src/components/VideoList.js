import React from 'react';

class VideoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    function createResultItem(item) {
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

    return (
      <section className="columns col-multiline search-results">
        {
          this.props.isProcessing ? (
          <div className="column col-12">
            <div className="loading"></div>
          </div>
          ) : this.props.results.map(createResultItem)
        }
      </section>
    );
  }
}

export default VideoList;

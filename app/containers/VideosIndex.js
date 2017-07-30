import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchVideos } from '../actions/videos';
import VideoBox from "./VideoBox";

class VideosIndex extends Component {

  props: {
    fetchVideos: () => void
  };

  componentDidMount() {
    this.props.fetchVideos();
  }

  render() {
    return (
      <section className="content">
        {this.renderVideos()}
      </section>
    );
  }

  renderVideos() {
    return _.map(this.props.videos, video => {
      return (
        <VideoBox key={video._id} id={video._id}/>
      );
    });
  }

}

function mapStateToProps(state) {
  return {
    videos: state.videos.data
  };
}

export default connect(mapStateToProps, { fetchVideos })(VideosIndex);

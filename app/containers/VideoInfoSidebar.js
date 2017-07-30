import React, { Component } from 'react';
import { connect } from "react-redux";
import { selectVideo } from '../actions/videos';

class VideoInfoSidebar extends Component {

  render() {
    const video = this.props.selectedVideo;
    if (!video) {
      return null;
    }
    return (
      <div className="video-info-sidebar">
        {video.name}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    selectedVideo: state.videos.selectedVideo
  };
}

export default connect(mapStateToProps, { selectVideo })(VideoInfoSidebar);

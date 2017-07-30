import React, { Component } from 'react';
import { connect } from "react-redux";
import { selectVideo } from '../actions/videos';

class VideoInfoSidebar extends Component {

  render() {
    return (
      <div className="video-info-sidebar">
      </div>
    );
  }

}

function mapStateToProps(state) {
  console.log(state.selectedVideo);
  return {
    selectedVideo: state.selectedVideo
  };
}

export default connect(mapStateToProps, { openVideo, rateVideo })(VideoBox);

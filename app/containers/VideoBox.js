import React, { Component } from 'react';
import { connect } from "react-redux";
import { openVideo, rateVideo, selectVideo } from '../actions/videos';

class VideoBox extends Component {

  props: {
    openVideo: (video) => void,
    rateVideo: (video, rate) => void,
    selectVideo: (video) => void
  };

  render() {
    let video = this.props.video;
    let videoCoverStyle = {
      backgroundImage: 'url(' + video.cover.split('\\').join('/') + ')'
    };
    return (
      <div className="video-box">
        <div className="video-info" onClick={() => this.props.selectVideo(video)} onDoubleClick={() => this.props.openVideo(video)}>
          <div className="video-cover" style={videoCoverStyle}>
            <div className="video-name">{video.name}</div>
          </div>
        </div>
        <div className="video-rating text-yellow">
          {this.renderRating(video)}
        </div>
      </div>
    );
  }

  renderRating(video) {
    return _.map([1,2,3,4,5], i => {
      let classNames = 'fa fa-star';
      if (video.rating === undefined || video.rating < i) {
        classNames += ' fa-star-o';
      }
      return <i key={i} className={classNames} onClick={() => this.props.rateVideo(video, i)} />
    });
  }

}

function mapStateToProps({ videos }, thisProps) {
  return { video: videos.data[thisProps.id] };
}

export default connect(mapStateToProps, { openVideo, rateVideo, selectVideo })(VideoBox);

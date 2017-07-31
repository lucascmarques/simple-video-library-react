import React, { Component } from 'react';
import { connect } from "react-redux";
import { selectVideo, updateVideo } from '../actions/videos';

class VideoInfoSidebar extends Component {

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.props.selectedVideo[name] = value;
    this.setState(this.props.selectedVideo);
    updateVideo(this.props.selectedVideo);
  }

  render() {
    let video = this.props.selectedVideo;
    if (!video) {
      return null;
    }
    return (
      <div className="video-info-sidebar">
        <form action="" className="form-horizontal">
          <div className="form-group">
            <label htmlFor="name" className="col-sm-3 control-label">Name</label>
            <div className="col-sm-9">
              <input id="name" className="form-control" type="text" name="name" value={video.name} onChange={this.handleInputChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">Duration</label>
            <div className="col-sm-9">
              <input className="form-control" type="text" name="duration" disabled value={video.duration} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">Size</label>
            <div className="col-sm-9">
              <input className="form-control" type="text" name="size" disabled value={video.size} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">Size</label>
            <div className="col-sm-9">
              <input className="form-control" type="text" name="resolution" disabled value={video.width + ' x ' + video.height} />
            </div>
          </div>
        </form>
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

import React, { Component } from 'react';
import { connect } from "react-redux";
import { selectVideo, updateVideo, insertActor } from '../actions/videos';
import { WithContext as ReactTags } from 'react-tag-input';

class VideoInfoSidebar extends Component {

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addActor = this.addActor.bind(this);
    this.deleteActor = this.deleteActor.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.props.selectedVideo[name] = value;
    this.setState(this.props.selectedVideo);
    updateVideo(this.props.selectedVideo);
  }

  addActor(actorName) {
    let actors = this.props.selectedVideo.actors;
    let actor = insertActor({name: actorName});
    actors.push(actor);
    updateVideo(this.props.selectedVideo);
  }

  deleteActor(i) {
    let actors = this.props.selectedVideo.actors;
    actors.splice(i, 1);
    updateVideo(this.props.selectedVideo);
  }

  render() {
    let video = this.props.selectedVideo;
    if (!video) {
      return null;
    }
    let actors = video.actors;
    if (actors === undefined) {
      actors = [];
      video.actors = actors;
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
            <label htmlFor="actors" className="col-sm-3 control-label">Actors</label>
            <div className="col-sm-9">
              <ReactTags tags={video.actors}
                         labelField={'name'}
                         handleDelete={this.deleteActor}
                         handleAddition={this.addActor}
                         placeholder="Add new actor"
                         classNames={{
                           tagInputField: 'form-control'
                         }}/>
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

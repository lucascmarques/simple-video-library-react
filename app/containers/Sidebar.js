import React, { Component } from 'react';
import VideoInfoSidebar from "./VideoInfoSidebar";

export default class Sidebar extends Component {

  render() {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <ul className="sidebar-menu">
            <li>
              <a>
                <i className="fa fa-play-circle"></i>
                <span>Videos</span>
                <span className="pull-right-container">
                  <span className="label label-primary pull-right">5</span>
                </span>
              </a>
            </li>
            <li>
              <a>
                <i className="fa fa-cog"></i>
                <span>Preferences</span>
              </a>
            </li>
          </ul>
        </section>
        <VideoInfoSidebar />
      </aside>
    );
  }


}

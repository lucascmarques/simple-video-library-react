import React, { Component } from 'react';
import VideoInfoSidebar from "./VideoInfoSidebar";
import { Link } from "react-router-dom";

export default class Sidebar extends Component {

  render() {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <ul className="sidebar-menu">
            <li>
              <Link to="/">
                <i className="fa fa-play-circle"></i>
                <span>Videos</span>
                <span className="pull-right-container">
                  <span className="label label-primary pull-right">5</span>
                </span>
              </Link>
            </li>
            <li>
              <Link to="/preferences">
                <i className="fa fa-cog"></i>
                <span>Preferences</span>
              </Link>
            </li>
          </ul>
        </section>
        <VideoInfoSidebar />
      </aside>
    );
  }


}

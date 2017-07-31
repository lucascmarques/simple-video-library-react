// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import Sidebar from "./Sidebar";

export default class App extends Component {
  props: {
    children: Children
  };

  render() {
    return (
      <div className="wrapper">
        <Sidebar/>
        <div className="content-wrapper">
          {this.props.children}
        </div>
      </div>
    );
  }
}

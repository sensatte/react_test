import React, { Component } from "react";
import "./UserLayout.css";
import UserProfile from "./UserProfile";
import UserLevel from "./UserLevel";
import UserPoints from "./UserPoints";
import UserClasses from "./UserClasses";

class UserLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const ColoredLine = () => (
      <hr
        style={{
          color: "white",
          opacity: 0.2,
          backgroundColor: "white",
          width: "75%",
        }}
      />
    );

    return (
      <div className="main-layout">
        <UserProfile />
        <ColoredLine />
        <UserLevel />
        <ColoredLine />
        <UserPoints />
        <ColoredLine />
        <UserClasses changeSelected={this.props.changeSelected}/>
      </div>
    );
  }
}

export default UserLayout;
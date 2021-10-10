import React, { Component } from "react";
import "./MainLayout.css";
import UserProfile from "../UserInfo/UserProfile";
import UserLevel from "../UserInfo/UserLevel";
import UserPoints from "../UserInfo/UserPoints";
import UserClasses from "../UserInfo/UserClasses";

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount() {
  //   const _this = this;
  //   window.addEventListener("resize", () => {
  //     if (window.innerWidth <= 800) {
  //       _this.setState({ navExpanded: false, blocked: true });
  //     } else if (window.innerWidth > 800) {
  //       _this.setState({ navExpanded: false, blocked: false });
  //     }
  //   });
  // }

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
        <UserClasses />
      </div>
    );
  }
}

export default MainLayout;

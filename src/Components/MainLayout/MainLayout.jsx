import React, { Component } from "react";
import UserLayout from "../UserInfo/UserLayout";
import AllClassesLayout from "../AllClassesLayout/AllClassesLayout";
import ClassLayout from "../ClassLayout/ClassLayout";
import ClassesPlaylistLayout from "../ClassesPlaylistLayout/ClassesPlaylistLayout";
import SubLayout from "../SubLayout/SubLayout";
import NavbarLayout from "../Navbar/Navbar";

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: "user",
      id: 0,
      completedClasses: [],
      autoRepro: [],
      userId: 1,
      message: "SUBSCRÍBETE",
      subTime: 0,
      autoIsChecked: false,
      autoTime: 0,
    };
    this.changeSelected = this.changeSelected.bind(this);
    this.completeClass = this.completeClass.bind(this);
    this.addClassToPlaylist = this.addClassToPlaylist.bind(this);
    this.updatePlaylist = this.updatePlaylist.bind(this);
    this.changeSubTime = this.changeSubTime.bind(this);
    this.changeAutoIsChecked = this.changeAutoIsChecked.bind(this);
    this.removePlaylist = this.removePlaylist.bind(this);
  }

  changeSelected(page, id) {
    this.setState({ optionSelected: page, id: id });
  }

  completeClass(viewedClass) {
    const { completedClasses } = this.state;
    if (completedClasses.filter((i) => i === viewedClass).length === 0) {
      this.setState({
        completedClasses: [...this.state.completedClasses, viewedClass],
      });
    }
  }

  addClassToPlaylist(id) {
    const { autoRepro } = this.state;
    if (autoRepro.filter((i) => i === id).length === 0) {
      this.setState({ autoRepro: [...autoRepro, id] });
    } else {
      this.setState({ autoRepro: autoRepro.filter((p) => p !== id) });
    }
  }

  removePlaylist(id) {
    this.setState({ autoRepro: [] });
  }

  updatePlaylist(autoReproUpdated) {
    this.setState({ autoRepro: autoReproUpdated });
  }

  changeSubTime(time, message) {
    let newTime = Date.now() + time * 60000;
    let newAutoTime = time;
    if (message === "") {
      newAutoTime = 0;
      newTime = 0;
      if (this.state.autoIsChecked) {
        message = "RENOVACIÓN PENDIENTE";
      } else {
        message = "SUBSCRÍBETE";
      }
    }
    this.setState({
      subTime: newTime,
      message: message,
      autoTime: newAutoTime,
    });
  }
  changeAutoIsChecked(value) {
    this.setState({ autoIsChecked: value });
  }

  render() {
    const {
      optionSelected,
      id,
      completedClasses,
      autoRepro,
      userId,
      subTime,
      message,
      autoIsChecked,
      autoTime,
    } = this.state;

    let component = <UserLayout changeSelected={this.changeSelected} />;
    if (optionSelected === "user") {
      component = <UserLayout changeSelected={this.changeSelected} />;
    } else if (optionSelected === "allClasses") {
      component = (
        <AllClassesLayout
          changeSelected={this.changeSelected}
          addClassToPlaylist={this.addClassToPlaylist}
          completedClasses={completedClasses}
          autoRepro={autoRepro}
        />
      );
    } else if (optionSelected === "class") {
      component = (
        <ClassLayout
          changeSelected={this.changeSelected}
          id={id}
          completeClass={this.completeClass}
          subTime={subTime}
        />
      );
    } else if (optionSelected === "classesPlaylist") {
      component = (
        <ClassesPlaylistLayout
          changeSelected={this.changeSelected}
          completedClasses={completedClasses}
          id={id}
          completeClass={this.completeClass}
          autoRepro={autoRepro}
          updatePlaylist={this.updatePlaylist}
          subTime={subTime}
          removePlaylist={this.removePlaylist}
        />
      );
    } else if (optionSelected === "sub") {
      component = (
        <SubLayout
          changeSelected={this.changeSelected}
          userId={userId}
          changeSubTime={this.changeSubTime}
          subTime={subTime}
          autoIsChecked={autoIsChecked}
          changeAutoIsChecked={this.changeAutoIsChecked}
          autoTime={autoTime}
        />
      );
    }

    return (
      <div>
        <NavbarLayout
          changeSelected={this.changeSelected}
          changeSubTime={this.changeSubTime}
          removePlaylist={this.removePlaylist}
          optionSelected={optionSelected}
          subTime={subTime}
          message={message}
          autoIsChecked={autoIsChecked}
          autoTime={autoTime}
        />
        {component}
      </div>
    );
  }
}

export default MainLayout;

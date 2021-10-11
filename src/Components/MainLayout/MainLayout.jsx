import React, { Component } from "react";
import UserLayout from "../UserInfo/UserLayout";
import AllClassesLayout from "../AllClassesLayout/AllClassesLayout";
import ClassLayout from "../ClassLayout/ClassLayout";
import ClassesPlaylistLayout from "../ClassesPlaylistLayout/ClassesPlaylistLayout";

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: "user",
      id: 0,
      completedClasses: [],
      autoRepro: [],
    };
    this.changeSelected = this.changeSelected.bind(this);
    this.completeClass = this.completeClass.bind(this);
    this.addClassToPlaylist = this.addClassToPlaylist.bind(this);
    this.updatePlaylist = this.updatePlaylist.bind(this);
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

  updatePlaylist(autoReproUpdated) {
    this.setState({ autoRepro: autoReproUpdated });
  }

  render() {
    const { optionSelected, id, completedClasses, autoRepro } = this.state;

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
        />
      );
    }

    return <div>{component}</div>;
  }
}

export default MainLayout;

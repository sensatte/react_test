import React, { Component } from "react";
import UserLayout from "../UserInfo/UserLayout";
import AllClassesLayout from "../AllClassesLayout/AllClassesLayout";
import ClassLayout from "../ClassLayout/ClassLayout";

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: "user",
      id: 0,
      completedClasses: [],
    };
    this.changeSelected = this.changeSelected.bind(this);
    this.completeClass = this.completeClass.bind(this);
  }

  changeSelected(page, id) {
    this.setState({ optionSelected: page, id: id });
  }

  completeClass(viewedClass) {
    this.setState({ completedClasses: [...this.state.completedClasses, viewedClass] });
  }

  render() {
    const { optionSelected, id, completedClasses } = this.state;

    let component = <UserLayout changeSelected={this.changeSelected} />;
    if (optionSelected === "user") {
      component = <UserLayout changeSelected={this.changeSelected} />;
    } else if (optionSelected === "allClasses") {
      component = (
        <AllClassesLayout
          changeSelected={this.changeSelected}
          completedClasses={completedClasses}
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
    }

    return <div>{component}</div>;
  }
}

export default MainLayout;

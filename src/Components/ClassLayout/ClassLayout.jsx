import React, { Component } from "react";
import getClasses from "../../Queries/getClasses";
import "./ClassLayout.css";
import Paper from "@mui/material/Paper";

class ClassLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { classes: [], name: "", instructor: "" };
  }
  componentDidMount() {
    getClasses().then((data) => {
      this.setState({
        classes: data,
        name: data[0].name,
        instructor: data[0].instructor_id,
      });
    });
  }

  render() {
    const { name, instructor } = this.state;
    return (
      <div className="class-layout">
        <p className="classTitle2">{name}</p>
        <p className="classSubtitle2">{instructor}</p>
        <Paper style={{ backgroundColor: "black", color: "white" }} className="countDown">
          <p>5</p>
        </Paper>
      </div>
    );
  }
}

export default ClassLayout;

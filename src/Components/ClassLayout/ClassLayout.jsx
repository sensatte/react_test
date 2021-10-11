import React, { Component } from "react";
import getClasses from "../../Queries/getClasses";
import "./ClassLayout.css";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import getTrainer from "../../Queries/getTrainer";

class ClassLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { classes: [], name: "", instructor: "" };
  }
  componentDidMount() {
    const url = window.location.href.split("/");
    const id = url[url.length - 1];
    getClasses().then((data) => {
      this.setState({
        name: data[id].name,
      });
      getTrainer().then((trainer) => {
        this.setState({
          instructor: trainer.filter((t) => t.id === data[id].instructor_id)[0]
            .name,
        });
      });
    });
  }

  render() {
    const { name, instructor } = this.state;
    return (
      <div className="class-layout">
        <div className="classTopGrid">
          <Link className="showMain" to={{ pathname: "/allClasses" }}>
            VOLVER
          </Link>
          <div>
            <p className="classTitle2">{name}</p>
            <p className="classSubtitle2">{instructor}</p>
          </div>
        </div>
        <Paper
          style={{ backgroundColor: "black", color: "white" }}
          className="countDown"
        >
          <p>5</p>
        </Paper>
      </div>
    );
  }
}

export default ClassLayout;

import { Grid, Paper } from "@mui/material";
import React, { Component } from "react";
import getClasses from "../../Queries/getClasses";
import "./AllClassesLayout.css";
import moment from "moment";
import getTrainer from "../../Queries/getTrainer";

class AllClassesLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      trainers: [],
      completedClasses: [],
      autoRepro: []
    };
  }
  componentDidMount() {
    getClasses().then((data) => {
      this.setState({ classes: data, completedClasses: this.props.completedClasses });
      getTrainer().then((data) => {
        this.setState({ trainers: data });
      });
    });
  }

  render() {
    const { classes, trainers, completedClasses } = this.state;
    const paperCSS = {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#2f2f2f",
      justifyContent: "space-between;",
      alignItems: "left",
      textAlign: "left",
      color: "#c5c5c5",
    };
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const levelcss = (level, id) => {
      const levels = [];
      for (let index = 0; index < 3; index++) {
        let opacity = 0.4;
        if (index <= level - 1) {
          opacity = 1;
        }
        levels.push(
          <div
            key={id + "-" + index}
            className="circleLevel"
            style={{ opacity: opacity }}
          ></div>
        );
      }
      return (
        <div key={id} className="circleLevelGrid">
          Nivel {levels}
        </div>
      );
    };

    return (
      <div className="allClasses-layout">
        <Paper
          className="showMain"
          style={{
            backgroundColor: "#ff7900",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => {
            this.props.changeSelected("user", 0);
          }}
        >
          VOLVER
        </Paper>
        <Grid container spacing={3} className="classesGrid">
          <Grid item xs={12}>
            <Grid container columnSpacing={2}>
              {classes.map((item, i) => (
                <Grid item xs={12} md={6} lg={4} key={i}>
                  <p></p>
                  <Paper
                    className="classGrid"
                    sx={paperCSS}
                    onClick={() => {
                      this.props.changeSelected("class", i);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="classTop">
                      <p className="classTitle">{item.name}</p>
                      <p className="classSubtitle">
                        {trainers.length === 0
                          ? null
                          : trainers.filter(
                              (t) => t.id === item.instructor_id
                            )[0].name}
                      </p>
                    </div>
                    <img src={item.image} alt={item.image}></img>
                    <div className="classesInfo">
                      {completedClasses.includes(i) ? (
                        <div className="completed">Completada</div>
                      ) : null}
                      {levelcss(item.level, item.instructor_id)}
                      <p className="classSubtitle">
                        {moment(item.published).toObject().date}{" "}
                        {months[moment(item.published).toObject().months]}
                      </p>
                      <p className="classSubtitle">
                        Duración {parseFloat(item.duration / 60).toFixed(0)}'
                      </p>
                    </div>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default AllClassesLayout;

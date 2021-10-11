import React, { Component } from "react";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import getClasses from "../../Queries/getClasses";
import moment from "moment";
import getTrainer from "../../Queries/getTrainer";

class UserClasses extends Component {
  constructor(props) {
    super(props);
    this.state = { classes: [], trainers: [] };
  }
  componentDidMount() {
    getClasses().then((data) => {
      this.setState({ classes: data });
      getTrainer().then((data) => {
        this.setState({ trainers: data });
      });
    });
  }

  render() {
    const { classes, trainers } = this.state;
    const paperCSS = {
      p: 2,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#2f2f2f",
      justifyContent: "left",
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

    return (
      <div className="perfilClasses">
        <div className="perfilClasses top">
          <h5>ÚLTIMAS CLASES</h5>
          <Paper className="showMain" style={{backgroundColor:"#ff7900", color:"white", cursor: "pointer"}} onClick={() => {
                        this.props.changeSelected("allClasses", 0);
                      }}>
            VER TODAS
          </Paper>
        </div>

        <Grid container spacing={3} className="perfilClassesGrid">
          <Grid item xs={12}>
            <Grid container columnSpacing={2}>
              {classes
                .filter((item, i) => item.id >= classes.length - 5)
                .map((item, i) => (
                  <Grid item xs={12} md={6} lg={4} key={i}>
                    <div className="perfilClasses top">
                      <img
                        src="https://www.cicloindoor.com/themes/bestcycling.es/images/logo-big-black.png"
                        alt={item.id}
                        width={100}
                      ></img>
                      <p className="classFecha">
                        {moment(item.published).toObject().date}{" "}
                        {months[moment(item.published).toObject().months]}
                      </p>
                    </div>
                    <Paper
                      sx={paperCSS}
                      onClick={() => {
                        this.props.changeSelected("class", i);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <p className="classTitle">{item.name}</p>
                      <p className="classSubtitle">
                        {trainers.length === 0
                          ? null
                          : trainers.filter(
                              (t) => t.id === item.instructor_id
                            )[0].name}
                      </p>
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
export default UserClasses;

import { Grid, Paper } from "@mui/material";
import React, { Component } from "react";
import getClasses from "../../Queries/getClasses";
import "./AllClassesLayout.css";
import moment from "moment";
import { Link } from "react-router-dom";
import { useHistory, useParams  } from "react-router-dom";

// const { id } = useParams();
// const history = useHistory();

class AllClassesLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { classes: [] };
  }
  componentDidMount() {
    getClasses().then((data) => {
      this.setState({ classes: data });
    });
  }

  render() {
    const { classes } = this.state;
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

    const handleProceed = (e) => {
      window.location.href = "/allClasses/class/2";
    };

    return (
      <div className="allClasses-layout">
        <Grid container spacing={3} className="classesGrid">
          <Grid item xs={12}>
            <Grid container columnSpacing={2}>
              {classes.map((item, i) => (
                <Grid item xs={12} md={6} lg={4} key={i}>
                  <p></p>
                  <Paper sx={paperCSS} onClick={handleProceed}>
                    <div className="classTop">
                      <p className="classTitle">{item.name}</p>
                      <p className="classSubtitle">{item.instructor_id}</p>
                    </div>
                    <img src={item.image} alt={item.image}></img>
                    <div className="classesInfo">
                      <p className="classSubtitle">Nivel {item.level}</p>
                      <p className="classSubtitle">
                        {moment(1557697070824.94).toObject().date}{" "}
                        {months[moment(1557697070824.94).toObject().months]}
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

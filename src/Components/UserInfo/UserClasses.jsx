import React, { Component } from "react";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import getClasses from "../../Queries/getClasses";

class UserClasses extends Component {
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
      p: 2,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#2f2f2f",
      justifyContent: "left",
      alignItems: "left",
      textAlign: "left",
      color: "#c5c5c5",
    };

    return (
      <div className="perfilClasses">
        <div className="perfilClasses top">
          <h5>ÚLTIMAS CLASES</h5>
          <button className="showClasses">VER TODAS</button>
        </div>
        <p></p>

        <Grid container spacing={3} className="perfilClassesGrid">
        <Grid item xs={12}>
            <Grid container columnSpacing={2}>
              {classes
                .filter((item, i) => i >= classes.length - 6)
                .map((item, i) => (
                  <Grid item xs={12} md={6} lg={4} key={i}>
                    <p className="classFecha">{item.published}</p>
                    <Paper sx={paperCSS}>
                      <p className="classTitle">{item.name}</p>
                      <p className="classSubtitle">{item.instructor_id}</p>
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

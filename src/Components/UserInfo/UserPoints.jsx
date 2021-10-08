import React, { Component } from "react";
import { Grid } from "@mui/material";
import getUserInfo from "../../Queries/getUserInfo";

class UserPoints extends Component {
  constructor(props) {
    super(props);
    this.state = { userProfile: {} };
  }
  componentDidMount() {
    getUserInfo().then((data) => {
      this.setState({ userProfile: data });
    });
  }
  render() {
    const { userProfile } = this.state;
    return (
      <div className="perfilItems">
        <Grid
          className="perfilItemsGrid"
          container
          direction="row"
          alignItems="center"
        >
          <Grid item className="item">
            <Grid container direction="column" alignItems="center">
              <Grid item className="gridPoints">
                <div
                  className="circle"
                  style={{ backgroundColor: "rgba(252, 217, 0,0.9)" }}
                >
                  <p className="text">{userProfile.stamina_points}</p>
                </div>
              </Grid>
              <Grid item className="gridText">
                Resistencia
              </Grid>
            </Grid>
          </Grid>
          <Grid item className="item">
            <Grid container direction="column" alignItems="center">
              <Grid item className="gridPoints">
                <div className="circle" style={{ backgroundColor: "#69ae00" }}>
                  <p className="text">{userProfile.strength_points}</p>
                </div>
              </Grid>
              <Grid item className="gridText">
                Fuerza
              </Grid>
            </Grid>
          </Grid>
          <Grid item className="item">
            <Grid container direction="column" alignItems="center">
              <Grid item className="gridPoints">
                <div className="circle" style={{ backgroundColor: "#f13b46" }}>
                  <p className="text">{userProfile.flexiblity_points}</p>
                </div>
              </Grid>
              <Grid item className="gridText">
                Flexibilidad
              </Grid>
            </Grid>
          </Grid>
          <Grid item className="item">
            <Grid container direction="column" alignItems="center">
              <Grid item className="gridPoints">
                <div className="circle" style={{ backgroundColor: "#1d8bb8" }}>
                  <p className="text">{userProfile.mind_points}</p>
                </div>
              </Grid>
              <Grid item className="gridText">
                Mente
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default UserPoints;

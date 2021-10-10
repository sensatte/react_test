import React, { Component } from "react";
import { Grid } from "@mui/material";
import getUserInfo from "../../Queries/getUserInfo";

class UserLevel extends Component {
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
          <Grid item className="levelItem">
            <Grid container direction="column" alignItems="center">
              <Grid item className="gridNumber">
                {userProfile.level}
              </Grid>
              <Grid item className="gridText">
                NIVEL
              </Grid>
            </Grid>
          </Grid>
          <Grid item className="levelItem">
            <Grid container direction="column" alignItems="center">
              <Grid item className="gridNumber">
                {userProfile.perseverance}
              </Grid>
              <Grid item className="gridText">
                CONSTANCIA
              </Grid>
            </Grid>
          </Grid>
          <Grid item className="levelItem">
            <Grid container direction="column" alignItems="center">
              <Grid item className="gridNumber">
                {userProfile.total_points}
              </Grid>
              <Grid item className="gridText">
                PUNTOS
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default UserLevel;

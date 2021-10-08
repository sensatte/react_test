import React, { Component } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Grid } from "@mui/material";
import getUserInfo from "../../Queries/getUserInfo";

class UserProfile extends Component {
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
      <div className="perfil">
        <div className="perfilImage">
          <img
            src={userProfile.avatar}
            width="200px" 
            alt="avatar"
            style={{
              borderRadius: 150 / 2}}
          ></img>
        </div>
        <div className="perfilInfo">
          <h3 style={{ marginBottom: "10px", marginTop: "-50px" }}>
            {userProfile.name}
          </h3>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <LocationOnIcon />
            </Grid>
            <Grid item style={{ fontSize: "18px" }}>
              Valencia, Spain
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
export default UserProfile;

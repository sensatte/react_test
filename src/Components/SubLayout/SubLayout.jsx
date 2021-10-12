import { Grid, Paper } from "@mui/material";
import React, { Component } from "react";
import "./SubLayout.css";

class SubLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { subTime: 0 };
  }

  componentDidMount() {
    this.setState({ subTime: this.props.subTime });
  }

  shouldComponentUpdate(nextProps) {
    if (this.state.subTime !== nextProps.subTime) {
      this.setState({ subTime: nextProps.subTime });
    }
    return true;
  }
  render() {
    const { subTime } = this.state;
    const subsTime = [0.1, 0.2, 0.5];
    const paperCSS = {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "left",
      color: "#ff7900",
    };

    return (
      <div className="sub-layout">
        <h2>SUBSCRÍBETE</h2>
        <div
          style={{
            fontSize: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <input
            className="checkSub"
            type="checkbox"
            checked={this.props.autoIsChecked}
            onChange={(e) => {
              this.props.changeAutoIsChecked(e.target.checked);
            }}
          />
          <label>Autoenovar automáticamente</label>
        </div>
        <Grid container spacing={5} className="subsGrid">
          <Grid item xs={12}>
            <Grid container columnSpacing={2}>
              {subsTime.map((item, i) => (
                <Grid item xs={12} md={6} lg={4} key={item}>
                  <p></p>
                  <Paper
                    sx={paperCSS}
                    style={{
                      cursor: this.props.subTime !== 0 ? "default" : "pointer",
                      height: "300px",
                      backgroundColor:
                        this.props.autoTime === item ? "black" : "white",
                      fontWeight: "700",
                    }}
                    onClick={() => {
                      if (subTime === 0) {
                        this.props.changeSubTime(item, "SUBSCRIPCIÓN ");
                        this.props.changeSelected("user", 0);
                      }
                    }}
                  >
                    {item} {item === 1 ? "minuto" : "minutos"}
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

export default SubLayout;

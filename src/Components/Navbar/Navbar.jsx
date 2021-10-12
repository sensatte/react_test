import { Paper } from "@mui/material";
import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import Countdown from "react-countdown";
import "./Navbar.css";
import logo from "./logo.png";

class NavbarLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "SUBSCRÍBETE", subTime: 0 };
  }

  componentDidMount() {
    this.setState({ subTime: this.props.subTime, message: this.props.message });
  }

  shouldComponentUpdate(nextProps) {
    if (this.state.subTime !== nextProps.subTime) {
      this.setState({ subTime: nextProps.subTime, message: nextProps.message });
    }
    return true;
  }

  render() {
    const { message, subTime } = this.state;

    const paperCSS = {
      backgroundColor: subTime !== 0 ? "black" : "#ff7900",
      color: "white",
      cursor: "pointer",
      height: "50",
    };

    const renderer = ({ minutes, seconds }) => {
      return (
        <span>
          {minutes}.{seconds}
        </span>
      );
    };

    return (
      <Navbar className="navBar">
        <img
          src={logo}
          alt="logo"
          height={50}
          style={{ marginTop: "10px", cursor: "pointer" }}
          onClick={() => this.props.changeSelected("user", 0)}
        ></img>

        <Navbar.Collapse>
          <Navbar.Text>
            <Paper
              className="SubPaper"
              style={paperCSS}
              onClick={() => {
                this.props.changeSelected("sub", 0);
              }}
            >
              {message}{" "}
              {subTime === 0 ? (
                ""
              ) : (
                <Countdown
                  renderer={renderer}
                  date={subTime}
                  key={subTime}
                  onComplete={() => {
                    if (
                      this.props.optionSelected === "class" ||
                      this.props.optionSelected === "classesPlaylist"
                    ) {
                      if (this.props.autoIsChecked) {
                        this.props.changeSubTime(
                          this.props.autoTime,
                          "SUBSCRIPCIÓN "
                        );
                      } else {
                        for (var i = 1; i < 999; i++) clearInterval(i);   
                        this.props.removePlaylist()
                        this.props.changeSubTime(0, "");  
                        this.props.changeSelected("sub", 0);
                      }
                    } else {
                      this.props.changeSubTime(0, "");
                    }
                  }}
                />
              )}
            </Paper>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavbarLayout;

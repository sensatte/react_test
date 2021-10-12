import React, { Component } from "react";
import getClasses from "../../Queries/getClasses";
import "./ClassesPlaylistLayout.css";
import Paper from "@mui/material/Paper";
import getTrainer from "../../Queries/getTrainer";

class ClassesPlaylistLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      trainers: [],
      name: "",
      instructor: "",
      time: {},
      seconds: 3,
      id: 0,
    };
    this.timer = 0;
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs) {
    let divisor_for_minutes = secs % (60 * 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      s: seconds,
    };
    return obj;
  }

  componentDidMount() {
    if (this.props.subTime === 0) {
      this.props.changeSelected("sub", this.props.id);
      this.props.removePlaylist()
    } else {
      const { id } = this.props;
      getClasses().then((data) => {
        this.setState({
          classes: data,
          name: data[id].name,
          id: id,
        });
        getTrainer().then((trainer) => {
          this.setState({
            trainers: trainer,
            instructor: trainer.filter(
              (t) => t.id === data[id].instructor_id
            )[0].name,
          });
        });
      });

      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({ time: timeLeftVar });
      if (this.timer === 0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    }
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    if (seconds === 0) {
      clearInterval(this.timer);
      this.setCompleted();
    }
  }

  setCompleted() {
    this.props.completeClass(this.state.id);
    const { autoRepro } = this.props;
    this.props.updatePlaylist(autoRepro.filter((p) => p !== this.state.id));
    if (this.props.autoRepro.length === 0) {
      this.props.changeSelected("allClasses", 0);
    } else {
      this.setState({
        id: this.props.autoRepro[0],
        time: {},
        seconds: 3,
        name: this.state.classes[this.props.autoRepro[0]].name,
        instructor: this.state.trainers.filter(
          (t) =>
            t.id === this.state.classes[this.props.autoRepro[0]].instructor_id
        )[0].name,
      });
      this.timer = 0;
      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({ time: timeLeftVar });
      if (this.timer === 0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    }
  }

  render() {
    const { name, instructor } = this.state;
    return (
      <div className="class-layout">
        <div className="classTopGrid">
          <Paper
            className="showMain"
            style={{
              backgroundColor: "#ff7900",
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => {
              clearInterval(this.timer);
              this.props.updatePlaylist([]);
              this.props.changeSelected("allClasses", this.state.id);
            }}
          >
            VOLVER
          </Paper>
          <div>
            <p className="classTitle2">{name}</p>
            <p className="classSubtitle2">{instructor}</p>
          </div>
        </div>

        <Paper
          style={{ backgroundColor: "black", color: "white" }}
          className="countDown"
        >
          <div>{this.state.time.s}</div>
        </Paper>
      </div>
    );
  }
}

export default ClassesPlaylistLayout;

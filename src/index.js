import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Main from "./Pages/Main";

import reportWebVitals from "./reportWebVitals";
import "./index.css";

ReactDOM.render(
  <Router basename="">
    <Switch>
      <Redirect exact={true} from="/" to={"/main"} />
      {/* <Route path="/allClasses" exact={true} component={AllClasses} />
      <Route path="/allClasses/class/:id" exact={true} component={Class} /> */}
      {/* <Route path="/classes" exact={true} component={Classes} /> */}

      <Route path="*" exact={true} component={Main} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

reportWebVitals();

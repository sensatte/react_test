import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Main from "./Pages/Main";
import Login from "./Pages/Login";

import reportWebVitals from "./reportWebVitals";
import "./index.css";

ReactDOM.render(
    <Router basename="">
      <Switch>
        <Redirect exact={true} from="/" to={"/main"} />
        <Route path="/login" exact={true} component={Login} />
        <Route path="/main" exact={true} component={Main} />
        <Route path="*" exact={true} component={Main} />
      </Switch>
    </Router>,
  document.getElementById("root")
);

reportWebVitals();

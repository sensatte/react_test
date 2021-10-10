import React, { useState } from "react";
import Grid from "@mui/material/Grid";

import Logo from "../../static/img/logo.png";

import "./LoginLayout.css";

async function postData(url, data) {
  // Opciones por defecto estan marcadas con un *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Access-Control-Allow-Credentials": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export default function LoginLayout({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  function login() {
    postData("http://belendominguez:8088/api/v1/security/login", {
      password: password,
      provider: "db",
      refresh: true,
      username: username,
    }).then((data) => {
      if (data.access_token) {
        window.location.href = "/turismo_malaga/main";
      }
    });
  }

  return (
    <div className="content-wrapper">
      <section className="layout-wrapper">
        <Grid container className="login-container">
          <Grid item className="login-content" xs={12} sm={8} md={6} lg={6}>
            <div>
              <p className="image-container">
                <img src={Logo} alt="Logo" />
              </p>
              <p>
                <span>Usuario :</span>
                <br />
                <input
                  title="Usuario"
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </p>
              <p>
                <span>Contraseña :</span>
                <br />
                <input
                  title="Contraseña"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </p>
              <p>
                <button title="Acceder" onClick={login}>
                  Acceder
                </button>
              </p>
            </div>
          </Grid>
        </Grid>
      </section>
    </div>
  );
}

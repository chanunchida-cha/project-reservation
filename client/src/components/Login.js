import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { store } from "./Store";
import { withRouter, useHistory } from "react-router-dom";

const Login = observer(() => {
  const history = useHistory();
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const { username, password } = login;

  function onChangeInput(event) {
    const { name, value } = event.target;
    setLogin((prevLog) => {
      return {
        ...prevLog,
        [name]: value,
      };
    });
  }
  async function submitForm(event) {
    event.preventDefault();
    await store.loginUser(login);
    history.push("/");
  }

  return (
    <div className="p-10">
      <center>
        <h1 className="text-xl font-bold">Log in</h1>
      </center>
      <form onSubmit={submitForm} className="px-20">
        <div className="form-group ">
          <label className="text-lg">Username:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Username:"
            name="username"
            value={username}
            onChange={onChangeInput}
          />
        </div>

        <div className="form-group">
          <label className="text-lg">Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password:"
            name="password"
            value={password}
            onChange={onChangeInput}
          />
        </div>
        <br />
        <input
          type="submit"
          value={"Log in"}
          className="btn btn-primary btn-sm"
        />
      </form>
    </div>
  );
});
export default Login;

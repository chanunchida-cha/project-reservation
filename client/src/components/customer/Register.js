import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { userStore } from "./userStore";
import Navbar from "../Navbar";
import Swal from "sweetalert2";

const Register = observer(() => {
  const [info, setInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  });
  const { username, email, password, confirmPass } = info;

  function onChangeInput(event) {
    const { name, value } = event.target;
    setInfo((prevInfo) => {
      return {
        ...prevInfo,
        [name]: value,
      };
    });
  }

  async function registerSubmit(event) {
    event.preventDefault();
    await userStore.createUser(info);

    setInfo({
      username: "",
      email: "",
      password: "",
      confirmPass: "",
    });
  }

  return (
    <div>
    
      <div className="container p-2 pt-5">
        <form onSubmit={registerSubmit}>
          <center>
            <h1 className="text-xl font-bold">Register</h1>
          </center>

          <div className="form-group">
            <label className="text-lg">Username:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="username"
              value={username}
              onChange={onChangeInput}
              required
            />
          </div>
          <div className="form-group">
            <label className="text-lg">Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChangeInput}
              required
            />
          </div>

          <div className="form-group">
            <label className="text-lg">Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChangeInput}
              required
            />
          </div>
          <div className="form-group">
            <label className="text-lg">Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              name="confirmPass"
              value={confirmPass}
              onChange={onChangeInput}
              required
            />
          </div>
          <br />
          <input
            type="submit"
            value={"Sign up"}
            className="btn btn-primary btn-sm"
          />
        </form>
      </div>
    </div>
  );
});

export default Register;

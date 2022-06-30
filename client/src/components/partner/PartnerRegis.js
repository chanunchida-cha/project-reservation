import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { partnerStore } from "../Store/partnerStore";

const PartnerRegis = observer(() => {
  const [partner, setPartner] = useState({
    restaurantName: "",
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    address: "",
    username: "",
    password: "",
    confirmPass: "",
  });
  const {
    restaurantName,
    firstname,
    lastname,
    email,
    phoneNumber,
    address,
    username,
    password,
    confirmPass,
  } = partner;

  function onChangeInput(event) {
    const { name, value } = event.target;
    setPartner((prevInfo) => {
      return {
        ...prevInfo,
        [name]: value,
      };
    });
  }

  async function registerSubmit(event) {
    event.preventDefault();
    await partnerStore.createPartner(partner);
  }

  return (
    <div>
      <div className="container p-3 pt-5">
        <form onSubmit={registerSubmit}>
          <center>
            <h5 className="text-xl font-bold">PartnerRegister</h5>
          </center>
          <div className="form-group  pt-3">
            <label className="text-lg">Restaurant Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Restaurant Name"
              name="restaurantName"
              value={restaurantName}
              onChange={onChangeInput}
              required
            />
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col">
                <label className="text-lg">Firstname:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  aria-label="First name"
                  name="firstname"
                  value={firstname}
                  onChange={onChangeInput}
                  required
                />
              </div>
              <div className="col">
                <label className="text-lg">Lastname:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  aria-label="Last name"
                  name="lastname"
                  value={lastname}
                  onChange={onChangeInput}
                  required
                />
              </div>
            </div>
          </div>
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
            <div className="row">
              <div className="col">
                <label className="text-lg">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  aria-label="Password"
                  name="password"
                  value={password}
                  onChange={onChangeInput}
                  required
                />
              </div>
              <div className="col">
                <label className="text-lg">Confirm Password:</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  aria-label="Confirm Password"
                  name="confirmPass"
                  value={confirmPass}
                  onChange={onChangeInput}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="row">
              <div className="col">
                <label className="text-lg">Email:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  aria-label="Email"
                  name="email"
                  value={email}
                  onChange={onChangeInput}
                  required
                />
              </div>
              <div className="col">
                <label className="text-lg">Phone number:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone number"
                  aria-label="Phone number"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={onChangeInput}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="text-lg">Address:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              name="address"
              value={address}
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

export default PartnerRegis;

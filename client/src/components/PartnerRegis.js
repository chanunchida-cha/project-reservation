import React, { useState } from "react";
import { observer } from "mobx-react-lite";

const PartnerRegis = observer(() => {
  const [partner, setPartner] = useState({
    retaurantName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });
  const { retaurantName, firstName, lastName, email, phone, address } = partner;

  function onChangeInput(event) {
    const { name, value } = event.target;
    setPartner((prevInfo) => {
      return {
        ...prevInfo,
        [name]: value,
      };
    });
  }

  return (
    <div className="container p-3 pt-5">
      <form>
        <center><h5 className="text-xl font-bold">PartnerRegister</h5></center>
        <div className="form-group  pt-3">
          <label className="text-lg">Restaurant Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Restaurant Name"
            name="retaurantName"
            value={retaurantName}
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
                name="firstName"
                value={firstName}
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
                name="lastName"
                value={lastName}
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
                placeholder="First name"
                aria-label="First name"
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
                name="phone"
                value={phone}
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
        <input type="submit" value={"Sign up"} className="btn btn-primary btn-sm" />
      </form>
    </div>
  );
});

export default PartnerRegis;

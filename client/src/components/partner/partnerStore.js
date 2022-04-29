import { makeAutoObservable } from "mobx";
import axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../../services/authorize";

class PartnerStore {
  partnerlogin = {};

  constructor() {
    makeAutoObservable(this);
  }

  createPartner(partner) {
    const {
      restaurantName,
      firstname,
      lastname,
      username,
      email,
      password,
      confirmPass,
      phoneNumber,
      address,
    } = partner;
    console.log(
      restaurantName,
      firstname,
      lastname,
      email,
      phoneNumber,
      address,
      username,
      password,
      confirmPass
    );

    axios
      .post(`${process.env.REACT_APP_API_PARTNER}/register`, {
        restaurantName: restaurantName,
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
        confirmPass: confirmPass,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
      })
      .then((response) => {
        Swal.fire("Register Success!", "register success!", "success");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Sorry",
          text: err.response.data.error,
        });
        console.log(err);
        throw err;
      });
  }

  async loginPartner(login) {
    const { username, password } = login;
    console.log(username, password);
    await axios
      .post(`${process.env.REACT_APP_API_PARTNER}/partnerlogin`, {
        username: username,
        password: password,
      })
      .then((response) => {
        sessionStorage.setItem("token", JSON.stringify(response.data.token));
        this.partnerlogin = response.data;
        console.log(this.partnerlogin);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Sorry",
          text: err.response.data.error,
        });

        console.log(err);
        throw err;
      });
  }
  getPartner() {
    axios
      .get(`${process.env.REACT_APP_API_PARTNER}/getpartner`, {
        headers: { "x-access-token": getToken() },
      })
      .then((response) => {
        this.partnerlogin = response.data;
        console.log(this.partnerlogin._id);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }
  logout() {
    this.partnerlogin = {};
    sessionStorage.removeItem("token");
  }
}

export const partnerStore = new PartnerStore();
partnerStore.getPartner();

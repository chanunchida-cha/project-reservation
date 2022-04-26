import { makeAutoObservable } from "mobx";
import axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../../services/authorize";

class UserStore {
  customer = {};

  constructor() {
    makeAutoObservable(this);
  }

  async createUser(ifo) {
    const {
      username,
      firstname,
      lastname,
      email,
      phoneNumber,
      password,
      confirmPass,
    } = ifo;
    console.log(
      username,
      firstname,
      lastname,
      email,
      phoneNumber,
      password,
      confirmPass
    );
    await axios
      .post(`${process.env.REACT_APP_API}/register`, {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        confirmPass: confirmPass,
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
  async loginUser(login) {
    const { username, password } = login;
    console.log(username, password);
    await axios
      .post(`${process.env.REACT_APP_API}/login`, {
        username: username,
        password: password,
      })
      .then((response) => {
        sessionStorage.setItem("token", JSON.stringify(response.data.token));
        this.customer = response.data;
        console.log(this.customer);
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
  getUser() {
    axios
      .get(`${process.env.REACT_APP_API}/getuser`, {
        headers: { "x-access-token": getToken() },
      })
      .then((response) => {
        this.customer = response.data;
        console.log(this.customer);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }
  logout() {
    this.customer = {};
    sessionStorage.removeItem("token");
  }
}

export const userStore = new UserStore();
userStore.getUser();

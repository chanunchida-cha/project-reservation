import { makeAutoObservable } from "mobx";
import axios from "axios";
import Swal from "sweetalert2";
import { authenticate, getToken } from "../services/authorize";

class Store {
  username = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  createUser(ifo) {
    const { username, email, password, confirmPass } = ifo;
    console.log(username, email, password, confirmPass);
    axios
      .post(`${process.env.REACT_APP_API}/register`, {
        username: username,
        email: email,
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
      });
  }
  async loginUser(login) {
    const { username, password } = login;
    console.log(username, password);
    await axios
      .post(`${process.env.REACT_APP_API_AUTH}/login`, {
        username: username,
        password: password,
      })
      .then((response) => {
        sessionStorage.setItem("token", JSON.stringify(response.data.token));
        this.username = response.data.username;
        console.log(this.username.token);
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
      .get(`${process.env.REACT_APP_API_AUTH}/getuser`, {
        headers: { "x-access-token": getToken() },
      })
      .then((response) => {
        this.username = response.data;
        console.log(this.username);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }
  logout() {
    this.username = undefined;
    sessionStorage.removeItem("token");
  }
}

export const store = new Store();
store.getUser();

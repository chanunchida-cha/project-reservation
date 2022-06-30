import { makeAutoObservable } from "mobx";
import axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../../services/authorize";

class UserStore {
  customer = {};
  allRestaurant = [];
  singleRestaurant = [];
  menus = [];

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
    try {
      await axios.post(`${process.env.REACT_APP_API}/register`, {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        confirmPass: confirmPass,
      });
      await Swal.fire("Register Success!", "register success!", "success");
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Sorry",
        text: err.response.data.error,
      });
      console.log(err);
      throw err;
    }
  }

  async loginUser(login) {
    try {
      const { username, password } = login;
      const response = await axios.post(`${process.env.REACT_APP_API}/login`, {
        username: username,
        password: password,
      });
      sessionStorage.setItem("token", JSON.stringify(response.data.token));
      this.customer = response.data;
      console.log(this.customer);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Sorry",
        text: err.response.data.error,
      });

      console.log(err);
      throw err;
    }
  }

  async editCustomer(id, info) {
    const { username, firstname, lastname, email, phoneNumber } = info;
    try {
      await axios.put(`${process.env.REACT_APP_API}/profile/update/${id}`, {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phoneNumber: phoneNumber,
      });
      Swal.fire("แก้ไขข้อมูลสำเร็จ!", "", "success");
      this.getCustomersData();
    } catch (err) {
      Swal.fire({
        icon: "มีบางอย่างผิดพลาด",
        title: "กรุณาตรวจสอบใหม่อีกครั้ง",
        text: err.response.data.error,
      });
    }
  }

  async getUser() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/get-user`,
        {
          headers: { "x-access-token": getToken() },
        }
      );
      this.customer = response.data;
      console.log(this.customer);
    } catch (err) {
      console.log(err.response.data.error);
    }
  }
  logout() {
    this.customer = {};
    sessionStorage.removeItem("token");
  }

  async getAllInformation() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/get-all-info`
      );
      this.allRestaurant = response.data;
      console.log(this.allRestaurant);
    } catch (err) {
      console.log(err.response.data.error);
    }
  }

  async getInformationById(id) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/get-all-info/${id}`
      );
      this.singleRestaurant = response.data;
      console.log(this.singleRestaurant);
    } catch (err) {
      console.log(err.response.data.error);
    }
  }

  async getMenuByRest(id) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PARTNER}/get-menu/${id}`
      );
      this.menus = response.data;
      console.log(this.menus);
    } catch (err) {
      console.log(err.response.data.error);
    }
  }
}

export const userStore = new UserStore();
userStore.getUser();

import { makeAutoObservable } from "mobx";
import axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../../services/authorize";

class UserStore {
  customer = {};

  allDayReservPending = [];
  allDayReservArrived = [];
  roundReservPending = [];
  roundReservArrived = [];
  allDayHistory = [];
  roundHistory = [];

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

  async resetPassword(allPassword) {
    const { oldPassword, newPassword, confirmPassword } = allPassword;
    try {
      await axios.put(
        `${process.env.REACT_APP_API}/reset-password`,
        {
          oldPassWord: oldPassword,
          newPassWord: newPassword,
          confirmNewPassWord: confirmPassword,
        },
        {
          headers: { "x-access-token": getToken() },
        }
      );
      Swal.fire(
        "แก้ไขรหัสผ่านสำเร็จ!",
        "กรุณาเข้าสู่ระบบใหม่อีกครั้ง",
        "success"
      );
      this.logout();
    } catch (err) {
      Swal.fire({
        icon: "มีบางอย่างผิดพลาด",
        title: "กรุณาตรวจสอบใหม่อีกครั้ง",
        text: err.response.data.error,
      });
    }
  }

  async getAllDayReservPending(id) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_RESERV}/customer/get-all-day-reserv-pending/${id}`
      );
      this.allDayReservPending = response.data;
    } catch (err) {
      console.log(err.response.data.error);
    }
  }
  async getAllDayReservArrived(id) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_RESERV}/customer/get-all-day-reserv-arrived/${id}`
      );
      this.allDayReservArrived = response.data;
    } catch (err) {
      console.log(err.response.data.error);
    }
  }
  async getAllDayReservHistory(id) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_RESERV}/customer/get-all-day-reserv-history/${id}`
      );
      this.allDayHistory = response.data;
    } catch (err) {
      console.log(err.response.data.error);
    }
  }
  async getRoundReservPending(id) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_RESERV}/customer/get-round-reserv-pending/${id}`
      );
      this.roundReservPending = response.data;
    } catch (err) {
      console.log(err.response.data.error);
    }
  }
  async getRoundReservArrived(id) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_RESERV}/customer/get-round-reserv-arrived/${id}`
      );
      this.roundReservArrived = response.data;
    } catch (err) {
      console.log(err.response.data.error);
    }
  }
  async getRoundReservHistory(id) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_RESERV}/customer/get-round-reserv-history/${id}`
      );
      this.roundHistory = response.data;
    } catch (err) {
      console.log(err.response.data.error);
    }
  }
}

export const userStore = new UserStore();
userStore.getUser();

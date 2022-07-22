import { makeAutoObservable } from "mobx";
import axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../../services/authorize";

class AdminStore {
  adminlogin = {};
  allParner = [];
  partners = [];
  partner = {};
  partnersApprove = [];
  partnersDisApprove = [];
  customers = [];
  customer = {};
  admins = [];
  admin = {};
  constructor() {
    makeAutoObservable(this);
  }
  async loginAdmin(login) {
    try {
      const { username, password } = login;
      const response = await axios.post(
        `${process.env.REACT_APP_API_ADMIN}/admin-login`,
        {
          username: username,
          password: password,
        }
      );
      sessionStorage.setItem("token", JSON.stringify(response.data.token));
      this.adminlogin = response.data;
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
  async getAdmin() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ADMIN}/get-admin`,
        {
          headers: { "x-access-token": getToken() },
        }
      );
      this.adminlogin = response.data;
      console.log(this.adminlogin);
    } catch (err) {
      console.log(err.response.data.error);
    }
  }
  logout() {
    this.adminlogin = {};
    sessionStorage.removeItem("token");
  }

  async resetPassword(allPassword) {
    const { oldPassword, newPassword, confirmPassword } = allPassword;
    try {
      await axios.put(
        `${process.env.REACT_APP_API_ADMIN}/reset-password`,
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
  async getAllPartner() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ADMIN}/all-partner`
      );
      this.allParner = response.data;
      console.log(this.allParner);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.error,
      });
    }
  }
  async getPartnerVarify() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ADMIN}/verify`
      );
      this.partners = response.data;
      console.log(this.partners);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.error,
      });
    }
  }
  async getPartnerApprove() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ADMIN}/approve`
      );
      this.partnersApprove = response.data;
      console.log(this.partnersApprove);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.error,
      });
    }
  }
  async getPartnerDisApprove() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ADMIN}/disapprove`
      );
      this.partnersDisApprove = response.data;
      console.log(this.partnersDisApprove);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.error,
      });
    }
  }

  async getPartnerVarifyById(id) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ADMIN}/verify/${id}`
      );
      this.partner = response.data;
      console.log(this.partner);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.error,
      });
    }
  }
  async getCustomerById(id) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ADMIN}/customers-data/${id}`
      );
      this.customer = response.data;
      console.log(this.customer);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.error,
      });
    }
  }
  async updateStatusPartner(id, status, note) {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_ADMIN}/update-status/${id}`,
        {
          status: status,
          note: note,
        }
      );
      this.getPartnerApprove();
    } catch (err) {
      console.log(err);
    }
  }

  async getCustomersData() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ADMIN}/customers-data`
      );
      this.customers = response.data;
      console.log(this.customers);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.error,
      });
    }
  }
  async createCustomer(info) {
    const {
      username,
      firstname,
      lastname,
      email,
      phoneNumber,
      password,
      confirmPass,
    } = info;
    try {
      await axios.post(`${process.env.REACT_APP_API_ADMIN}/create-customer`, {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        confirmPass: confirmPass,
      });
      Swal.fire(
        "เพิ่มข้อมูลลูกค้าเรียบร้อยแล้ว",
        "create customer success!",
        "success"
      );
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "มีข้อผิดพลาด",
        text: err.response.data.error,
      });
      console.log(err);
      throw err;
    }
  }

  async deleteCustomer(id) {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_ADMIN}/delete-customer/${id}`
      );
      Swal.fire(
        "ลบข้อมูลลูกค้าเรียบร้อยแล้ว!",
        response.data.message,
        "success"
      );
      this.getCustomersData();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.error,
      });
    }
  }

  async editCustomer(id, info) {
    const {
      username,
      firstname,
      lastname,
      email,
      phoneNumber,
      password,
      confirmPass,
    } = info;
    try {
      await axios.put(
        `${process.env.REACT_APP_API_ADMIN}/edit-customer/${id}`,
        {
          username: username,
          firstname: firstname,
          lastname: lastname,
          email: email,
          phoneNumber: phoneNumber,
          password: password,
          confirmPass: confirmPass,
        }
      );
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
  async createPartner(partner) {
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
    try {
      await axios.post(`${process.env.REACT_APP_API_ADMIN}/create-partner`, {
        restaurantName: restaurantName,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        username: username,
        password: password,
        confirmPass: confirmPass,
      });
      Swal.fire(
        "เพิ่มข้อมูลร้านอาหารเรียบร้อยแล้ว",
        "create partner success!",
        "success"
      );
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "มีข้อผิดพลาด",
        text: err.response.data.error,
      });
      console.log(err);
      throw err;
    }
  }

  async editPartner(id, partner) {
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
    try {
      await axios.put(`${process.env.REACT_APP_API_ADMIN}/edit-partner/${id}`, {
        restaurantName: restaurantName,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        username: username,
        password: password,
        confirmPass: confirmPass,
      });
      Swal.fire("แก้ไขข้อมูลสำเร็จ!", "", "success");
      this.getAllPartner();
    } catch (err) {
      Swal.fire({
        icon: "มีบางอย่างผิดพลาด",
        title: "กรุณาตรวจสอบใหม่อีกครั้ง",
        text: err.response.data.error,
      });
    }
  }
  async deletePartner(id) {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_ADMIN}/delete-partner/${id}`
      );
      Swal.fire(
        "ลบข้อมูลร้านอาหารเรียบร้อยแล้ว!",
        response.data.message,
        "success"
      );
      this.getPartnerVarify();
      this.getPartnerApprove();
      this.getPartnerDisApprove();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.error,
      });
    }
  }

  async getAdminsData() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ADMIN}/admins-data`
      );
      this.admins = response.data;
      console.log(this.admins);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.error,
      });
    }
  }
  async getAdminById(id) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ADMIN}/admins-data/${id}`
      );
      this.admin = response.data;
      console.log(this.admin);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.error,
      });
    }
  }

  async createAdmin(admin) {
    const {
      username,
      firstname,
      lastname,
      email,
      phoneNumber,
      password,
      confirmPass,
    } = admin;

    try {
      await axios.post(`${process.env.REACT_APP_API_ADMIN}/create-admin`, {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        confirmPass: confirmPass,
      });
      Swal.fire(
        "เพิ่มข้อมูลผู้ดูแลระบบเรียบร้อยแล้ว",
        "create admin success!",
        "success"
      );
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "มีข้อผิดพลาด",
        text: err.response.data.error,
      });
      console.log(err);
      throw err;
    }
  }

  async editAdmin(id, admin) {
    const {
      username,
      firstname,
      lastname,
      email,
      phoneNumber,
      password,
      confirmPass,
    } = admin;
    try {
      await axios.put(`${process.env.REACT_APP_API_ADMIN}/edit-admin/${id}`, {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        confirmPass: confirmPass,
      });
      Swal.fire("แก้ไขข้อมูลสำเร็จ!", "", "success");
      this.getAdminsData();
    } catch (err) {
      Swal.fire({
        icon: "มีบางอย่างผิดพลาด",
        title: "กรุณาตรวจสอบใหม่อีกครั้ง",
        text: err.response.data.error,
      });
    }
  }
  async deleteAdmin(id) {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_ADMIN}/delete-admin/${id}`
      );
      Swal.fire(
        "ลบข้อมูลผู้ดูแลระบบเรียบร้อยแล้ว!",
        response.data.message,
        "success"
      );
      this.getAdminsData();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.error,
      });
    }
  }
}

export const adminStore = new AdminStore();
adminStore.getAdmin();

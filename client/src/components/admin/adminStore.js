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
    const { username, password } = login;
    console.log(username, password);
    await axios
      .post(`${process.env.REACT_APP_API_ADMIN}/adminlogin`, {
        username: username,
        password: password,
      })
      .then((response) => {
        sessionStorage.setItem("token", JSON.stringify(response.data.token));
        this.adminlogin = response.data;
        console.log(this.adminlogin);
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
  getAdmin() {
    axios
      .get(`${process.env.REACT_APP_API_ADMIN}/getadmin`, {
        headers: { "x-access-token": getToken() },
      })
      .then((response) => {
        this.adminlogin = response.data;
        console.log(this.adminlogin);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }
  logout() {
    this.adminlogin = {};
    sessionStorage.removeItem("token");
  }
  getAllPartner() {
    axios
      .get(`${process.env.REACT_APP_API_ADMIN}/allpartner`)
      .then((response) => {
        this.allParner = response.data;
        console.log(this.allParner);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  }
  getPartnerVarify() {
    axios
      .get(`${process.env.REACT_APP_API_ADMIN}/verify`)
      .then((response) => {
        this.partners = response.data;
        console.log(this.partners);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  }
  getPartnerApprove() {
    axios
      .get(`${process.env.REACT_APP_API_ADMIN}/approve`)
      .then((response) => {
        this.partnersApprove = response.data;
        console.log(this.partnersApprove);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  }
  getPartnerDisApprove() {
    axios
      .get(`${process.env.REACT_APP_API_ADMIN}/disapprove`)
      .then((response) => {
        this.partnersDisApprove = response.data;
        console.log(this.partnersDisApprove);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  }

  async getPartnerVarifyById(id) {
    await axios
      .get(`${process.env.REACT_APP_API_ADMIN}/verify/${id}`)
      .then((response) => {
        this.partner = response.data;
        console.log(this.partner);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  }
  async getCustomerById(id) {
    await axios
      .get(`${process.env.REACT_APP_API_ADMIN}/customersdata/${id}`)
      .then((response) => {
        this.customer = response.data;
        console.log(this.customer);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  }
  updateStatusPartner(id, status, note) {
    console.log(id);
    console.log(status);
    console.log(note);
    axios
      .put(`${process.env.REACT_APP_API_ADMIN}/updatestatus/${id}`, {
        status: status,
        note: note,
      })
      .then(() => {
        this.getPartnerApprove();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCustomersData() {
    axios
      .get(`${process.env.REACT_APP_API_ADMIN}/customersdata`)
      .then((response) => {
        this.customers = response.data;
        console.log(this.customers);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
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
      .post(`${process.env.REACT_APP_API_ADMIN}/createcustomer`, {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        confirmPass: confirmPass,
      })
      .then((response) => {
        Swal.fire(
          "เพิ่มข้อมูลลูกค้าเรียบร้อยแล้ว",
          "create customer success!",
          "success"
        );
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "มีข้อผิดพลาด",
          text: err.response.data.error,
        });
        console.log(err);
        throw err;
      });
  }

  deleteCustomer(id) {
    axios
      .delete(`${process.env.REACT_APP_API_ADMIN}/deletecustomer/${id}`)
      .then((response) => {
        Swal.fire(
          "ลบข้อมูลลูกค้าเรียบร้อยแล้ว!",
          response.data.message,
          "success"
        );
        this.getCustomersData();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  }

  editCustomer(id, info) {
    const {
      username,
      firstname,
      lastname,
      email,
      phoneNumber,
      password,
      confirmPass,
    } = info;
    axios
      .put(`${process.env.REACT_APP_API_ADMIN}/editcustomer/${id}`, {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        confirmPass: confirmPass,
      })
      .then((response) => {
        Swal.fire("แก้ไขข้อมูลสำเร็จ!", "", "success");
        this.getCustomersData();
      })
      .catch((err) => {
        Swal.fire({
          icon: "มีบางอย่างผิดพลาด",
          title: "กรุณาตรวจสอบใหม่อีกครั้ง",
          text: err.response.data.error,
        });
      });
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
    await axios
      .post(`${process.env.REACT_APP_API_ADMIN}/createpartner`, {
        restaurantName: restaurantName,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        username: username,
        password: password,
        confirmPass: confirmPass,
      })
      .then((response) => {
        Swal.fire(
          "เพิ่มข้อมูลร้านอาหารเรียบร้อยแล้ว",
          "create partner success!",
          "success"
        );
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "มีข้อผิดพลาด",
          text: err.response.data.error,
        });
        console.log(err);
        throw err;
      });
  }

  editPartner(id, partner) {
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
    axios
      .put(`${process.env.REACT_APP_API_ADMIN}/editpartner/${id}`, {
        restaurantName: restaurantName,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        username: username,
        password: password,
        confirmPass: confirmPass,
      })
      .then((response) => {
        Swal.fire("แก้ไขข้อมูลสำเร็จ!", "", "success");
        this.getAllPartner();
      })
      .catch((err) => {
        Swal.fire({
          icon: "มีบางอย่างผิดพลาด",
          title: "กรุณาตรวจสอบใหม่อีกครั้ง",
          text: err.response.data.error,
        });
      });
  }
  deletePartner(id) {
    axios
      .delete(`${process.env.REACT_APP_API_ADMIN}/deletepartner/${id}`)
      .then((response) => {
        Swal.fire(
          "ลบข้อมูลร้านอาหารเรียบร้อยแล้ว!",
          response.data.message,
          "success"
        );
        this.getPartnerVarify();
        this.getPartnerApprove();
        this.getPartnerDisApprove();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  }

  getAdminsData() {
    axios
      .get(`${process.env.REACT_APP_API_ADMIN}/adminsdata`)
      .then((response) => {
        this.admins = response.data;
        console.log(this.admins);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  }
  async getAdminById(id) {
    await axios
      .get(`${process.env.REACT_APP_API_ADMIN}/adminsdata/${id}`)
      .then((response) => {
        this.admin = response.data;
        console.log(this.admin);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
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
      .post(`${process.env.REACT_APP_API_ADMIN}/createadmin`, {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        confirmPass: confirmPass,
      })
      .then((response) => {
        Swal.fire(
          "เพิ่มข้อมูลผู้ดูแลระบบเรียบร้อยแล้ว",
          "create admin success!",
          "success"
        );
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "มีข้อผิดพลาด",
          text: err.response.data.error,
        });
        console.log(err);
        throw err;
      });
  }

  editAdmin(id, admin) {
    const {
      username,
      firstname,
      lastname,
      email,
      phoneNumber,
      password,
      confirmPass,
    } = admin;
    axios
      .put(`${process.env.REACT_APP_API_ADMIN}/editadmin/${id}`, {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        confirmPass: confirmPass,
      })
      .then((response) => {
        Swal.fire("แก้ไขข้อมูลสำเร็จ!", "", "success");
        this.getAdminsData();
      })
      .catch((err) => {
        Swal.fire({
          icon: "มีบางอย่างผิดพลาด",
          title: "กรุณาตรวจสอบใหม่อีกครั้ง",
          text: err.response.data.error,
        });
      });
  }
  deleteAdmin(id) {
    axios
      .delete(`${process.env.REACT_APP_API_ADMIN}/deleteadmin/${id}`)
      .then((response) => {
        Swal.fire(
          "ลบข้อมูลผู้ดูแลระบบเรียบร้อยแล้ว!",
          response.data.message,
          "success"
        );
        this.getAdminsData();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  }
}

export const adminStore = new AdminStore();

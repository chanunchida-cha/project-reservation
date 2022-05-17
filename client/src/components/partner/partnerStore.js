import { makeAutoObservable } from "mobx";
import axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../../services/authorize";

class PartnerStore {
  partnerlogin = {};
  allPartnerInfo = [];
  partnerInfo = [];
  menus = [];
  menu = {};
  tables = [];
  table = {};

  constructor() {
    makeAutoObservable(this);
  }

  async createPartner(partner) {
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

    await axios
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

  async createInformation(formData) {
    // const { description, address, contact } = info;

    //console.log(partner_id, description, address, contact, openday);
    await axios
      .post(`${process.env.REACT_APP_API_PARTNER}/create-info`, formData)
      .then((response) => {
        Swal.fire(
          "บันทึกข้อมูลทั่วไปของร้านเรียบร้อยแล้ว",
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
        console.log(err.response.data.error);
        throw err;
      });
  }
  getAllInformation() {
    axios
      .get(`${process.env.REACT_APP_API_PARTNER}/get-all-info`)
      .then((response) => {
        this.allPartnerInfo = response.data;
        console.log(this.allPartnerInfo);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }

  async getInformation(id) {
    await axios
      .get(`${process.env.REACT_APP_API_PARTNER}/get-all-info/${id}`)
      .then((response) => {
        this.partnerInfo = response.data;
        console.log(this.partnerInfo);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }

  async updateInformation(id, formData) {
    console.log("formdata", formData);
    await axios
      .put(`${process.env.REACT_APP_API_PARTNER}/update-info/${id}`, formData)
      .then((response) => {
        Swal.fire("แก้ไขข้อมูลสำเร็จ!", "", "success");
      })
      .catch((err) => {
        console.log(err.response.data.error);
        throw err;
      });
  }

  async createMenu(formData) {
    // const { description, address, contact } = info;

    //console.log(partner_id, description, address, contact, openday);
    await axios
      .post(`${process.env.REACT_APP_API_PARTNER}/create-menu`, formData)
      .then((response) => {
        Swal.fire(
          "บันทึกข้อมูลเมนูอาหารเรียบร้อยแล้ว",
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
        console.log(err.response.data.error);
        throw err;
      });
  }

  async getMenuByRest(id) {
    await axios
      .get(`${process.env.REACT_APP_API_PARTNER}/get-menu/${id}`)
      .then((response) => {
        this.menus = response.data;
        console.log(this.menus);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }

  async getMenuById(id) {
    await axios
      .get(`${process.env.REACT_APP_API_PARTNER}/get-menu-by-id/${id}`)
      .then((response) => {
        this.menu = response.data;
        console.log(this.menu);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }

  async updateMenu(id, formData) {
    console.log("formdata", formData);
    await axios
      .put(`${process.env.REACT_APP_API_PARTNER}/update-menu/${id}`, formData)
      .then((response) => {
        Swal.fire("แก้ไขข้อมูลสำเร็จ!", "", "success");
      })
      .catch((err) => {
        console.log(err.response.data.error);
        throw err;
      });
  }

  async deleteMenu(menu_id, id) {
    await axios
      .delete(`${process.env.REACT_APP_API_PARTNER}/delete-menu/${menu_id}`)
      .then((response) => {
        Swal.fire(
          "ลบข้อมูลเมนูอาหารเรียบร้อยแล้ว!",
          response.data.message,
          "success"
        );
        this.getMenuByRest(id);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  }

  async createTable(partner_id, table) {
    const { table_no, seat, description } = table;
    await axios
      .post(`${process.env.REACT_APP_API_PARTNER}/create-table`, {
        partner_id: partner_id,
        table_no: table_no,
        seat: seat,
        description: description,
      })
      .then((response) => {
        Swal.fire(
          "เพิ่มข้อมูลโต๊ะเรียบร้อยแล้ว",
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
  async getTableByRest(id) {
    await axios
      .get(`${process.env.REACT_APP_API_PARTNER}/get-table/${id}`)
      .then((response) => {
        this.tables = response.data;
        console.log(this.tables);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }
  async getTableById(id) {
    await axios
      .get(`${process.env.REACT_APP_API_PARTNER}/get-table-by-id/${id}`)
      .then((response) => {
        this.table = response.data;
        console.log(this.table);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }
  async updateTable(id, partner_id, table) {
    const { table_no, seat, description } = table;
    await axios
      .put(`${process.env.REACT_APP_API_PARTNER}/update-table/${id}`, {
        partner_id: partner_id,
        table_no: table_no,
        seat: seat,
        description: description,
      })
      .then((response) => {
        Swal.fire(
          "แก้ไขข้อมูลโต๊ะเรียบร้อยแล้ว",
          "update customer success!",
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
  async deleteTable(table_id, id) {
    await axios
      .delete(`${process.env.REACT_APP_API_PARTNER}/delete-table/${table_id}`)
      .then((response) => {
        Swal.fire(
          "ลบข้อมูลโต๊ะเรียบร้อยแล้ว!",
          response.data.message,
          "success"
        );
        this.getTableByRest(id);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  }

  async loginPartner(login) {
    const { username, password } = login;
    console.log(username, password);
    await axios
      .post(`${process.env.REACT_APP_API_PARTNER}/partner-login`, {
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
  async getPartner() {
    await axios
      .get(`${process.env.REACT_APP_API_PARTNER}/get-partner`, {
        headers: { "x-access-token": getToken() },
      })
      .then((response) => {
        this.partnerlogin = response.data;
        console.log(this.partnerlogin);
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

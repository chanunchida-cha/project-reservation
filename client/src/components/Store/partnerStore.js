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
  tables_no = [];
  countPerDay = [];

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
    try {
      await axios.post(`${process.env.REACT_APP_API_PARTNER}/register`, {
        restaurantName: restaurantName,
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
        confirmPass: confirmPass,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
      });
      Swal.fire("Register Success!", "register success!", "success");
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

  async createInformation(formData) {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_PARTNER}/create-info`,
        formData
      );
      Swal.fire(
        "บันทึกข้อมูลทั่วไปของร้านเรียบร้อยแล้ว",
        "create customer success!",
        "success"
      );
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "มีข้อผิดพลาด",
        text: err.response.data.error,
      });
      console.log(err.response.data.error);
      throw err;
    }
  }
  async getAllInformation() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PARTNER}/get-all-info`
      );
      this.allPartnerInfo = response.data;
      console.log(this.allPartnerInfo);
    } catch (err) {
      console.log(err.response.data.error);
    }
  }

  async getInformation(id) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PARTNER}/get-all-info/${id}`
      );
      this.partnerInfo = response.data;
      console.log(this.partnerInfo);
    } catch (err) {
      console.log(err.response.data.error);
      throw err;
    }
  }

  async updateInformation(formData) {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_PARTNER}/update-info`,
        formData,
        {
          headers: { "x-access-token": getToken() },
        }
      );
      Swal.fire("แก้ไขข้อมูลสำเร็จ!", "", "success");
    } catch (err) {
      console.log(err.response.data.error);
      throw err;
    }
  }

  async createMenu(formData) {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_PARTNER}/create-menu`,
        formData
      );
      Swal.fire(
        "บันทึกข้อมูลเมนูอาหารเรียบร้อยแล้ว",
        "create customer success!",
        "success"
      );
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "มีข้อผิดพลาด",
        text: err.response.data.error,
      });
      console.log(err.response.data.error);
      throw err;
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

  async getMenuById(id) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PARTNER}/get-menu-by-id/${id}`
      );
      this.menu = response.data;
      console.log(this.menu);
    } catch (err) {
      console.log(err.response.data.error);
    }
  }

  async updateMenu(id, formData) {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_PARTNER}/update-menu/${id}`,
        formData,
        {
          headers: { "x-access-token": getToken() },
        }
      );
      Swal.fire("แก้ไขข้อมูลสำเร็จ!", "", "success");
    } catch (err) {
      console.log(err.response.data.error);
      throw err;
    }
  }

  async deleteMenu(menu_id, id) {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_PARTNER}/delete-menu/${menu_id}`
      );
      Swal.fire(
        "ลบข้อมูลเมนูอาหารเรียบร้อยแล้ว!",
        response.data.message,
        "success"
      );
      this.getMenuByRest(id);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.error,
      });
    }
  }

  async createTable(partner_id, table) {
    try {
      const { table_no, seat } = table;
      await axios.post(`${process.env.REACT_APP_API_PARTNER}/create-table`, {
        partner_id: partner_id,
        table_no: table_no,
        seat: seat,
      });
      Swal.fire(
        "เพิ่มข้อมูลโต๊ะเรียบร้อยแล้ว",
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
  async getTableByRest(id) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PARTNER}/get-table/${id}`
      );
      this.tables = response.data;
      console.log(this.tables);
    } catch (err) {
      console.log(err.response.data.error);
    }
  }
  async getTableById(id) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PARTNER}/get-table-by-id/${id}`
      );
      this.table = response.data;
      console.log(this.table);
    } catch (err) {
      console.log(err.response.data.error);
    }
  }

  async getCountPerDay(id) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_DASHBOARD}/get-count-allday-reserv-for-day/${id}`
      );
      this.countPerDay = response.data;
      console.log(this.countPerDay);
    } catch (err) {
      console.log(err.response.data.error);
    }
  }
  async updateTable(id, table) {
    try {
      const { table_no, seat, description } = table;
      await axios.put(
        `${process.env.REACT_APP_API_PARTNER}/update-table/${id}`,
        {
          table_no: table_no,
          seat: seat,
          description: description,
        },
        {
          headers: { "x-access-token": getToken() },
        }
      );
      Swal.fire(
        "แก้ไขข้อมูลโต๊ะเรียบร้อยแล้ว",
        "update customer success!",
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
  async deleteTable(table_id, id) {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_PARTNER}/delete-table/${table_id}`
      );
      Swal.fire("ลบข้อมูลโต๊ะเรียบร้อยแล้ว!", response.data.message, "success");
      this.getTableByRest(id);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.error,
      });
    }
  }

  async loginPartner(login) {
    try {
      const { username, password } = login;
      const response = await axios.post(
        `${process.env.REACT_APP_API_PARTNER}/partner-login`,
        {
          username: username,
          password: password,
        }
      );
      sessionStorage.setItem("token", JSON.stringify(response.data.token));
      this.partnerlogin = response.data;
      console.log(this.partnerlogin);
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
  async getPartner() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PARTNER}/get-partner`,
        {
          headers: { "x-access-token": getToken() },
        }
      );
      this.partnerlogin = response.data;
      console.log(this.partnerlogin);
    } catch (err) {
      console.log(err.response.data.error);
    }
  }
  logout() {
    this.partnerlogin = {};
    sessionStorage.removeItem("token");
  }

  async resetPassword(allPassword) {
    const { oldPassword, newPassword, confirmPassword } = allPassword;
    try {
      await axios.put(
        `${process.env.REACT_APP_API_PARTNER}/reset-password`,
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
}

export const partnerStore = new PartnerStore();
partnerStore.getPartner();

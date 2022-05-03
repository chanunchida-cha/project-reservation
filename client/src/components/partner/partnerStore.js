import { makeAutoObservable } from "mobx";
import axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../../services/authorize";

class PartnerStore {
  partnerlogin = {};
  allPartnerInfo = [];
  partnerInfo = [];

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
      .post(`${process.env.REACT_APP_API_PARTNER}/createinfo`, formData)
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
      .get(`${process.env.REACT_APP_API_PARTNER}/getallinfo`)
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
      .get(`${process.env.REACT_APP_API_PARTNER}/getallinfo/${id}`)
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
      .put(`${process.env.REACT_APP_API_PARTNER}/updateinfo/${id}`, formData)
      .then((response) => {
        Swal.fire("แก้ไขข้อมูลสำเร็จ!", "", "success");
      })
      .catch((err) => {
        console.log(err.response.data.error);
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
  async getPartner() {
    await axios
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

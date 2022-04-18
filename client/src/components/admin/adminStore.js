import { makeAutoObservable } from "mobx";
import axios from "axios";
import Swal from "sweetalert2";

class AdminStore {
  partners = [];
  partner = [];
  partnersApprove = [];
  constructor() {
    makeAutoObservable(this);
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

  getPartnerVarifyById(id) {
    axios
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

  updateStatusPartner(id, status) {
    console.log(id);
    console.log(status);
    axios
      .put(`${process.env.REACT_APP_API_ADMIN}/updatestatus/${id}`, {
        status: status,
      })
      .then(() => {
        this.getPartnerVarify();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export const adminStore = new AdminStore();

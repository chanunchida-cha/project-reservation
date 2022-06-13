import { makeAutoObservable } from "mobx";
import axios from "axios";
import Swal from "sweetalert2";

class ReservStore {
  allDayReserv = [];
  allDayReservToday = [];
  allDayReservById = [];
  roundReserv = [];
  roundReservToday = [];
  roundReservById = [];
  constructor() {
    makeAutoObservable(this);
  }
  async getAlldayToday(id) {
    await axios
      .get(`${process.env.REACT_APP_API_RESERV}/get-all-day-reserv-today/${id}`)
      .then((response) => {
        this.allDayReservToday = response.data;
        console.log(this.allDayReservToday);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  }
  async getAllday(id) {
    await axios
      .get(`${process.env.REACT_APP_API_RESERV}/get-all-day-reserv/${id}`)
      .then((response) => {
        this.allDayReserv = response.data;
        console.log(this.allDayReserv);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  }
  async getRoundToday(id) {
    await axios
      .get(`${process.env.REACT_APP_API_RESERV}/get-round-reserv-today/${id}`)
      .then((response) => {
        this.roundReservToday = response.data;
        console.log(this.roundReservToday);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  }
  async getRound(id) {
    await axios
      .get(`${process.env.REACT_APP_API_RESERV}/get-round-reserv/${id}`)
      .then((response) => {
        this.roundReserv = response.data;
        console.log(this.roundReserv);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  }

  async getAlldayById(id) {
    await axios
      .get(`${process.env.REACT_APP_API_RESERV}/get-all-day-reserv-by-id/${id}`)
      .then((response) => {
        this.allDayReservById = response.data;
        console.log(this.allDayReservById);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  }
  async getRoundById(id) {
    await axios
      .get(`${process.env.REACT_APP_API_RESERV}/get-round-reserv-by-id/${id}`)
      .then((response) => {
        this.roundReservById = response.data;
        console.log(this.roundReservById);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  }
  async selfRoundReserv(partner_id, selfReserv, amount, date, start, end) {
    await axios
      .post(`${process.env.REACT_APP_API_RESERV}/partner/round-reserv`, {
        partner_id: partner_id,
        self_reserv: selfReserv,
        day: date,
        start: start,
        end: end,
        amount: amount,
      })
      .then((response) => {
        Swal.fire("จองคิวสำเร็จ!", "การจองคิวเรียบร้อยแล้ว", "success");
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

  async selfAllDayReserv(partner_id, selfReserv, amount, date, start) {
    await axios
      .post(`${process.env.REACT_APP_API_RESERV}/partner/all-day-reserv`, {
        partner_id: partner_id,
        self_reserv: selfReserv,
        day: date,
        start: start,
        amount: amount,
      })
      .then((response) => {
        Swal.fire("จองคิวสำเร็จ!", "การจองคิวเรียบร้อยแล้ว", "success");
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
  async selfAllDayUpdate(
    id,
    partnerId,
    selfReserv,
    amount,
    date,
    start,
    table
  ) {
    await axios
      .put(
        `${process.env.REACT_APP_API_RESERV}/partner/update-self-all-day-reserv/${id}`,
        {
          partner_id: partnerId,
          self_reserv: selfReserv,
          day: date,
          start: start,
          amount: amount,
          table: table,
        }
      )
      .then(() => {
        Swal.fire("แก้ไขข้อมูลเรียบร้อยแล้ว", "update success!", "success");
        this.getAllday(partnerId);
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

  async selfRoundUpdate(
    id,
    partnerId,
    self_reserv,
    amount,
    date,
    start,
    end,
    table
  ) {
    await axios
      .put(
        `${process.env.REACT_APP_API_RESERV}/partner/update-self-round-day-reserv/${id}`,
        {
          partner_id: partnerId,
          self_reserv: self_reserv,
          day: date,
          start: start,
          end: end,
          amount: amount,
          table: table,
        }
      )
      .then(() => {
        Swal.fire("แก้ไขข้อมูลเรียบร้อยแล้ว", "update success!", "success");
        this.getRound(partnerId);
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

  async customerRoundUpdate(
    id,
    partnerId,
    customer_id,
    amount,
    date,
    start,
    end,
    table
  ) {
    await axios
      .put(
        `${process.env.REACT_APP_API_RESERV}/partner/update-customer-round-day-reserv/${id}`,
        {
          partner_id: partnerId,
          customer_id: customer_id,
          day: date,
          start: start,
          end: end,
          amount: amount,
          table: table,
        }
      )
      .then(() => {
        Swal.fire("แก้ไขข้อมูลเรียบร้อยแล้ว", "update success!", "success");
        this.getRound(partnerId);
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

  async allDayDalete(reserv_id, id) {
    await axios
      .delete(
        `${process.env.REACT_APP_API_RESERV}/partner/delete-all-day-reserv/${reserv_id}`
      )
      .then((response) => {
        Swal.fire(
          "ลบข้อมูลเมนูอาหารเรียบร้อยแล้ว!",
          response.data.message,
          "success"
        );
        this.getAllday(id);
        this.getAlldayToday(id);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  }

  async RoundDalete(reserv_id, id) {
    await axios
      .delete(
        `${process.env.REACT_APP_API_RESERV}/partner/delete-round-reserv/${reserv_id}`
      )
      .then((response) => {
        Swal.fire(
          "ลบข้อมูลเมนูอาหารเรียบร้อยแล้ว!",
          response.data.message,
          "success"
        );
        this.getRound(id);
        this.getRoundToday(id);
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
export const reservStore = new ReservStore();

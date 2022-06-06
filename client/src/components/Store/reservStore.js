import { makeAutoObservable } from "mobx";
import axios from "axios";
import Swal from "sweetalert2";

class ReservStore {
  constructor() {
    makeAutoObservable(this);
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
}
export const reservStore = new ReservStore();

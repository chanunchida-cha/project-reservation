import { makeAutoObservable } from "mobx";
import axios from "axios";
import Swal from "sweetalert2";

class ReservStore {
  constructor() {
    makeAutoObservable(this);
  }

  async selfAllDayReserv(
    partner_id,
    selfReserv,
    amount,
    date,
    start,
    time_length
  ) {
    await axios
      .post(`${process.env.REACT_APP_API_RESERV}/partner/all-day-reserv`, {
        partner_id: partner_id,
        self_reserv: selfReserv,
        day: date,
        start: start,
        time_length: time_length,
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

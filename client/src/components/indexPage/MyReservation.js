import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { userStore } from "../Store/userStore";
import { reservStore } from "../Store/reservStore";
import { useParams } from "react-router-dom";
const MyReservation = observer(() => {
  const { id } = useParams();
  const { type } = useParams();
  const {typecustomer} = useParams()
  useEffect(() => {
    const getReserv = async()=>{
      if(type === "rounds"){
      await  reservStore.getRoundById(id);
      }
      await reservStore.getAlldayById(id)
    }
    getReserv()
  }, []);

  console.log(type);
  return (
    <div className="mt-32 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl  lg:grid lg:grid-cols-6 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
      {(type === "allday"?reservStore.allDayReservById:reservStore.roundReservById).map((reserv) => {
        return <div>{reserv.reservNumber}</div>;
      })}
    </div>
  );
});

export default MyReservation;

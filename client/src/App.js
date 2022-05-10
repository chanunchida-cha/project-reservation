import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { userStore } from "./components/customer/userStore";
import { Button } from "antd";

const App = observer(() => {
  return (
    <div>
   <img className="w-full p-0" src={"/images/1.png"} />
    </div>
  );
});
export default App;

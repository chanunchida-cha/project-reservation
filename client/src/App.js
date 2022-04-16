import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { userStore } from "./components/customer/userStore";

const App = observer(() => {
  return (
    <div>
      <div className="container p-2 ">
        {userStore.username}
        <h1 className="text-3xl font-bold underline">Hello</h1>
      </div>
    </div>
  );
});
export default App;

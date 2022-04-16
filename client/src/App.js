import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { userStore } from "./components/customer/userStore";
import { Button } from "antd";

const App = observer(() => {
  return (
    <div className="p-2">
      {userStore.username}
      <h1 className="text-3xl font-bold underline">Hello</h1>
      <Button type="primary">Button</Button>
    </div>
  );
});
export default App;

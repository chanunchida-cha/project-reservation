import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { store } from "./components/Store";

const App = observer(() => {
  return (
    <div className="ml-9 ">
      {store.username}
      <h1 className="text-3xl font-bold underline">Hello</h1>
    </div>
  );
});
export default App;

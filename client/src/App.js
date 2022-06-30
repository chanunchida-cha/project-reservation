import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Banner from "./components/indexPage/Banner";
import ShowRestaurant from "./components/indexPage/ShowRestaurant";

const App = observer(() => {
  
  return (
    <div>
      <Banner />
      <div className="mx-3">
        <ShowRestaurant />
      </div>
    </div>
  );
});
export default App;

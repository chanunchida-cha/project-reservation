import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Banner from "./components/indexPage/Banner"

const App = observer(() => {
  return (
    <div>
   <Banner/>
    </div>
  );
});
export default App;

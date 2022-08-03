import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import ShowRestaurant from "./components/indexPage/ShowRestaurant";
import SearchText from "./components/SearchText/SearchText";

const App = observer(() => {
  const [searchText, setSearchText] = useState("");
  return (
    <div>
      <div className="bg-index bg-cover bg-center h-40 sm:h-40 xl:h-96">
        <center>
          <div className="w-2/4 mt-10 sm:w-2/4 xl:w-1/4  py-14 sm:py-14  xl:py-40">
            <SearchText value={searchText} onChangeValue={setSearchText} />
          </div>
        </center>
      </div>
      <div className="mx-3">
        <ShowRestaurant value={searchText} />
      </div>
    </div>
  );
});
export default App;

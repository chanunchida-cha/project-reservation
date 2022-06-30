import React from "react";
import SearchText from "../SearchText/SearchText";

function Banner() {
  return (
    <div>
      <div className="bg-index bg-cover bg-center h-40 sm:h-40 xl:h-96">
        <center>
          <div className="w-2/4 mt-10 sm:w-2/4 xl:w-1/4  py-14 sm:py-14  xl:py-40">
            <SearchText />
          </div>
        </center>
      </div>
    </div>
  );
}

export default Banner;

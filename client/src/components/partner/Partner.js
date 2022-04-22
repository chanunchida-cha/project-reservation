import React from "react";
import { Link, withRouter } from "react-router-dom";
import Navbar from "../Navbar";

function Partner() {
  return (
    <div>
      <div className="container p-5 pt-2">
        Partner with us
        <div>
          <button type="button" className="btn btn-primary btn-sm">
            <a href="/registerpartner">Join now</a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Partner;

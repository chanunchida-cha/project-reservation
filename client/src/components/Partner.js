import React from "react";
import { Link, withRouter } from "react-router-dom";

function Partner() {
  return (
    <div className="container p-5 pt-2">
      Partner with us
      <div>
        <button type="button" className="btn btn-primary btn-sm">
          <a href="/partnerregister">Join now</a>
        </button>
      </div>
    </div>
  );
}

export default Partner;

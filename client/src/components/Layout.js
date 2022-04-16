import React from "react";
import HomeAdmin from "./admin/HomeAdmin";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import Sidebar from "./admin/Sidebar";

function Layout({ children }) {
  const location = useLocation();
  const isLocation = location.pathname.startsWith("/admin");
  return (
    <div>
      {!isLocation && <Navbar />}
      {isLocation && <Sidebar />}
      <main>{children}</main>
    </div>
  );
}

export default Layout;

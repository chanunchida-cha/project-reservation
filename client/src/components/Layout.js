import React from "react";
import HomeAdmin from "./admin/HomeAdmin";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import Sidebar from "./admin/Sidebar";
import SidebarPartner from "./partner/SidebarPartner";

function Layout({ children }) {
  const location = useLocation();
  const isLocationAdmin = location.pathname.startsWith("/admin");
  const isLocationPartner = location.pathname.startsWith("/partner");
  const isLocationLoginAdmin = location.pathname;
  console.log(isLocationLoginAdmin);
  return (
    <div className="wrapper">
      {isLocationAdmin ? (
        <Sidebar />
      ) : isLocationPartner ? (
        <SidebarPartner />
      ) : isLocationLoginAdmin === "/loginadmin" ? null : (
        <Navbar />
      )}
      <main>{children}</main>
    </div>
  );
}

export default Layout;

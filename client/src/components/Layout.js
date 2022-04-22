import React from "react";
import HomeAdmin from "./admin/HomeAdmin";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import Sidebar from "./admin/Sidebar";
import SidebarPartner from "./partner/SidebarPartner";

function Layout({ children }) {
  const location = useLocation();
  const isLocation = location.pathname.startsWith("/admin");
  const isLocationPartner = location.pathname.startsWith("/partner");
  return (
    <div className="wrapper">
      {isLocation ? (
        <Sidebar />
      ) : isLocationPartner ? (
        <SidebarPartner />
      ) : (
        <Navbar />
      )}
      <main>{children}</main>
    </div>
  );
}

export default Layout;

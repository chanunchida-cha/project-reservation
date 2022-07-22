import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import {
  HomeOutlined ,
  TeamOutlined,
  UserOutlined,
  NotificationOutlined,
  CodepenOutlined,
  BarChartOutlined,
  KeyOutlined,
} from "@ant-design/icons";

import ContentAdmin from "./ContentAdmin";
import { adminStore } from "../Store/adminStore";
const Sidebar = observer(() => {
  const token = sessionStorage.getItem("token");
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const admin = adminStore.adminlogin;
  const admin_id = adminStore.adminlogin._id
  const { SubMenu } = Menu;
  const { Content, Sider, Header } = Layout;
  const onCollapsed = () => {
    setCollapsed(!collapsed);
  };

  if (!token) {
    history.push("/loginadmin");
  }

  return (
    <Layout style={{ minHeight: "100vh", fontFamily: "Prompt" }}>
      <Sider
        style={{ backgroundColor: "#fff" }}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapsed}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item
          className="mt-4"
            key="1"
            icon={
              <CodepenOutlined style={{ fontSize: "30px", color: "#f5222d" }} />
            }
            style={{ fontSize: "20px" }}
          >
            <Link to={`/admin/dashboard/${admin_id}`}>cubeQue</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<HomeOutlined />}>
              <Link to={`/admin/dashboard/${admin_id}`}>
                Dashboard
              </Link>
            </Menu.Item>
          <SubMenu key="sub1" icon={<TeamOutlined />} title="ร้านอาหาร">
            <Menu.Item key="3">
              <Link to="/admin/partnerverify">รอตรวจสอบ</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/admin/partnerapprove">อนุมัติ</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/admin/partnerdisapprove">ไม่อนุมัติ</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item icon={<UserOutlined />} key="6">
            <Link to={"/admin/customersdata"}>ข้อมูลลูกค้า</Link>
          </Menu.Item>

          <Menu.Item icon={<NotificationOutlined />} key="7">
            <Link to={"/admin/adminsdata"}>ข้อมูลผู้ดูแลระบบ</Link>
          </Menu.Item>
          <Menu.Item icon={<BarChartOutlined />} key="8">
            รายงาน
          </Menu.Item>
          <Menu.Item icon={<KeyOutlined />} key="9">
            <Link to={"/admin/edit/password"}> เปลี่ยนรหัสผ่าน</Link>
          </Menu.Item>
          <Menu.Item
            key="10"
            onClick={() => {
              adminStore.logout();
              history.push("/loginadmin");
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            backgroundColor: "#f9fafb",
          }}
        >
          <h3 className="flex text-base p-3 mr-16 justify-end">
            คุณ{admin.firstname} {admin.lastname}
          </h3>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <ContentAdmin />
        </Content>
      </Layout>
    </Layout>
  );
});

export default Sidebar;

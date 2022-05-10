import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import {
  TeamOutlined,
  UserOutlined,
  NotificationOutlined,
  CodepenOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

import ContentAdmin from "./ContentAdmin";
import { adminStore } from "./adminStore";
import LoginAdmin from "./LoginAdmin";
const Sidebar=observer(()=> {
  const token = sessionStorage.getItem("token");
  console.log(token);
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  // const isPartnerVerify = useRouteMatch("/admin/partnerverify");
  const admin = adminStore.adminlogin;
  console.log(admin);
  const { SubMenu } = Menu;
  const { Content, Sider, Header } = Layout;
  const onCollapsed = () => {
    setCollapsed(!collapsed);
  };

  if (!token) {
    return <LoginAdmin />;
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
            key="1"
            icon={
              <CodepenOutlined style={{ fontSize: "30px", color: "#f5222d" }} />
            }
            style={{ fontSize: "20px" }}
          >
            <Link to="/admin">cubeQue</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<TeamOutlined />} title="ร้านอาหาร">
            <Menu.Item key="2">
              <Link to="/admin/partnerverify">รอตรวจสอบ</Link>
            </Menu.Item>
            <Menu.Item key="11">
              <Link to="/admin/partnerapprove">อนุมัติ</Link>
            </Menu.Item>
            <Menu.Item key="12">
              <Link to="/admin/partnerdisapprove">ไม่อนุมัติ</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item icon={<UserOutlined />} key="3">
            <Link to={"/admin/customersdata"}>ข้อมูลลูกค้า</Link>
          </Menu.Item>

          <Menu.Item icon={<NotificationOutlined />} key="7">
            <Link to={"/admin/adminsdata"}>ข้อมูลผู้ดูแลระบบ</Link>
          </Menu.Item>
          <Menu.Item icon={<BarChartOutlined />} key="14">
            รายงาน
          </Menu.Item>
          <Menu.Item
            key="15"
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
            backgroundColor: "#fff",
          }}
        >
          <h3 className="flex text-base p-3 mr-16 justify-end">คุณ{admin.firstname}  {admin.lastname}</h3>
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
})

export default Sidebar;

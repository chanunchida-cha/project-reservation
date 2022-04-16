import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Layout, Menu, Breadcrumb } from "antd";
import { Link, Prompt, useLocation } from "react-router-dom";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  CodepenOutlined,
} from "@ant-design/icons";
import HomeAdmin from "./HomeAdmin";
import AllPartner from "./AllPartner";
function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const isAllPartner = location.pathname === "/admin/allpartner";
  const { SubMenu } = Menu;
  const { Header, Content, Footer, Sider } = Layout;
  const onCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout style={{ minHeight: "100vh", fontFamily: "Prompt" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapsed}
        width={200}
        className="site-layout-background"
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
          <SubMenu key="sub1" icon={<UserOutlined />} title="ร้านอาหาร">
            <Menu.Item key="2">
              <Link to="/admin/allpartner">การอนุมัติร้านค้า</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
            <Menu.Item key="3">option5</Menu.Item>
            <Menu.Item key="4">option6</Menu.Item>
            <Menu.Item key="5">option7</Menu.Item>
            <Menu.Item key="6">option8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
            <Menu.Item key="7">option9</Menu.Item>
            <Menu.Item key="8">option10</Menu.Item>
            <Menu.Item key="9">option11</Menu.Item>
            <Menu.Item key="10">option12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {isAllPartner ? <AllPartner /> : <HomeAdmin />}
        </Content>
      </Layout>
    </Layout>
  );
}

export default Sidebar;

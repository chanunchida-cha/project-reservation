import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  TeamOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  CodepenOutlined,
} from "@ant-design/icons";

import ContentAdmin from "./ContentAdmin";
function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  // const isPartnerVerify = useRouteMatch("/admin/partnerverify");
  const { SubMenu } = Menu;
  const { Content, Sider } = Layout;
  const onCollapsed = () => {
    setCollapsed(!collapsed);
  };

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
          </SubMenu>
          <SubMenu key="sub2" icon={<UserOutlined />} title="ลูกค้า">
            <Menu.Item key="3">option5</Menu.Item>
            <Menu.Item key="4">option6</Menu.Item>
            <Menu.Item key="5">option7</Menu.Item>
            <Menu.Item key="6">option8</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            icon={<NotificationOutlined />}
            title="ผู้ดูแลระบบ"
          >
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
          <ContentAdmin />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Sidebar;

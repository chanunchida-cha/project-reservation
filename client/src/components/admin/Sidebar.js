import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  TeamOutlined,
  UserOutlined,
  NotificationOutlined,
  CodepenOutlined,
  BarChartOutlined,
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

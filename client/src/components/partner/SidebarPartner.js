import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
import { partnerStore } from "./partnerStore";
import { observer } from "mobx-react-lite";

import {
  UserOutlined,
  NotificationOutlined,
  CodepenOutlined,
  FormOutlined,
  ContainerOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import ContentPartner from "./ContentPartner";
import ElementStatus from "./ElementStatus";

const SidebarPartner = observer(() => {
  const token = sessionStorage.getItem("token");
  const partner_id = partnerStore.partnerlogin._id;
  const partner = partnerStore.partnerlogin;
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const status = partnerStore.partnerlogin.status;
  const { SubMenu } = Menu;
  const { Content, Sider, Header } = Layout;
  const onCollapsed = () => {
    setCollapsed(!collapsed);
  };

  if (!token) {
    history.push("/loginpartner");
  }

  return (
    <>
      {(status === "disapprove" || status === "verification") && (
        <div>
          <ElementStatus />
        </div>
      )}
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
                <CodepenOutlined
                  style={{ fontSize: "30px", color: "#f5222d" }}
                />
              }
              style={{ fontSize: "20px" }}
            >
              <Link to="/partner">cubeQue</Link>
            </Menu.Item>

            <Menu.Item key="2" icon={<FormOutlined />}>
              <Link to={`/partner/information/${partner_id}`}>
                จัดการข้อมูลทั่วไป
              </Link>
            </Menu.Item>

            <Menu.Item key="3" icon={<ContainerOutlined />}>
              <Link to={`/partner/menu/${partner_id}`}>เมนูอาหาร</Link>
            </Menu.Item>

            <Menu.Item key="4" icon={<ScheduleOutlined />}>
              <Link to={`/partner/table/${partner_id}`}>จัดการโต๊ะอาหาร</Link>
            </Menu.Item>

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

            <Menu.Item
              key="13"
              onClick={() => {
                partnerStore.logout();
                history.push("/");
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
            {partnerStore.partnerlogin && (
              <h3 className="flex text-base p-3 mr-16 justify-end">
                ร้าน{partner.restaurantName}
              </h3>
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <ContentPartner />
          </Content>
        </Layout>
      </Layout>
    </>
  );
});
export default SidebarPartner;

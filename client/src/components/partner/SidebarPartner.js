import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";
import { partnerStore } from "../Store/partnerStore";
import { observer } from "mobx-react-lite";

import {
  LogoutOutlined,
  HomeOutlined,
  CodepenOutlined,
  FormOutlined,
  ContainerOutlined,
  ScheduleOutlined,
  KeyOutlined,
  BarsOutlined,
  BarChartOutlined,
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
          className="sider"
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapsed}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={useLocation().pathname}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item
              className="mt-4"
              key="1"
              icon={
                <CodepenOutlined
                  style={{ fontSize: "30px", color: "#f5222d" }}
                />
              }
              style={{ fontSize: "20px" }}
            >
              cubeQue
            </Menu.Item>
            <Menu.Item
              key={`/partner/dashboard/${partner_id}`}
              icon={<HomeOutlined />}
            >
              <Link to={`/partner/dashboard/${partner_id}`}>Dashboard</Link>
            </Menu.Item>
            <Menu.Item
              key={`/partner/information/${partner_id}`}
              icon={<FormOutlined />}
            >
              <Link to={`/partner/information/${partner_id}`}>
                จัดการข้อมูลทั่วไป
              </Link>
            </Menu.Item>

            <Menu.Item
              key={`/partner/menu/${partner_id}`}
              icon={<ContainerOutlined />}
            >
              <Link to={`/partner/menu/${partner_id}`}>เมนูอาหาร</Link>
            </Menu.Item>

            <Menu.Item
              key={`/partner/table/${partner_id}`}
              icon={<ScheduleOutlined />}
            >
              <Link to={`/partner/table/${partner_id}`}>จัดการโต๊ะอาหาร</Link>
            </Menu.Item>

            <SubMenu key="sub3" icon={<BarsOutlined />} title="จัดการคิวการจอง">
              <Menu.Item key={`/partner/reservationdata/${partner_id}`}>
                {" "}
                <Link to={`/partner/reservationdata/${partner_id}`}>
                  ข้อมูลคิวการจอง
                </Link>
              </Menu.Item>
              <Menu.Item key={`/partner/createreservation/${partner_id}`}>
                {" "}
                <Link to={`/partner/createreservation/${partner_id}`}>
                  เพิ่มคิวการจอง
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item icon={<KeyOutlined />} key={"/partner/edit/password"}>
              <Link to={"/partner/edit/password"}> เปลี่ยนรหัสผ่าน</Link>
            </Menu.Item>
            <Menu.Item
              icon={<BarChartOutlined />}
              key={`/partner/report/${partner_id} `}
            >
              <Link to={`/partner/report/${partner_id} `}> รายงาน</Link>
            </Menu.Item>
            <Menu.Item
              key="13"
              onClick={() => {
                partnerStore.logout();
                history.push("/");
              }}
              icon={<LogoutOutlined />}
            >
              ออกจากระบบ
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

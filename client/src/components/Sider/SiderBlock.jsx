import React from "react";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import "./Sider.scss";

const { Sider } = Layout;

const SiderBlock = ({ items }) => {
    return (
        <Sider
            style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
            }}>
            <Menu theme="dark" mode="inline" className="sider-list">
                {items.map((el, i) =>
                    el.isFunc ? (
                        <Menu.Item className="sider-logout" key={i} onClick={el.func}>
                            <NavLink to="/">{el.name}</NavLink>
                        </Menu.Item>
                    ) : (
                        <Menu.Item key={i}>
                            <NavLink to={el.to}>{el.name}</NavLink>
                        </Menu.Item>
                    )
                )}
            </Menu>
        </Sider>
    );
};

SiderBlock.whyDidYouRender = true;
export default React.memo(SiderBlock);

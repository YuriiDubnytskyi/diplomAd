import React, { useCallback } from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";
import SiderBlock from "../components/Sider/SiderBlock";
import { logout } from "./../store/actions/actionsUser";
import { useDispatch } from "react-redux";
const { Content } = Layout;

const AnaliticPage = () => {
    const dispatch = useDispatch();
    const items = [
        {
            to: "/users",
            name: "Користувачі",
            isFunc: false,
        },
        {
            to: "/storage",
            name: "Склад",
            isFunc: false,
        },
        {
            to: "/products",
            name: "Продукція",
            isFunc: false,
        },
        {
            name: "Вийти",
            isFunc: true,
            func: useCallback(() => dispatch(logout())),
        },
    ];

    return (
        <>
            <SiderBlock items={items} />
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Content>
                    <Route path="/users"></Route>
                    <Route path="/storage"></Route>
                    <Route path="/products"></Route>
                    <Route path="/"></Route>
                </Content>
            </Layout>
        </>
    );
};

AnaliticPage.whyDidYouRender = true;
export default React.memo(AnaliticPage);

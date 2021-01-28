import React, { useCallback } from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";
import SiderBlock from "../components/Sider/SiderBlock";
import { logout } from "./../store/actions/actionsUser";
import { useDispatch } from "react-redux";
const { Content } = Layout;

const SellingPage = () => {
    const dispatch = useDispatch();
    const items = [
        {
            to: "/selling",
            name: "Покупки",
            isFunc: false,
        },
        {
            to: "/archives",
            name: "Архів",
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
                    <Route path="/selling"></Route>
                    <Route path="/archives"></Route>
                    <Route path="/"></Route>
                </Content>
            </Layout>
        </>
    );
};

SellingPage.whyDidYouRender = true;
export default React.memo(SellingPage);

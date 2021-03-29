import React, { useCallback, useEffect } from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";
import SiderBlock from "../components/Sider/SiderBlock";
import { logout } from "./../store/actions/actionsUser";
import { clearAnalitic, initAnaliticData } from "./../store/actions/actionAnalitic";
import { useDispatch } from "react-redux";
import Users from "../container/Users/Users";
import ProductStatus from "../container/ProductStatus/ProductStatus";
import Storage from "../container/Storage/Storage";
import BoughtProducts from "../container/BoughtProducts/BoughtProducts";
import BoughtTop from "../container/BoughtTop/BoughtTop";

const { Content } = Layout;

const AnaliticPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initAnaliticData());
    }, []);
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
            to: "/statusproduct",
            name: "Статус покупок",
            isFunc: false,
        },
        {
            to: "/bought",
            name: "Здійсненні покупки",
            isFunc: false,
        },
        {
            to: "/boughtTop",
            name: "Топ продукти",
            isFunc: false,
        },
        {
            name: "Вийти",
            isFunc: true,
            func: useCallback(() => {
                dispatch(logout());
                dispatch(clearAnalitic());
            }),
        },
    ];

    return (
        <>
            <SiderBlock items={items} />
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Content>
                    <Route path="/users">
                        <Users />
                    </Route>
                    <Route path="/storage">
                        <Storage />
                    </Route>
                    <Route path="/statusproduct">
                        <ProductStatus />
                    </Route>
                    <Route path="/bought">
                        <BoughtProducts />
                    </Route>
                    <Route path="/boughtTop">
                        <BoughtTop />
                    </Route>
                    <Route path="/"></Route>
                </Content>
            </Layout>
        </>
    );
};

AnaliticPage.whyDidYouRender = true;
export default React.memo(AnaliticPage);

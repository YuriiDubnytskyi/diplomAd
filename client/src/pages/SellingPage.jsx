import React, { useCallback, useEffect } from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";
import SiderBlock from "../components/Sider/SiderBlock";
import { logout } from "./../store/actions/actionsUser";
import { useDispatch } from "react-redux";
import { clearSellingManager, initSellingData } from "./../store/actions/actionSelling";
import SellingProducts from "./../container/SellingProducts/SellingProducts";
import ArchiveProducts from "./../container/ArchiveProducts/ArchiveProducts";

const { Content } = Layout;

const SellingPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initSellingData());
    }, []);

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
            func: useCallback(() => {
                dispatch(logout());
                dispatch(clearSellingManager());
            }),
        },
    ];

    return (
        <>
            <SiderBlock items={items} />
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Content>
                    <Route path="/selling">
                        <SellingProducts />
                    </Route>
                    <Route path="/archives">
                        <ArchiveProducts />
                    </Route>
                    <Route path="/"></Route>
                </Content>
            </Layout>
        </>
    );
};

SellingPage.whyDidYouRender = true;
export default React.memo(SellingPage);

import React, { useCallback, useEffect } from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";
import SiderBlock from "../components/Sider/SiderBlock";
import { logout } from "./../store/actions/actionsUser";
import { useDispatch } from "react-redux";
import { initStorageWorkerData, clearNewsManager } from "./../store/actions/actionStorageW";
import AgreeAplications from "./../container/AgreeAplications/AgreeAplications";
import StorageCount from "./../container/StorageCount/StorageCount";

const { Content } = Layout;

const SellingPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initStorageWorkerData());
    }, []);

    const items = [
        {
            to: "/applications",
            name: "Заявики",
            isFunc: false,
        },
        {
            to: "/storage",
            name: "Склад",
            isFunc: false,
        },
        {
            name: "Вийти",
            isFunc: true,
            func: useCallback(() => {
                dispatch(logout());
                dispatch(clearNewsManager());
            }),
        },
    ];

    return (
        <>
            <SiderBlock items={items} />
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Content>
                    <Route path="/applications">
                        <AgreeAplications />
                    </Route>
                    <Route path="/storage">
                        <StorageCount />
                    </Route>
                    <Route path="/"></Route>
                </Content>
            </Layout>
        </>
    );
};

SellingPage.whyDidYouRender = true;
export default React.memo(SellingPage);

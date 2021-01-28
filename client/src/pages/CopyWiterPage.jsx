import React, { useCallback } from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";
import SiderBlock from "../components/Sider/SiderBlock";
import { logout } from "./../store/actions/actionsUser";
import { useDispatch } from "react-redux";
const { Content } = Layout;

const CopyWriterPage = () => {
    const dispatch = useDispatch();
    const items = [
        {
            to: "/news",
            name: "Новини",
            isFunc: false,
        },
        {
            to: "/addnews",
            name: "Додати новину",
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
                    <Route path="/news"></Route>
                    <Route path="/addnews"></Route>
                    <Route path="/"></Route>
                </Content>
            </Layout>
        </>
    );
};

CopyWriterPage.whyDidYouRender = true;
export default React.memo(CopyWriterPage);

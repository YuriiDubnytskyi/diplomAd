import React, { useCallback, useEffect } from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";
import SiderBlock from "../components/Sider/SiderBlock";
import { logout } from "./../store/actions/actionsUser";
import { clearNewsManager } from "./../store/actions/actionNews";
import { useDispatch } from "react-redux";
import AddNews from "../container/AddNews/AddNews";
import News from "../container/News/News";
import NewsById from "../container/NewsById/NewsById";
import { initNewsData } from "./../store/actions/actionNews";

const { Content } = Layout;

const CopyWriterPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initNewsData());
    }, []);
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
                    <Route path="/news">
                        <News />
                    </Route>
                    <Route path="/newsID/:id">
                        <NewsById />
                    </Route>
                    <Route path="/addnews">
                        <AddNews />
                    </Route>
                    <Route path="/"></Route>
                </Content>
            </Layout>
        </>
    );
};

CopyWriterPage.whyDidYouRender = true;
export default React.memo(CopyWriterPage);

import React, { useCallback, useEffect } from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";
import SiderBlock from "../components/Sider/SiderBlock";
import { logout } from "./../store/actions/actionsUser";
import { useDispatch } from "react-redux";
import { clearManager, initManagerData } from "./../store/actions/actionManager";
import Categories from "../container/Categories/Categories";
import AddCategories from "../container/AddCategories/AddCategories";

const { Content } = Layout;

const ManagerPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initManagerData());
    }, []);
    const items = [
        {
            to: "/categories",
            name: "Категорії",
            isFunc: false,
        },
        {
            to: "/addcategories",
            name: "Додати категорію",
            isFunc: false,
        },
        {
            to: "/subcategorie",
            name: "Під категорії",
            isFunc: false,
        },
        {
            to: "/addsubcategorie",
            name: "Додати під категорії",
            isFunc: false,
        },
        {
            to: "/products",
            name: "Продукти",
            isFunc: false,
        },
        {
            to: "/addproduct",
            name: "Додати продукт",
            isFunc: false,
        },
        {
            to: "/buyproduct",
            name: "Замовити продукти",
            isFunc: false,
        },
        {
            name: "Вийти",
            isFunc: true,
            func: useCallback(() => {
                dispatch(logout());
                dispatch(clearManager());
            }),
        },
    ];

    return (
        <>
            <SiderBlock items={items} />
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Content>
                    <Route path="/categories">
                        <Categories />
                    </Route>
                    <Route path="/addcategories">
                        <AddCategories />
                    </Route>
                    <Route path="/subcategorie"></Route>
                    <Route path="/addsubcategorie"></Route>
                    <Route path="/products"></Route>
                    <Route path="/addproducts"></Route>
                    <Route path="/buyproduct"></Route>
                    <Route path="/infoproduct/:id"></Route>
                    <Route path="/changeproduct/:id"></Route>
                    <Route path="/"></Route>
                </Content>
            </Layout>
        </>
    );
};

ManagerPage.whyDidYouRender = true;
export default React.memo(ManagerPage);

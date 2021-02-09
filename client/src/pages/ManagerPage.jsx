import React, { useCallback, useEffect } from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";
import SiderBlock from "../components/Sider/SiderBlock";
import { logout } from "./../store/actions/actionsUser";
import { useDispatch } from "react-redux";
import { clearManager, initManagerData } from "./../store/actions/actionManager";
import Categories from "../container/Categories/Categories";
import AddCategories from "../container/AddCategories/AddCategories";
import SubCategories from "../container/SubCategories/SubCategories";
import AddSubCategories from "../container/AddSubCategories/AddSubCategories";
import Products from "../container/Products/Products";
import AddProduct from "../container/AddProduct/AddProduct";
import ProductItem from "../container/ProductItem/ProductItem";
import BuyProduct from "../container/BuyProduct/BuyProduct";
import ChangeProduct from "../container/ChangeProduct/ChangeProduct";

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
                    <Route path="/subcategorie">
                        <SubCategories />
                    </Route>
                    <Route path="/addsubcategorie">
                        <AddSubCategories />
                    </Route>
                    <Route path="/products">
                        <Products />
                    </Route>
                    <Route path="/addproduct">
                        <AddProduct />
                    </Route>
                    <Route path="/buyproduct">
                        <BuyProduct />
                    </Route>
                    <Route path="/infoproduct/:id">
                        <ProductItem />
                    </Route>
                    <Route path="/changeproduct/:id">
                        <ChangeProduct />
                    </Route>
                    <Route path="/"></Route>
                </Content>
            </Layout>
        </>
    );
};

ManagerPage.whyDidYouRender = true;
export default React.memo(ManagerPage);

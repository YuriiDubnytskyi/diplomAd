import React, { useCallback, useEffect } from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";
import SiderBlock from "../components/Sider/SiderBlock";
import { logout } from "./../store/actions/actionsUser";
import { initAdminData, removeAdmin } from "./../store/actions/actionAdmin";
import { useDispatch, useSelector } from "react-redux";
import AdminRoles from "./../container/AdminRoles/AdminRoles";
import AddRole from "./../container/AddRole/AddRole";

const { Content } = Layout;

const AdminPage = () => {
    const dispatch = useDispatch();
    const admin = useSelector((state) => state.admin);
    useEffect(() => {
        dispatch(initAdminData());
    }, []);
    const items = [
        {
            to: "/roles",
            name: "Ролі",
            isFunc: false,
        },
        {
            to: "/users",
            name: "Користувачі",
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
            func: useCallback(() => {
                dispatch(logout());
                dispatch(removeAdmin());
            }),
        },
    ];

    return (
        <>
            <SiderBlock items={items} />
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Content>
                    <Route path="/roles">
                        <AdminRoles roles={admin.roles} />
                        <AddRole />
                    </Route>
                    <Route path="/users"></Route>
                    <Route path="/user/:id"></Route>
                    <Route path="/products"></Route>
                    <Route path="/"></Route>
                </Content>
            </Layout>
        </>
    );
};

AdminPage.whyDidYouRender = true;
export default React.memo(AdminPage);

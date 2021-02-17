import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Switch } from "react-router-dom";
const LoginPage = React.lazy(() => import("./LoginPage"));
const AdminPage = React.lazy(() => import("./AdminPage"));
const ManagerPage = React.lazy(() => import("./ManagerPage"));
const AnaliticPage = React.lazy(() => import("./AnaliticPage"));
const SellingPage = React.lazy(() => import("./SellingPage"));
const CopyWritePage = React.lazy(() => import("./CopyWiterPage"));

const Main = () => {
    const role = useSelector((state) => state.user.role);

    return (
        <Switch>
            {role === "" ? (
                <Suspense fallback={<>Loading...</>}>
                    <LoginPage />
                </Suspense>
            ) : null}
            {role === "admin" ? (
                <Suspense fallback={<>Loading...</>}>
                    <AdminPage />
                </Suspense>
            ) : null}
            {role === "manager" ? (
                <Suspense fallback={<>Loading...</>}>
                    <ManagerPage />
                </Suspense>
            ) : null}
            {role === "admin" ? (
                <Suspense fallback={<>Loading...</>}>
                    <AnaliticPage />
                </Suspense>
            ) : null}
            {role === "sellingman" ? (
                <Suspense fallback={<>Loading...</>}>
                    <SellingPage />
                </Suspense>
            ) : null}
            {role === "admin" ? (
                <Suspense fallback={<>Loading...</>}>
                    <CopyWritePage />
                </Suspense>
            ) : null}
        </Switch>
    );
};

Main.whyDidYouRender = true;
export default React.memo(Main);

import React from "react";
import { Route } from "react-router-dom";
import Login from "./../container/Login/Login";

const LoginPage = () => {
    return (
        <>
            <Route path="/">
                <Login />
            </Route>
        </>
    );
};

LoginPage.whyDidYouRender = true;
export default React.memo(LoginPage);

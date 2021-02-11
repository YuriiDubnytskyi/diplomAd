import React, { useEffect } from "react";
import "antd/dist/antd.css";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import API from "./API/API";
import { addUserSuccess } from "./store/actions/actionsUser";
import { useDispatch } from "react-redux";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // API.get("/user/isAuth").then((res) => {
        //     if (res.data.status == 200) {
        //         dispatch(addUserSuccess(res.data.user));
        //     }
        // });
        console.log(process.env.REACT_APP_SERVER_API);
    }, []);

    return (
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    );
};

export default App;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Users.scss";
import UsersChart from "./../../components/UsersChart/UsersChart";

const Users = () => {
    const dataUser = useSelector((state) => state.analitic.users);

    return (
        <div className="user__chart">
            <div className="user__chart-info__box info__box">
                <h2 className="info__box-title">Інформація</h2>
                <p className="info__box-text">
                    Користувачі поділяються на дві категорії: ті які підтвердили свою електронну адресу що дозволяє їм
                    здійснювати фінансові операції і на тих які не підтвердили пошту.
                </p>
            </div>
            <div className="user__chart-analitic">
                {dataUser.length !== 0 ? <UsersChart dataUser={dataUser} /> : null}
            </div>
        </div>
    );
};

Users.whyDidYouRender = true;
export default React.memo(Users);

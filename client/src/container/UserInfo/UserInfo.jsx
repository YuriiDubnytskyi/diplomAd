import React, { useEffect } from "react";
import "./UserInfo.scss";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserInfoForm from "./../../components/UserInfoForm/UserInfoForm";
import ShoppingCart from "./../../components/ShoppingCart/ShoppingCart";

const UserInfo = () => {
    const { id } = useParams();
    useEffect(() => {
        console.log("here");
    }, []);
    const data = useSelector((state) => state.admin.users.find((el) => el._id === id));
    return (
        <div className="user__container">
            <div className="user__info">
                <UserInfoForm
                    name={data.name}
                    surname={data.surname || "none"}
                    email={data.email}
                    emailVerify={data.emailVerify}
                    age={data.age || "none"}
                    phone={data.phone || "none"}
                    gender={data.gender || "none"}
                />
            </div>
            <div className="user__shopping">
                {data.buyProduct
                    ? data.buyProduct.map((el) => (
                          <ShoppingCart time={el.time} status={el.status} products={el.product} />
                      ))
                    : null}
            </div>
        </div>
    );
};

UserInfo.whyDidYouRender = true;
export default UserInfo;

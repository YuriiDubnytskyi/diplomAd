import React from "react";
import "./UserItem.scss";
import ButtonItem from "./../../components/ButtonItem/ButtonItem";

const UserItem = ({ info, name, email, emailVerify }) => {
    return (
        <div className="item__container">
            <h2 className="item-title">{`${name}-${email}-${emailVerify}`}</h2>
            <ButtonItem type="info" onClick={info} />
        </div>
    );
};

UserItem.whyDidYouRender = true;
export default UserItem;

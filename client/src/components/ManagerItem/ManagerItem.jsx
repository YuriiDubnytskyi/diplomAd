import React from "react";
import "./ManagerItem.scss";
import ButtonItem from "./../../components/ButtonItem/ButtonItem";

const ManagerItem = ({ loading = false, title, product = false, del = null, change = null, info = null }) => {
    return (
        <div className="item__container">
            <h2 className="item-title">{title}</h2>
            {product ? (
                <div className="btn-group">
                    <ButtonItem type="info" onClick={info} />
                    <ButtonItem type="change" onClick={change} />
                    <ButtonItem type="delete" onClick={del} loading={loading} />
                </div>
            ) : (
                <ButtonItem type="delete" onClick={del} loading={loading} />
            )}
        </div>
    );
};

ManagerItem.whyDidYouRender = true;
export default ManagerItem;

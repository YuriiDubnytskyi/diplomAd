import React from "react";
import "./ButtonItem.scss";

const ButttonItem = ({ type, onClick, loading = false }) => {
    return (
        <button className={`btn-${type}`} onClick={onClick} loading={loading}>
            {type}
        </button>
    );
};

ButttonItem.whyDidYouRender = true;
export default ButttonItem;

import React from "react";
import { Link } from "react-router-dom";
import "./AddNewBtn.scss";

const AddNewBtn = ({ link }) => {
    return (
        <div className="add_categories">
            <Link to={link} className="plus">
                +
            </Link>
        </div>
    );
};

AddNewBtn.whyDidYouRender = true;
export default React.memo(AddNewBtn);

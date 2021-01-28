import React from "react";
import { Link } from "react-router-dom";
import "./Categories.scss";

const Categories = () => {
    return (
        <div>
            <div className="add_categories">
                <Link to="addcategories" className="plus">
                    +
                </Link>
            </div>
        </div>
    );
};

Categories.whyDidYouRender = true;
export default React.memo(Categories);

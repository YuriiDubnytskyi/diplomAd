import React from "react";
import "./Categories.scss";
import { useSelector } from "react-redux";
import ManagerItem from "./../../components/ManagerItem/ManagerItem";
import AddNewBtn from "./../../components/AddNewBtn/AddNewBtn";

const Categories = () => {
    const products = useSelector((state) => state.manager.fullProducts);

    const deleteCategories = (id) => {
        console.log("delete" + id);
    };

    return (
        <div>
            <div className="categories__list">
                {products.map((el) => (
                    <ManagerItem
                        key={el._id}
                        loading="false"
                        title={el.productTitle}
                        del={() => deleteCategories(el._id)}
                    />
                ))}
            </div>

            <AddNewBtn link="addcategories" />
        </div>
    );
};

Categories.whyDidYouRender = true;
export default React.memo(Categories);

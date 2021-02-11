import React from "react";
import "./Categories.scss";
import { useSelector, useDispatch } from "react-redux";
import ManagerItem from "./../../components/ManagerItem/ManagerItem";
import AddNewBtn from "./../../components/AddNewBtn/AddNewBtn";
import { deleteProductMain } from "./../../store/actions/actionManager";

const Categories = () => {
    const products = useSelector((state) => state.manager);
    const dispatch = useDispatch();

    const deleteCategories = (id) => {
        const arr = [];
        products.fullProducts.forEach((el) => {
            el.subTitle.forEach((sub) => {
                arr.push(sub._id);
            });
        });
        dispatch(deleteProductMain(id, arr));
    };

    return (
        <div>
            <div className="categories__list">
                {products.fullProducts
                    ? products.fullProducts.map((el) => (
                          <ManagerItem
                              key={el._id}
                              loading={products.deleteMainLoading}
                              title={el.productTitle}
                              del={() => deleteCategories(el._id)}
                          />
                      ))
                    : null}
            </div>

            <AddNewBtn link="addcategories" />
        </div>
    );
};

Categories.whyDidYouRender = true;
export default React.memo(Categories);

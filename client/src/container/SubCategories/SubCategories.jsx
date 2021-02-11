import React from "react";
import "./SubCategories.scss";
import { useSelector, useDispatch } from "react-redux";
import ManagerItem from "./../../components/ManagerItem/ManagerItem";
import AddNewBtn from "./../../components/AddNewBtn/AddNewBtn";
import { deleteProductSubMain } from "./../../store/actions/actionManager";

const SubCategories = () => {
    const products = useSelector((state) => state.manager);
    const dispatch = useDispatch();

    const deleteSubCategories = (id) => {
        dispatch(deleteProductSubMain(id));
    };

    return (
        <div>
            <div className="categories__list">
                {products.fullProducts
                    ? products.fullProducts.map((main) =>
                          main.subTitle
                              ? main.subTitle.map((el) => (
                                    <ManagerItem
                                        key={el._id}
                                        loading={products.deleteSubLoading}
                                        title={`${main.productTitle} - ${el.productSubTitle}`}
                                        del={() => deleteSubCategories(el._id)}
                                    />
                                ))
                              : null
                      )
                    : null}
            </div>

            <AddNewBtn link="addsubcategorie" />
        </div>
    );
};

SubCategories.whyDidYouRender = true;
export default React.memo(SubCategories);

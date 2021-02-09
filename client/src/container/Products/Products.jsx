import React from "react";
import "./Products.scss";
import { useSelector } from "react-redux";
import ManagerItem from "./../../components/ManagerItem/ManagerItem";
import AddNewBtn from "./../../components/AddNewBtn/AddNewBtn";
import { useHistory } from "react-router-dom";
const Products = () => {
    const products = useSelector((state) => state.manager.fullProducts);
    const history = useHistory();
    const deleteProduct = (id) => {
        console.log("delete" + id);
    };
    const changeProduct = (id) => {
        history.push(`/changeproduct/${id}`);
    };
    const infoProduct = (id) => {
        history.push(`/infoproduct/${id}`);
    };

    return (
        <div>
            <div className="categories__list">
                {products.map((main) =>
                    main.subTitle
                        ? main.subTitle.map((subMain) =>
                              subMain.product
                                  ? subMain.product.map((el) => (
                                        <ManagerItem
                                            key={el._id}
                                            loading="false"
                                            product={true}
                                            change={() => changeProduct(el._id)}
                                            info={() => infoProduct(el._id)}
                                            title={`${main.productTitle} - ${subMain.productSubTitle} - ${el.name}`}
                                            del={() => deleteProduct(el._id)}
                                        />
                                    ))
                                  : null
                          )
                        : null
                )}
            </div>

            <AddNewBtn link="addproduct" />
        </div>
    );
};

Products.whyDidYouRender = true;
export default React.memo(Products);

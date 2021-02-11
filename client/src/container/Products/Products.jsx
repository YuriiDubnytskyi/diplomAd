import React from "react";
import "./Products.scss";
import { useSelector, useDispatch } from "react-redux";
import ManagerItem from "./../../components/ManagerItem/ManagerItem";
import AddNewBtn from "./../../components/AddNewBtn/AddNewBtn";
import { useHistory } from "react-router-dom";
import { deleteProductInfo } from "./../../store/actions/actionManager";

const Products = () => {
    const products = useSelector((state) => state.manager);
    const history = useHistory();
    const dispatch = useDispatch();

    const deleteProduct = (id) => {
        dispatch(deleteProductInfo(id));
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
                {products.fullProducts
                    ? products.fullProducts.map((main) =>
                          main.subTitle
                              ? main.subTitle.map((subMain) =>
                                    subMain.product
                                        ? subMain.product.map((el) => (
                                              <ManagerItem
                                                  key={el._id}
                                                  loading={products.deleteProductLoading}
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
                      )
                    : null}
            </div>

            <AddNewBtn link="addproduct" />
        </div>
    );
};

Products.whyDidYouRender = true;
export default React.memo(Products);

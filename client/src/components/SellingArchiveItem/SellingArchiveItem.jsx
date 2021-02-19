import React from "react";
import "./SellingArchiveItem.scss";
import ButtonItem from "./../../components/ButtonItem/ButtonItem";

const SellingArchiveItem = ({ name, adress, product, status, isOld, change, loading }) => {
    return (
        <>
            <div className="selling__container">
                <p className="selling_item">Name -- {name}</p>
                <p className="selling_item">Address -- {adress}</p>
                <p className="selling_item">Status -- {status}</p>
                {isOld ? null : <ButtonItem type="change" onClick={change} loading={loading} />}
            </div>
            <div className="selling__products-list">
                {product.map((el) => (
                    <div className="product-list__item">
                        <p className="selling_product_item">Name -- {el.name}</p>
                        <p className="selling_product_item">Price -- {el.price}</p>
                        <p className="selling_product_item">Count -- {el.count}</p>
                        <p className="selling_product_item">Info -- {el.shortInfo}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

SellingArchiveItem.whyDidYouRender = true;
export default SellingArchiveItem;

import React, { useState, useEffect } from "react";
import "./ProductItem.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductInfoContent from "../../components/ProductInfoContent/ProductInfoContent";

const ProductItem = () => {
    const { id } = useParams();

    const data = useSelector((state) => state.manager.fullProducts);
    const [product, setProduct] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        data.forEach((main) =>
            main.subTitle.forEach((subMain) =>
                subMain.product.forEach((el) => {
                    if (el._id === id) {
                        setProduct(el.productDetail[0]);
                        setLoading(false);
                    }
                })
            )
        );
    }, []);
    return (
        <div className="product__wrapper product-wrapper">
            {!loading ? <ProductInfoContent data={product} /> : null}
        </div>
    );
};

ProductItem.whyDidYouRender = true;
export default React.memo(ProductItem);

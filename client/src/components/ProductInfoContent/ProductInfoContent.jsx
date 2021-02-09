import React from "react";
import "./ProductInfoContent.scss";
import Imagg from "../../container/ProductGallery/ProductGallery";

const ProductInfoContent = ({ data }) => {
    return (
        <div className="product__container product-container ">
            <div className="product-img">
                <Imagg images={data.images} />
            </div>
            <div className="product-short-info">
                <h2 className="product-short-info-title">{data.name}</h2>
                <p className="product-short-info-description">
                    Description short Description short Description short Description short Description short
                    Description short Description short Description short Description short Description short
                </p>
                <hr className="product-short-info-line" />
                <p className="product-short-info-price">Price -- {data.price}</p>
                <hr className="product-short-info-line" />

                <hr className="product-short-info-line" />
                <p className="product-short-info-producer">Producer -- {data.producer}</p>
            </div>
            <div className="product-info">
                <h3 className="product-info-title">Description</h3>
                <p className="product-info-description">{data.info}</p>
            </div>
            <div className="product-properties">
                <h3 className="product-info-properties">Properties</h3>
                <div className="product-properties__container">
                    {data.properties
                        ? data.properties[0].properties.map((el, i) => {
                              return (
                                  <div className="product-properties-item" key={i}>
                                      <p className="item-property">{el.property}</p>
                                      <p className="item-value">{el.value}</p>
                                  </div>
                              );
                          })
                        : null}
                </div>
            </div>
        </div>
    );
};

ProductInfoContent.whyDidYouRender = true;
export default React.memo(ProductInfoContent);

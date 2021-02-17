import React from "react";
import "./ShoppingCart.scss";

const ShoppingCart = ({ time, status, products }) => {
    return (
        <>
            <ul className="card__list">
                <li>{Date(time)}</li>
                <li>{status}</li>
                <li>Products :</li>
                <ul>
                    {products
                        ? products.map((el) => (
                              <>
                                  <li>{el.name}</li>
                                  <li>{el.price}</li>
                              </>
                          ))
                        : null}
                </ul>
            </ul>
        </>
    );
};

ShoppingCart.whyDidYouRender = true;
export default ShoppingCart;

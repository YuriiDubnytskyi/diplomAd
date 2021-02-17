import React from "react";
import "./SellingProducts.scss";
import { useSelector, useDispatch } from "react-redux";
import { switchProductById } from "./../../store/actions/actionSelling";
import SellingArchiveItem from "./../../components/SellingArchiveItem/SellingArchiveItem";
import ErrorBlock from "./../../components/ErrorBlock/ErrorBlock";

const SellingProducts = () => {
    const data = useSelector((state) => state.selling);
    const dispatch = useDispatch();
    const change = (id, data) => {
        const options = {
            products: data.product,
            name: data.name,
            adress: data.adress,
            email: data.email,
        };
        dispatch(switchProductById(id, options));
    };

    return (
        <>
            <div className="selling__conatiner">
                {data.active
                    ? data.active.map((el) => (
                          <SellingArchiveItem
                              name={el.user[0].name}
                              adress={el.adress}
                              product={el.product}
                              status={el.status}
                              isOld={el.isOld}
                              loading={data.switchStatusLoading}
                              change={() =>
                                  change(el._id, {
                                      product: el.product,
                                      name: el.user[0].name,
                                      adress: el.adress,
                                      email: el.user[0].email,
                                  })
                              }
                          />
                      ))
                    : null}
            </div>
            <ErrorBlock type="selling" mess={data.switchStatusErr} isError={data.switchStatusIsErr} />
        </>
    );
};

SellingProducts.whyDidYouRender = true;
export default SellingProducts;

import React from "react";
import "./BuyProduct.scss";
import BuyCountForm from "./../../components/BuyCountForm/BuyCountForm";
import { useDispatch, useSelector } from "react-redux";
import { addCountProduct, addCountFail } from "./../../store/actions/actionManager";
import ErrorBlock from "./../../components/ErrorBlock/ErrorBlock";

const BuyProduct = () => {
    const products = useSelector((state) => state.manager.fullProducts);
    const data = useSelector((state) => state.manager);
    const dispatch = useDispatch();

    const addCount = (values, count, id) => {
        if (values.count < 0) {
            dispatch(addCountFail("Count is negative"));
        } else {
            dispatch(addCountProduct({ id, count: +count + +values.count }));
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div>
            <div className="categories__list">
                {products.map((main) =>
                    main.subTitle
                        ? main.subTitle.map((subMain) =>
                              subMain.product
                                  ? subMain.product.map((el) => (
                                        <BuyCountForm
                                            key={el._id}
                                            loading="false"
                                            count={el.productStorageHouse[0].count}
                                            id={el.productStorageHouse[0].idStorageHouse}
                                            title={`${main.productTitle} - ${subMain.productSubTitle} - ${el.name}`}
                                            addCount={addCount}
                                            onFinishFailed={onFinishFailed}
                                        />
                                    ))
                                  : null
                          )
                        : null
                )}
            </div>
            <ErrorBlock mess={data.addCountErrMess} isError={data.addCountErr} type="large" />
        </div>
    );
};

BuyProduct.whyDidYouRender = true;
export default React.memo(BuyProduct);

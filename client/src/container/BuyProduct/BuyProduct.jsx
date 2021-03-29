import React from "react";
import "./BuyProduct.scss";
import BuyCountForm from "./../../components/BuyCountForm/BuyCountForm";
import { useDispatch, useSelector } from "react-redux";
import { addCountProduct, addCountFail } from "./../../store/actions/actionManager";
import ErrorBlock from "./../../components/ErrorBlock/ErrorBlock";
import { Table } from "antd";

const BuyProduct = () => {
    const products = useSelector((state) => state.manager.fullProducts);
    const data = useSelector((state) => state.manager);
    const dispatch = useDispatch();

    const addCount = (inputCount, count, id, name) => {
        console.log(id, inputCount.count, name);
        dispatch(addCountProduct({ id, count: inputCount.count, name }));
        alert("Ми надіслали запит");
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const expandedRowRenderProduct = (data) => {
        const columns = [
            { title: "Product Name", dataIndex: "name", key: "name" },
            {
                title: "Count",
                dataIndex: "count",
                key: "count",
                render: (_, record) => <>{record.productStorageHouse[0].count}</>,
            },
            {
                title: "Action",
                key: "action",
                render: (_, record) =>
                    data.length >= 1 ? (
                        <BuyCountForm
                            count={record.productStorageHouse[0].count}
                            id={record.productStorageHouse[0].idStorageHouse}
                            addCount={addCount}
                            onFinishFailed={onFinishFailed}
                            name={record.name}
                        />
                    ) : null,
            },
        ];

        return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    const expandedRowRender = (data) => {
        const columns = [{ title: "SubTitle", dataIndex: "productSubTitle", key: "productSubTitle" }];

        return (
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender: (record) => expandedRowRenderProduct(record.product),
                }}
                dataSource={data.map((el) => {
                    return { ...el, key: el._id };
                })}
                pagination={false}
            />
        );
    };
    const columns = [{ title: "Name", dataIndex: "productTitle", key: "productTitle" }];

    return (
        <div>
            <div className="categories__list">
                {
                    <Table
                        className="components-table-demo-nested"
                        columns={columns}
                        expandable={{
                            expandedRowRender: (record) => expandedRowRender(record.subTitle),
                        }}
                        dataSource={products.map((el) => {
                            return { ...el, key: el._id };
                        })}
                    />
                    /* {products.map((main) =>
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
                )} */
                }
            </div>
            <ErrorBlock mess={data.addCountErrMess} isError={data.addCountErr} type="large" />
        </div>
    );
};

BuyProduct.whyDidYouRender = true;
export default React.memo(BuyProduct);

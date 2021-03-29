import React from "react";
import "./Products.scss";
import { useSelector, useDispatch } from "react-redux";
import ManagerItem from "./../../components/ManagerItem/ManagerItem";
import AddNewBtn from "./../../components/AddNewBtn/AddNewBtn";
import { Link } from "react-router-dom";
import { deleteProductInfo } from "./../../store/actions/actionManager";
import { Table, Popconfirm, Space } from "antd";

const Products = () => {
    const products = useSelector((state) => state.manager);

    const dispatch = useDispatch();

    const deleteProduct = (id) => {
        dispatch(deleteProductInfo(id));
    };

    const expandedRowRenderProduct = (data) => {
        const columns = [
            { title: "Product Name", dataIndex: "name", key: "name" },
            {
                title: "Action",
                key: "action",
                render: (_, record) =>
                    data.length >= 1 ? (
                        <Space size="large">
                            <Link to={`/infoproduct/${record._id}`}>Info</Link>
                            <Link to={`/changeproduct/${record._id}`}>Change</Link>
                            <Popconfirm title="Sure to delete?" onConfirm={() => deleteProduct(record._id)}>
                                <a>Delete</a>
                            </Popconfirm>
                        </Space>
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
                {products.fullProducts ? (
                    <Table
                        className="components-table-demo-nested"
                        columns={columns}
                        expandable={{
                            expandedRowRender: (record) => expandedRowRender(record.subTitle),
                        }}
                        dataSource={products.fullProducts.map((el) => {
                            return { ...el, key: el._id };
                        })}
                    />
                ) : // ? products.fullProducts.map((main) =>
                //       main.subTitle
                //           ? main.subTitle.map((subMain) =>
                //                 subMain.product
                //                     ? subMain.product.map((el) => (
                //                           <ManagerItem
                //                               key={el._id}
                //                               loading={products.deleteProductLoading}
                //                               product={true}
                //                               change={() => changeProduct(el._id)}
                //                               info={() => infoProduct(el._id)}
                //                               title={`${main.productTitle} - ${subMain.productSubTitle} - ${el.name}`}
                //                               del={() => deleteProduct(el._id)}
                //                           />
                //                       ))
                //                     : null
                //             )
                //           : null
                //   )
                null}
            </div>

            <AddNewBtn link="addproduct" />
        </div>
    );
};

Products.whyDidYouRender = true;
export default React.memo(Products);

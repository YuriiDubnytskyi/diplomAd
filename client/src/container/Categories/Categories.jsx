import React from "react";
import "./Categories.scss";
import { Popconfirm, Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import ManagerItem from "./../../components/ManagerItem/ManagerItem";
import AddNewBtn from "./../../components/AddNewBtn/AddNewBtn";
import { deleteProductMain } from "./../../store/actions/actionManager";

const Categories = () => {
    const products = useSelector((state) => state.manager);
    const dispatch = useDispatch();

    const deleteCategories = (id) => {
        const arr = [];
        products.fullProducts.forEach((el) => {
            el.subTitle.forEach((sub) => {
                arr.push(sub._id);
            });
        });
        dispatch(deleteProductMain(id, arr));
    };

    const columns = [
        {
            title: "Title",
            dataIndex: "productTitle",
            key: "_id",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) =>
                products.fullProducts.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => deleteCategories(record._id)}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        },
    ];

    return (
        <div>
            <div className="categories__list">
                {products.fullProducts ? (
                    <Table columns={columns} dataSource={products.fullProducts} />
                ) : // ? products.fullProducts.map((el) => (
                //       <ManagerItem
                //           key={el._id}
                //           loading={products.deleteMainLoading}
                //           title={el.productTitle}
                //           del={() => deleteCategories(el._id)}
                //       />
                //   ))
                null}
            </div>

            <AddNewBtn link="addcategories" />
        </div>
    );
};

Categories.whyDidYouRender = true;
export default React.memo(Categories);

import React from "react";
import "./SubCategories.scss";
import { useSelector, useDispatch } from "react-redux";
import ManagerItem from "./../../components/ManagerItem/ManagerItem";
import AddNewBtn from "./../../components/AddNewBtn/AddNewBtn";
import { deleteProductSubMain } from "./../../store/actions/actionManager";
import { Table, Popconfirm, Menu, Dropdown, Space } from "antd";

const SubCategories = () => {
    const products = useSelector((state) => state.manager);
    const dispatch = useDispatch();

    const deleteSubCategories = (id) => {
        dispatch(deleteProductSubMain(id));
    };

    const expandedRowRender = (data) => {
        const columns = [
            { title: "SubTitle", dataIndex: "productSubTitle", key: "productSubTitle" },
            {
                title: "Action",
                key: "action",
                render: (_, record) =>
                    data.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => deleteSubCategories(record._id)}>
                            <a>Delete</a>
                        </Popconfirm>
                    ) : null,
            },
        ];

        return <Table columns={columns} dataSource={data} pagination={false} />;
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
                //           ? main.subTitle.map((el) => (
                //                 <ManagerItem
                //                     key={el._id}
                //                     loading={products.deleteSubLoading}
                //                     title={`${main.productTitle} - ${el.productSubTitle}`}
                //                     del={() => deleteSubCategories(el._id)}
                //                 />
                //             ))
                //           : null
                //   )
                null}
            </div>

            <AddNewBtn link="addsubcategorie" />
        </div>
    );
};

SubCategories.whyDidYouRender = true;
export default React.memo(SubCategories);

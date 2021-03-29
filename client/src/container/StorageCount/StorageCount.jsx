import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "./../../store/actions/actionStorageW";
import ErrorBlock from "./../../components/ErrorBlock/ErrorBlock";
import { Table, Popconfirm } from "antd";

const AgreeAplications = () => {
    const storage = useSelector((state) => state.storageW);

    const dispatch = useDispatch();

    const deleteProductCount = (id) => {
        dispatch(deleteProduct(id));
    };

    const columns = [
        { title: "Product Name", dataIndex: "name", key: "name" },
        { title: "Count", dataIndex: "count", key: "count" },
        {
            title: "Action",
            key: "action",
            render: (_, record) =>
                storage.storage.length >= 1 && record.list.length === 0 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => deleteProductCount(record._id)}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        },
    ];

    return (
        <div>
            <div className="storage__list">
                {storage.storage ? (
                    <Table
                        className="components-table-demo-nested"
                        columns={columns}
                        dataSource={storage.storage.map((el) => {
                            return { ...el, key: el._id };
                        })}
                    />
                ) : null}
            </div>
            <ErrorBlock mess={storage.delErrMess} isError={storage.delErr} type="large" />
        </div>
    );
};

AgreeAplications.whyDidYouRender = true;
export default React.memo(AgreeAplications);

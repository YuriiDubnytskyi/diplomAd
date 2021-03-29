import React from "react";
import "./ArchiveProducts.scss";
import { useSelector } from "react-redux";
import SellingArchiveItem from "./../../components/SellingArchiveItem/SellingArchiveItem";
import { Table } from "antd";

const ArchiveProducts = () => {
    const data = useSelector((state) => state.selling.archive);

    const columns = [
        { title: "Adress", dataIndex: "adress", key: "adress" },
        {
            title: "Time",
            dataIndex: "time",
            key: "time",
            sorter: (a, b) => new Date(b.time) - new Date(a.time),
            sortDirections: ["descend", "ascend"],
        },
        { title: "Name", dataIndex: "name", key: "name", render: (_, text) => <>{text.user[0].name}</> },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            sorter: (a, b) => a.status.length - b.status.length,
            sortDirections: ["descend", "ascend"],
        },
    ];

    return (
        <>
            <div className="selling__conatiner">
                {data ? (
                    <Table
                        columns={columns}
                        expandable={{
                            expandedRowRender: (record) =>
                                record.product.map((el) => (
                                    <p>
                                        {`Name -- ${el.name}
                                    Price -- ${el.price}
                                    Count -- ${el.count}`}
                                    </p>
                                )),
                        }}
                        dataSource={data.map((el) => {
                            return { ...el, key: el._id };
                        })}
                    />
                ) : // ? data.map((el) => (
                //       <SellingArchiveItem
                //           name={el.user[0].name}
                //           adress={el.adress}
                //           product={el.product}
                //           status={el.status}
                //           isOld={el.isOld}
                //       />
                //   ))
                null}
            </div>
        </>
    );
};

ArchiveProducts.whyDidYouRender = true;
export default ArchiveProducts;

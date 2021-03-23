import React from "react";
import "./SellingProducts.scss";
import { useSelector, useDispatch } from "react-redux";
import { switchProductById } from "./../../store/actions/actionSelling";
import SellingArchiveItem from "./../../components/SellingArchiveItem/SellingArchiveItem";
import ErrorBlock from "./../../components/ErrorBlock/ErrorBlock";
import SwitchSellingForm from "./../../components/SwitchSellingForm/SwitchSellingForm";
import { Table } from "antd";

const SellingProducts = () => {
    const data = useSelector((state) => state.selling);
    const dispatch = useDispatch();
    const change = (values, id, data) => {
        const options = {
            products: data.product,
            name: data.name,
            adress: data.adress,
            email: data.email,
            message: values.message,
        };
        dispatch(switchProductById(id, options));
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

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
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) =>
                data.active.length >= 1 ? (
                    <SwitchSellingForm
                        id={record._id}
                        onFinishFailed={onFinishFailed}
                        switchSelling={change}
                        data={{
                            product: record.product,
                            name: record.user[0].name,
                            adress: record.adress,
                            email: record.user[0].email,
                        }}
                    />
                ) : null,
        },
    ];

    return (
        <>
            <div className="selling__conatiner">
                {data.active ? (
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
                        dataSource={data.active.map((el) => {
                            return { ...el, key: el._id };
                        })}
                    />
                ) : // ? data.active.map((el) => (
                //       <SellingArchiveItem
                //           name={el.user[0].name}
                //           adress={el.adress}
                //           product={el.product}
                //           status={el.status}
                //           isOld={el.isOld}
                //           loading={data.switchStatusLoading}
                //           change={() =>
                //               change(el._id, {
                //                   product: el.product,
                //                   name: el.user[0].name,
                //                   adress: el.adress,
                //                   email: el.user[0].email,
                //               })
                //           }
                //       />
                //   ))
                null}
            </div>
            <ErrorBlock type="selling" mess={data.switchStatusErr} isError={data.switchStatusIsErr} />
        </>
    );
};

SellingProducts.whyDidYouRender = true;
export default SellingProducts;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { aggreApplication } from "./../../store/actions/actionStorageW";
import ErrorBlock from "./../../components/ErrorBlock/ErrorBlock";
import { Table } from "antd";
import AgreeCountForm from "./../../components/AgreeCountForm/AgreeCountForm";

const AgreeAplications = () => {
    const aplications = useSelector((state) => state.storageW);

    const dispatch = useDispatch();

    const aggreApp = (id, idStorageHouse, values) => {
        let a = aplications.storage.filter((el) => el.idStorageHouse === idStorageHouse);

        console.log(id, idStorageHouse, values.message, values.count, a[0].count);
        dispatch(
            aggreApplication({
                id,
                idStorageHouse,
                message: values.message,
                getValue: values.count,
                countExist: a[0].count,
            })
        );
        //alert("Ми надіслали запит");
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const columns = [
        { title: "Product Name", dataIndex: "productName", key: "productName" },
        { title: "Status", dataIndex: "status", key: "status" },
        { title: "Time start", dataIndex: "timeStart", key: "timeStart" },
        { title: "Time end", dataIndex: "timeEnd", key: "timeEnd" },
        { title: "Need Count", dataIndex: "needCount", key: "needCount" },
        { title: "Get Count", dataIndex: "countGet", key: "countGet" },
        { title: "Message", dataIndex: "message", key: "message" },
        {
            title: "Action",
            key: "action",
            render: (_, record) =>
                aplications.aplications.length >= 1 ? (
                    record.status === "Pending" ? (
                        <AgreeCountForm
                            id={record._id}
                            idStorageHouse={record.idProduct}
                            addCount={aggreApp}
                            onFinishFailed={onFinishFailed}
                        />
                    ) : null
                ) : null,
        },
    ];

    return (
        <div>
            <div className="agree__list">
                {aplications.aplications ? (
                    <Table
                        className="components-table-demo-nested"
                        columns={columns}
                        dataSource={aplications.aplications.map((el) => {
                            return { ...el, key: el._id };
                        })}
                    />
                ) : null}
            </div>
            <ErrorBlock mess={aplications.agreeErrMess} isError={aplications.agreeErr} type="large" />
        </div>
    );
};

AgreeAplications.whyDidYouRender = true;
export default React.memo(AgreeAplications);

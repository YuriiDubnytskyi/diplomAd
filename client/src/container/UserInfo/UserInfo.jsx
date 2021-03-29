import React, { useEffect } from "react";
import "./UserInfo.scss";
import { PageHeader, Table, Descriptions } from "antd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserInfoForm from "./../../components/UserInfoForm/UserInfoForm";
import ShoppingCart from "./../../components/ShoppingCart/ShoppingCart";

const UserInfo = () => {
    const { id } = useParams();
    useEffect(() => {
        console.log("here");
    }, []);
    const data = useSelector((state) => state.admin.users.find((el) => el._id === id));

    const columns = [
        {
            title: "Time",
            dataIndex: "time",
            key: "time",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Products",
            key: "product",
            dataIndex: "product",
            render: (product) =>
                product
                    ? product.map((el) => (
                          <>
                              <li>{el.name}</li>
                              <li>{el.price}</li>
                          </>
                      ))
                    : null,
        },
    ];

    return (
        <div className="user__container">
            <PageHeader ghost={false} onBack={() => window.history.back()} title="Назад">
                <Descriptions size="small" column={4}>
                    <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
                    <Descriptions.Item label="Surname">{data.surname || "none"}</Descriptions.Item>
                    <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
                    <Descriptions.Item label="Email Verify">{data.emailVerify ? "True" : "False"}</Descriptions.Item>
                    <Descriptions.Item label="Age">{data.age || "none"}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{data.phone || "none"}</Descriptions.Item>
                    <Descriptions.Item label="Gender">{data.gender || "none"}</Descriptions.Item>
                </Descriptions>
            </PageHeader>

            <div className="user__shopping">
                {data.buyProduct ? <Table columns={columns} dataSource={data.buyProduct} /> : null}
            </div>
        </div>
    );
};

UserInfo.whyDidYouRender = true;
export default UserInfo;

import React from "react";
import "./UsersList.scss";
import { useSelector } from "react-redux";
import { Table } from "antd";
import UserItem from "../../components/UserItem/UserItem";
import { Link } from "react-router-dom";

const UsersList = () => {
    const users = useSelector((state) => state.admin.users);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Is Email Verify",
            dataIndex: "emailVerify",
            key: "emailVerify",
            render: (text) => <>{text ? "True" : "False"}</>,
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => <Link to={`/user/${record._id}`}>More</Link>,
        },
    ];

    return (
        <div>
            <div className="users__list">
                {users ? (
                    <Table columns={columns} dataSource={users} />
                ) : 
                null}
            </div>
        </div>
    );
};

UsersList.whyDidYouRender = true;
export default React.memo(UsersList);

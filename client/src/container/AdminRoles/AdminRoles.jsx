import React, { useCallback } from "react";
import { Table, Popconfirm } from "antd";
import "./AdminRoles.scss";
import { useDispatch } from "react-redux";
import { deleteRole } from "./../../store/actions/actionAdmin";

const AdminRoles = ({ roles }) => {
    const dispatch = useDispatch();
    const deleteRoleByID = (id) => {
        dispatch(deleteRole(id));
    };

    const columns = [
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Login field",
            dataIndex: "login",
            key: "login",
        },
        {
            title: "Password",
            dataIndex: "message",
            key: "message",
            render: (text) => <>{text || "password"}</>,
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) =>
                roles.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => deleteRoleByID(record._id)}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        },
    ];

    return (
        <div className="role__list">
            <Table columns={columns} dataSource={roles} />
        </div>
    );
};

AdminRoles.whyDidYouRender = true;
export default React.memo(AdminRoles);

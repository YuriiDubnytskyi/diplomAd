import React, { useCallback } from "react";
import { List, Card, Button } from "antd";
import "./AdminRoles.scss";
import { useDispatch } from "react-redux";
import { deleteRole } from "./../../store/actions/actionAdmin";

const AdminRoles = ({ roles }) => {
    const dispatch = useDispatch();
    const deleteRoleByID = (id) => {
        dispatch(deleteRole(id));
    };

    return (
        <div className="role__list">
            <List
                grid={{
                    gutter: 12,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                }}
                dataSource={roles}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            className="card__role role"
                            title={item.role}
                            actions={[<Button onClick={() => deleteRoleByID(item._id)}>Delete</Button>]}>
                            <p className="role-login">{item.login}</p>
                            <p className="role-password">{item.message || "password"}</p>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

AdminRoles.whyDidYouRender = true;
export default React.memo(AdminRoles);

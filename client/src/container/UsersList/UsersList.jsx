import React from "react";
import "./UsersList.scss";
import { useSelector } from "react-redux";
import UserItem from "../../components/UserItem/UserItem";
import { useHistory } from "react-router-dom";

const UsersList = () => {
    const users = useSelector((state) => state.admin.users);
    const history = useHistory();
    const info = (id) => {
        history.push("/user/" + id);
    };

    return (
        <div>
            <div className="users__list">
                {users
                    ? users.map((el) => (
                          <UserItem
                              info={() => info(el._id)}
                              name={el.name}
                              email={el.email}
                              emailVerify={el.emailVerify}
                          />
                      ))
                    : null}
            </div>
        </div>
    );
};

UsersList.whyDidYouRender = true;
export default React.memo(UsersList);

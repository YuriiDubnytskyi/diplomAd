import * as actionTypes from "./actionTypes";
import API from "./../../API/API";

export const initAdminData = () => {
    return function (dispatch) {
        return API.get("/admin/init").then((data) => {
            console.log(data);
            if (data.data.roles.err || data.data.products.err || data.data.users.err) {
                dispatch(addInitFail([data.data.roles.errMess, data.data.products.errMess, data.data.users.errMess]));
            } else {
                dispatch(addInitSuccess(data.data.roles.data, data.data.users.data, data.data.products.data));
            }
        });
    };
};

export const addInitFail = (mess) => {
    return {
        type: actionTypes.ADD_INIT_FAIL,
        mess,
    };
};
export const addInitSuccess = (roles, users, products) => {
    return {
        type: actionTypes.ADD_INIT,
        roles,
        users,
        products,
    };
};
export const removeAdmin = () => {
    return {
        type: actionTypes.CLEAR_ADMIN,
    };
};

export const addRole = (role) => {
    return {
        type: actionTypes.ADD_ROLE,
        role,
    };
};

export const deleteRole = (id) => {
    return function (dispatch) {
        return API.delete("/admin/deleteRole/" + id).then((data) => {
            if (data.err) {
                dispatch(deleteRoleFail(data.errMess));
            } else {
                dispatch(deleteRoleSuccess(id));
            }
        });
    };
};

export const deleteRoleFail = (mess) => {
    return {
        type: actionTypes.DELETE_ROLE_FAIL,
        mess,
    };
};

export const deleteRoleSuccess = (id) => {
    return {
        type: actionTypes.DELETE_ROLE_SUCCESS,
        id,
    };
};

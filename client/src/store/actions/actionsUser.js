import * as actionTypes from "./actionTypes";
import API from "./../../API/API";

export const logout = () => {
    return function (dispatch) {
        dispatch(removeUser());
        return API.get("/auth/signout");
    };
};

export const fetchUserLogin = (login, password) => {
    return function (dispatch) {
        dispatch(addUser());
        return API.post("/auth/login", { login, password, username: "q" }).then((user) => {
            if (user.data.err) {
                dispatch(addUserFail(user.data.message));
            } else {
                dispatch(addUserSuccess(user.data.role));
            }
        });
    };
};

export const addUser = () => {
    return {
        type: actionTypes.ADD_USER,
    };
};
export const addUserFail = (mess) => {
    return {
        type: actionTypes.ADD_USER_FAIL,
        mess,
    };
};
export const addUserSuccess = (role) => {
    return {
        type: actionTypes.ADD_USER_SUCCESS,
        role,
    };
};
export const removeUser = () => {
    return {
        type: actionTypes.CLEAR_USER,
    };
};

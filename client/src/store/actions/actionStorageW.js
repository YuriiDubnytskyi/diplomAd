import * as actionTypes from "./actionTypes";
import API from "./../../API/API";

export const initStorageWorkerData = () => {
    return function (dispatch) {
        return API.get("/storageworker/init").then((res) => {
            if (res.data.err) {
                dispatch(addInitFail(res.data.errMess));
            } else {
                dispatch(addInitSuccess(res.data.data));
            }
        });
    };
};

export const addInitFail = (mess) => {
    return {
        type: actionTypes.STORAGE_WORGER_INIT_FAIL,
        mess,
    };
};
export const addInitSuccess = (data) => {
    return {
        type: actionTypes.STORAGE_WORGER_INIT,
        data,
    };
};
export const clearNewsManager = () => {
    return {
        type: actionTypes.STORAGE_WORGER_CLEAR,
    };
};

export const aggreApplication = (dataA) => {
    return function (dispatch) {
        dispatch(aggre());
        return API.put("/storageworker/addCount", dataA).then((res) => {
            console.log(res);
            if (res.data.err) {
                dispatch(aggreFail(res.data.errMess));
            } else {
                dispatch(aggreSuccess(dataA));
            }
        });
    };
};

export const aggreFail = (errMess) => {
    return {
        type: actionTypes.STORAGE_WORGER_AGREE_APPLICATION_FAIL,
        errMess,
    };
};
export const aggreSuccess = (data) => {
    return {
        type: actionTypes.STORAGE_WORGER_AGREE_APPLICATION_SUCCESS,
        data,
    };
};
export const aggre = () => {
    return {
        type: actionTypes.STORAGE_WORGER_AGREE_APPLICATION,
    };
};

export const deleteProduct = (id) => {
    return function (dispatch) {
        dispatch(del());
        return API.delete("/storageworker/delProduct/" + id).then((res) => {
            console.log(res);
            if (res.data.err) {
                dispatch(deleteFail(res.data.errMess));
            } else {
                dispatch(deleteSuccess(id));
            }
        });
    };
};

export const deleteFail = (errMess) => {
    return {
        type: actionTypes.STORAGE_WORGER_DELETE_PRODUCT_FAIL,
        errMess,
    };
};
export const deleteSuccess = (id) => {
    return {
        type: actionTypes.STORAGE_WORGER_DELETE_PRODUCT_SUCCESS,
        id,
    };
};
export const del = () => {
    return {
        type: actionTypes.STORAGE_WORGER_DELETE_PRODUCT,
    };
};

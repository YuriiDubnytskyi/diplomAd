import * as actionTypes from "./actionTypes";
import API from "./../../API/API";

export const initAnaliticData = () => {
    return function (dispatch) {
        return API.get("/analitic/init").then((data) => {
            console.log(data);
            const { storage, users, productsStatus } = data.data;
            if (storage.err || users.err || productsStatus.err) {
                dispatch(addInitFail([storage.errMess, users.errMess, productsStatus.errMess]));
            } else {
                dispatch(addInitSuccess(storage.data, users.data, productsStatus.data));
            }
        });
    };
};

export const addInitFail = (mess) => {
    return {
        type: actionTypes.ANALITIC_INIT_FAIL,
        mess,
    };
};
export const addInitSuccess = (storage, users, productsStatus) => {
    return {
        type: actionTypes.ANALITIC_INIT,
        storage,
        users,
        productsStatus,
    };
};
export const clearAnalitic = () => {
    return {
        type: actionTypes.ANALITIC_CLEAR,
    };
};

export const getFataByDate = (start, end) => {
    return function (dispatch) {
        dispatch(addDataDate());
        return API.get(`/analitic/getByDate/${start}/${end}`).then((data) => {
            console.log(data);
            const { productsBought } = data.data;
            if (productsBought.err) {
                dispatch(addDataDateFail(productsBought.errMess));
            } else {
                dispatch(addDataDateSuccess(productsBought.data));
            }
        });
    };
};

export const addDataDateFail = (mess) => {
    return {
        type: actionTypes.ANALITIC_GET_BY_DATE_FAIL,
        mess,
    };
};
export const addDataDateSuccess = (productsBought) => {
    return {
        type: actionTypes.ANALITIC_GET_BY_DATE_SUCCESS,
        productsBought,
    };
};
export const addDataDate = () => {
    return {
        type: actionTypes.ANALITIC_GET_BY_DATE,
    };
};

import * as actionTypes from "./actionTypes";
import API from "./../../API/API";

export const initSellingData = () => {
    return function (dispatch) {
        return API.get("/sellingmanager/init").then((res) => {
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
        type: actionTypes.SELLING_INIT_FAIL,
        mess,
    };
};
export const addInitSuccess = (data) => {
    return {
        type: actionTypes.SELLING_INIT,
        data,
    };
};
export const clearSellingManager = () => {
    return {
        type: actionTypes.CLEAR_SELLING,
    };
};

export const switchProductById = (id, options) => {
    return function (dispatch) {
        dispatch(switchProduct());
        return API.post("/sellingmanager/switch", { id, options }).then((res) => {
            if (res.data.err) {
                dispatch(switchProductFail(res.data.errMess));
            } else {
                dispatch(switchProductSuccess(id, options.message));
            }
        });
    };
};

export const switchProductFail = (mess) => {
    return {
        type: actionTypes.SWITCH_PRODUCT_FAIL,
        mess,
    };
};
export const switchProductSuccess = (id, mess) => {
    return {
        type: actionTypes.SWITCH_PRODUCT_SUCCESS,
        id,
        mess,
    };
};
export const switchProduct = () => {
    return {
        type: actionTypes.SWITCH_PRODUCT,
    };
};

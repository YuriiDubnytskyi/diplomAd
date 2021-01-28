import * as actionTypes from "./actionTypes";
import API from "./../../API/API";

export const initManagerData = () => {
    return function (dispatch) {
        return API.get("/manager/init").then((data) => {
            console.log(data);
            if (data.err) {
                dispatch(addInitFail(data.errMess));
            } else {
                dispatch(addInitSuccess(data.data.products));
            }
        });
    };
};

export const addInitFail = (mess) => {
    return {
        type: actionTypes.MANAGER_INIT_FAIL,
        mess,
    };
};
export const addInitSuccess = (products) => {
    return {
        type: actionTypes.MANAGER_INIT,
        products,
    };
};
export const clearManager = () => {
    return {
        type: actionTypes.CLEAR_MANAGER,
    };
};

export const createProductMain = (data) => {
    return function (dispatch) {
        dispatch(addCategory());
        return API.post("/manager/createProductMain", data).then((data) => {
            console.log(data);
            // if (data.err) {
            //     dispatch(addCategoryFail(data.errMess));
            // } else {
            //     dispatch(addCategorySuccess(data.data.products));
            // }
        });
    };
};

export const addCategory = () => {
    return {
        type: actionTypes.ADD_CATEGORY,
    };
};
export const addCategorySuccess = (category) => {
    return {
        type: actionTypes.ADD_CATEGORY_SUCCESS,
        category,
    };
};
export const addCategoryFail = (mess) => {
    return {
        type: actionTypes.ADD_CATEGORY_FAIL,
        mess,
    };
};

export const createProductSubMain = (data) => {
    return function (dispatch) {
        dispatch(addSubCategory());
        return API.get("/manager/createProductSubMain", data).then((data) => {
            console.log(data);
            // if (data.err) {
            //     dispatch(addSubCategoryFail(data.errMess));
            // } else {
            //     dispatch(addSubCategorySuccess(data.data.products));
            // }
        });
    };
};

export const addSubCategory = () => {
    return {
        type: actionTypes.ADD_SUB_CATEGORY,
    };
};
export const addSubCategorySuccess = (subcategory) => {
    return {
        type: actionTypes.ADD_SUB_CATEGORY_SUCCESS,
        subcategory,
    };
};
export const addSubCategoryFail = (mess) => {
    return {
        type: actionTypes.ADD_SUB_CATEGORY_FAIL,
        mess,
    };
};

export const createProductInfo = (data) => {
    return function (dispatch) {
        dispatch(addProduct());
        return API.get("/manager/createProductInfo", data).then((data) => {
            console.log(data);
            // if (data.err) {
            //     dispatch(addProductFail(data.errMess));
            // } else {
            //     dispatch(addProductSuccess(data.data.products));
            // }
        });
    };
};

export const addProduct = () => {
    return {
        type: actionTypes.ADD_PRODUCT,
    };
};
export const addProductSuccess = (list, storage, product) => {
    return {
        type: actionTypes.ADD_PRODUCT_SUCCESS,
        list,
        storage,
        product,
    };
};
export const addProductFail = (mess) => {
    return {
        type: actionTypes.ADD_PRODUCT_FAIL,
        mess,
    };
};

export const addCountProduct = (data) => {
    return function (dispatch) {
        dispatch(addCount());
        return API.put("/manager/addCount", data).then((data) => {
            console.log(data);
            // if (data.err) {
            //     dispatch(addCountFail(data.errMess));
            // } else {
            //     dispatch(addCountSuccess(data.data.products));
            // }
        });
    };
};

export const addCount = () => {
    return {
        type: actionTypes.ADD_COUNT,
    };
};
export const addCountSuccess = (id, count) => {
    return {
        type: actionTypes.ADD_COUNT_FAIL,
        id,
        count,
    };
};
export const addCountFail = (mess) => {
    return {
        type: actionTypes.ADD_COUNT_FAIL,
        mess,
    };
};

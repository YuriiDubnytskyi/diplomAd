import * as actionTypes from "./actionTypes";
import API from "./../../API/API";

export const initManagerData = () => {
    return function (dispatch) {
        return API.get("/manager/init").then((res) => {
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

export const createProductMain = (dataA) => {
    return function (dispatch) {
        dispatch(addCategory());
        return API.post("/manager/createProductMain", dataA).then((res) => {
            console.log(res);
            if (res.data.err) {
                dispatch(addCategoryFail(res.data.errMess));
            } else {
                dispatch(addCategorySuccess(res.data.data));
            }
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

export const createProductSubMain = (id, dataA) => {
    return function (dispatch) {
        dispatch(addSubCategory());
        return API.post("/manager/createProductSubMain", dataA).then((res) => {
            console.log(res);
            if (res.data.err) {
                dispatch(addSubCategoryFail(res.data.errMess));
            } else {
                dispatch(addSubCategorySuccess(res.data.data, id));
            }
        });
    };
};

export const addSubCategory = () => {
    return {
        type: actionTypes.ADD_SUB_CATEGORY,
    };
};
export const addSubCategorySuccess = (subcategory, id) => {
    return {
        type: actionTypes.ADD_SUB_CATEGORY_SUCCESS,
        subcategory,
        id,
    };
};
export const addSubCategoryFail = (mess) => {
    return {
        type: actionTypes.ADD_SUB_CATEGORY_FAIL,
        mess,
    };
};

export const createProductInfo = (dataA, id) => {
    return function (dispatch) {
        dispatch(addProduct());
        return API.post("/manager/createProductInfo", dataA).then((res) => {
            console.log(res);
            if (res.data.err) {
                dispatch(addProductFail(res.data.errMess));
            } else {
                dispatch(addProductSuccess(res.data, id));
            }
        });
    };
};

export const addProduct = () => {
    return {
        type: actionTypes.ADD_PRODUCT,
    };
};
export const addProductSuccess = (data, id) => {
    return {
        type: actionTypes.ADD_PRODUCT_SUCCESS,
        data,
        id,
    };
};
export const addProductFail = (mess) => {
    return {
        type: actionTypes.ADD_PRODUCT_FAIL,
        mess,
    };
};

export const addCountProduct = (dataA) => {
    return function (dispatch) {
        dispatch(addCount());
        return API.put("/manager/addCount", dataA).then((res) => {
            console.log(res);
            if (res.data.err) {
                dispatch(addCountFail(res.data.errMess));
            } else {
                dispatch(addCountSuccess(dataA.id, dataA.count));
            }
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
        type: actionTypes.ADD_COUNT_SUCCESS,
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

export const changeProductInfo = (dataA, id) => {
    return function (dispatch) {
        dispatch(changeProduct());
        return API.put("/manager/changeProductInfo", dataA).then((res) => {
            console.log(res);
            if (res.data.err) {
                dispatch(changeProductFail(res.data.errMess));
            } else {
                dispatch(changeProductSuccess(res.data, id));
            }
        });
    };
};

export const changeProduct = () => {
    return {
        type: actionTypes.CHANGE_PRODUCT,
    };
};
export const changeProductSuccess = (data, id) => {
    return {
        type: actionTypes.CHANGE_PRODUCT_SUCCESS,
        data,
        id,
    };
};
export const changeProductFail = (mess) => {
    return {
        type: actionTypes.CHANGE_PRODUCT_FAIL,
        mess,
    };
};

export const deleteProductMain = (id, arrId) => {
    return function (dispatch) {
        dispatch(deleteCategory());
        return API.post("/manager/deleteTitleProduct", { id, arrId }).then((res) => {
            console.log(res);
            if (res.data.err) {
                dispatch(deleteCategoryFail(res.data.errMess));
            } else {
                dispatch(deleteCategorySuccess(id));
            }
        });
    };
};

export const deleteCategory = () => {
    return {
        type: actionTypes.DELETE_CATEGORY,
    };
};
export const deleteCategorySuccess = (id) => {
    return {
        type: actionTypes.DELETE_CATEGORY_SUCCESS,
        id,
    };
};
export const deleteCategoryFail = (mess) => {
    return {
        type: actionTypes.DELETE_CATEGORY_FAIL,
        mess,
    };
};

export const deleteProductSubMain = (id) => {
    return function (dispatch) {
        dispatch(deleteSubCategory());
        return API.delete("/manager/deleteSubProduct/" + id).then((res) => {
            console.log(res);
            if (res.data.err) {
                dispatch(deleteSubCategoryFail(res.data.errMess));
            } else {
                dispatch(deleteSubCategorySuccess(id));
            }
        });
    };
};

export const deleteSubCategory = () => {
    return {
        type: actionTypes.DELETE_SUB_CATEGORY,
    };
};
export const deleteSubCategorySuccess = (id) => {
    return {
        type: actionTypes.DELETE_SUB_CATEGORY_SUCCESS,
        id,
    };
};
export const deleteSubCategoryFail = (mess) => {
    return {
        type: actionTypes.DELETE_SUB_CATEGORY_FAIL,
        mess,
    };
};

export const deleteProductInfo = (id) => {
    return function (dispatch) {
        dispatch(deleteProduct());
        return API.delete("/manager/deleteProductFromList/" + id).then((res) => {
            console.log(res);
            if (res.data.err) {
                dispatch(deleteProductFail(res.data.errMess));
            } else {
                dispatch(deleteProductSuccess(id));
            }
        });
    };
};

export const deleteProduct = () => {
    return {
        type: actionTypes.DELETE_PRODUCT,
    };
};
export const deleteProductSuccess = (id) => {
    return {
        type: actionTypes.DELETE_PRODUCT_SUCCESS,
        id,
    };
};
export const deleteProductFail = (mess) => {
    return {
        type: actionTypes.DELETE_PRODUCT_FAIL,
        mess,
    };
};

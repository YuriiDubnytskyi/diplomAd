import * as actionTypes from "./actionTypes";
import API from "./../../API/API";

export const initNewsData = () => {
    return function (dispatch) {
        return API.get("/copywrite/init").then((res) => {
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
        type: actionTypes.NEWS_INIT_FAIL,
        mess,
    };
};
export const addInitSuccess = (data) => {
    return {
        type: actionTypes.NEWS_INIT,
        data,
    };
};
export const clearNewsManager = () => {
    return {
        type: actionTypes.CLEAR_NEWS,
    };
};

export const addNewNews = (dataA) => {
    return function (dispatch) {
        dispatch(addNews());
        return API.post("/copywrite/addnews", dataA).then((res) => {
            if (res.data.err) {
                dispatch(addNewsFail(res.data.errMess));
            } else {
                dispatch(addNewsSuccess(res.data.data));
            }
        });
    };
};

export const addNewsFail = (mess) => {
    return {
        type: actionTypes.ADD_NEWS_FAIL,
        mess,
    };
};
export const addNewsSuccess = (data) => {
    return {
        type: actionTypes.ADD_NEWS_SUCCESS,
        data,
    };
};
export const addNews = () => {
    return {
        type: actionTypes.ADD_NEWS,
    };
};

export const deleteNews = (id) => {
    return function (dispatch) {
        dispatch(deleteNewsItem());
        return API.delete("/copywrite/deletenews/" + id).then((res) => {
            if (res.data.err) {
                dispatch(deleteNewsItemFail(res.data.errMess));
            } else {
                dispatch(deleteNewsItemSuccess(id));
            }
        });
    };
};

export const deleteNewsItemFail = (mess) => {
    return {
        type: actionTypes.DELETE_NEWS_FAIL,
        mess,
    };
};
export const deleteNewsItemSuccess = (id) => {
    return {
        type: actionTypes.DELETE_NEWS_SUCCESS,
        id,
    };
};
export const deleteNewsItem = () => {
    return {
        type: actionTypes.DELETE_NEWS,
    };
};

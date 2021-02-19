import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    news: [],
    error: "",
    addNewsIsErr: false,
    addNewsErr: "",
    addNewsLoading: false,
    deleteNewsIsErr: false,
    deleteNewsErr: "",
    deleteNewsLoading: false,
};

const news = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.NEWS_INIT:
            return updateObject(state, {
                news: action.data,
            });
        case actionTypes.NEWS_INIT_FAIL:
            return updateObject(state, {
                error: action.error,
            });
        case actionTypes.ADD_NEWS:
            return updateObject(state, {
                addNewsLoading: true,
            });
        case actionTypes.ADD_NEWS_FAIL:
            return updateObject(state, {
                addNewsIsErr: true,
                addNewsLoading: false,
                addNewsErr: action.errMess,
            });
        case actionTypes.ADD_NEWS_SUCCESS:
            return updateObject(state, {
                addNewsLoading: false,
                news: state.news.length === 0 ? [action.data] : [...state.news, action.data],
            });
        case actionTypes.DELETE_NEWS:
            return updateObject(state, {
                deleteNewsLoading: true,
            });
        case actionTypes.DELETE_NEWS_FAIL:
            return updateObject(state, {
                deleteNewsIsErr: true,
                deleteNewsLoading: false,
                deleteNewsErr: action.errMess,
            });
        case actionTypes.DELETE_NEWS_SUCCESS:
            return updateObject(state, {
                deleteNewsLoading: false,
                news: state.news.filter((el) => el._id !== action.id),
            });
        case actionTypes.CLEAR_NEWS:
            return updateObject(state, {
                news: [],
                error: "",
                addNewsIsErr: false,
                addNewsErr: "",
                addNewsLoading: false,
            });

        default:
            return state;
    }
};

export default news;

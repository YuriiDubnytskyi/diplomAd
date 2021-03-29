import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    storage: [],
    users: [],
    productsStatus: [],
    productsBought: [],
    productsTop: [],
    error: [],
    loading: false,
    errMess: "",
    errIsDate: false,
    boughtDate: [],
    loadingBoughtDate: false,
    errMessBoughtDate: "",
    errIsBoughtDate: false,
};

const analitic = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ANALITIC_INIT:
            return updateObject(state, {
                storage: action.storage,
                users: action.users,
                productsStatus: action.productsStatus,
                productsTop: action.productsTop,
            });
        case actionTypes.ANALITIC_INIT_FAIL:
            return updateObject(state, {
                error: action.mess,
            });

        case actionTypes.ANALITIC_CLEAR:
            return updateObject(state, {
                storage: [],
                users: [],
                productsStatus: [],
                productsBought: [],
                productsTop: [],
                error: [],
                loading: false,
                errMess: "",
                errIsDate: false,
                boughtDate: [],
                loadingBoughtDate: false,
                errMessBoughtDate: "",
                errIsBoughtDate: false,
            });
        case actionTypes.ANALITIC_GET_BY_DATE_SUCCESS:
            return updateObject(state, {
                productsBought: action.productsBought,
                loading: false,
            });
        case actionTypes.ANALITIC_GET_BY_DATE_FAIL:
            return updateObject(state, {
                errMess: action.mess,
                loading: false,
                errIsDate: true,
            });
        case actionTypes.ANALITIC_GET_BY_DATE:
            return updateObject(state, {
                loading: true,
            });

        case actionTypes.ANALITIC_GET_BOUGHT_BY_DATE_SUCCESS:
            return updateObject(state, {
                boughtDate: action.boughtDate,
                loadingBoughtDate: false,
                errMessBoughtDate: "",
                errIsBoughtDate: false,
            });
        case actionTypes.ANALITIC_GET_BOUGHT_BY_DATE_FAIL:
            return updateObject(state, {
                errMessBoughtDate: action.mess,
                loadingBoughtDate: false,
                errIsBoughtDate: true,
            });
        case actionTypes.ANALITIC_GET_BOUGHT_BY_DATE:
            return updateObject(state, {
                loadingBoughtDate: true,
            });

        default:
            return state;
    }
};

export default analitic;

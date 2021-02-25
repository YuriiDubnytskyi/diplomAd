import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    storage: [],
    users: [],
    productsStatus: [],
    productsBought: [],
    error: [],
    loading: false,
    errMess: "",
    errIsDate: false,
};

const analitic = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ANALITIC_INIT:
            return updateObject(state, {
                storage: action.storage,
                users: action.users,
                productsStatus: action.productsStatus,
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
                error: [],
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
        default:
            return state;
    }
};

export default analitic;

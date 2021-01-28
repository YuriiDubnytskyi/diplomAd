import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    fullProducts: [],
    initErr: false,
    initErrMess: "",
    addMainLoading: false,
    addMainErr: false,
    addMainErrMess: "",
    addSubErr: false,
    addSubErrMess: "",
    addProductErr: false,
    addProductErrMess: "",
};

const manager = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MANAGER_INIT:
            return updateObject(state, {
                fullProducts: action.products,
            });

        case actionTypes.CLEAR_MANAGER:
            return updateObject(state, {
                fullProducts: [],
            });

        default:
            return state;
    }
};

export default manager;

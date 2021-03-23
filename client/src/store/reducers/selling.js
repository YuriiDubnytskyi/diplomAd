import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    active: [],
    archive: [],
    error: "",
    switchStatusIsErr: false,
    switchStatusErr: "",
    switchStatusLoading: false,
};

const getActive = (arr) => {
    return arr.filter((el) => el.isOld === false);
};

const getArchive = (arr) => {
    return arr.filter((el) => el.isOld === true);
};

const deleteActive = (id, arr) => {
    return arr.filter((el) => el._id != id);
};

const setArchive = (id, mess, arr, arr2) => {
    const newArchive = arr.filter((el) => el._id === id);

    return [...arr2, { ...newArchive[0], status: "Success", isOld: true, massege: mess }];
};

const selling = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SELLING_INIT:
            return updateObject(state, {
                active: getActive(action.data),
                archive: getArchive(action.data),
            });
        case actionTypes.SELLING_INIT_FAIL:
            return updateObject(state, {
                error: action.error,
            });
        case actionTypes.SWITCH_PRODUCT:
            return updateObject(state, {
                switchStatusLoading: true,
            });
        case actionTypes.SWITCH_PRODUCT_FAIL:
            return updateObject(state, {
                switchStatusIsErr: true,
                switchStatusErr: action.errMess,
                switchStatusLoading: false,
            });
        case actionTypes.SWITCH_PRODUCT_SUCCESS:
            return updateObject(state, {
                archive: setArchive(action.id, action.mess, state.active, state.archive),
                active: deleteActive(action.id, state.active),
                switchStatusLoading: false,
            });
        case actionTypes.CLEAR_SELLING:
            return updateObject(state, {
                active: [],
                archive: [],
                error: "",
                switchStatusIsErr: false,
                switchStatusErr: "",
                switchStatusLoading: false,
            });

        default:
            return state;
    }
};

export default selling;

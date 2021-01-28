import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    role: "",
    loading: false,
    err: false,
    errMess: "",
    success: false,
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_USER_SUCCESS:
            return updateObject(state, {
                role: action.role,
                loading: false,
                err: false,
                errMess: "",
                success: true,
            });
        case actionTypes.ADD_USER_FAIL:
            return updateObject(state, {
                err: true,
                errMess: action.mess,
                loading: false,
            });
        case actionTypes.ADD_USER:
            return updateObject(state, {
                loading: true,
            });
        case actionTypes.CLEAR_USER:
            return updateObject(state, {
                role: "",
                loading: false,
                err: false,
                errMess: "",
                success: false,
            });

        default:
            return state;
    }
};

export default user;

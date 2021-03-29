import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    roles: [],
    users: [],
    products: [],
    error: [],
    deleteRoleMess: "",
};

const admin = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INIT:
            return updateObject(state, {
                roles: action.roles,
                users: action.users,
                products: action.products,
            });
        case actionTypes.ADD_ROLE:
            return updateObject(state, {
                roles: [...state.roles, action.role],
            });
        case actionTypes.ADD_INIT_FAIL:
            return updateObject(state, {
                error: action.error,
            });
        case actionTypes.DELETE_ROLE_SUCCESS:
            return updateObject(state, {
                roles: state.roles.filter((el) => el._id !== action.id),
            });
        case actionTypes.DELETE_ROLE_FAIL:
            return updateObject(state, {
                deleteRoleMess: action.mess,
            });
        case actionTypes.CLEAR_ADMIN:
            return updateObject(state, {
                roles: [],
                users: [],
                products: [],
                error: [],
                deleteRoleMess: "",
            });

        default:
            return state;
    }
};

export default admin;

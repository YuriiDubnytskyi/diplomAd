import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    aplications: [],
    storage: [],
    error: "",
    agreeLoading: false,
    agreeErr: false,
    agreeErrMess: "",
    delLoading: false,
    delErr: false,
    delErrMess: "",
};

const storageW = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORAGE_WORGER_INIT:
            return updateObject(state, {
                aplications: action.data.aplications,
                storage: action.data.storage,
            });
        case actionTypes.STORAGE_WORGER_INIT_FAIL:
            return updateObject(state, {
                error: action.mess,
            });
        case actionTypes.STORAGE_WORGER_AGREE_APPLICATION:
            return updateObject(state, {
                agreeLoading: true,
            });
        case actionTypes.STORAGE_WORGER_AGREE_APPLICATION_FAIL:
            return updateObject(state, {
                agreeErr: true,
                agreeLoading: false,
                agreeErrMess: action.errMess,
            });
        case actionTypes.STORAGE_WORGER_AGREE_APPLICATION_SUCCESS:
            return updateObject(state, {
                agreeLoading: false,
                agreeErr: false,
                aplications: [
                    ...state.aplications.map((el) => {
                        debugger;
                        if (el._id === action.data.id) {
                            return {
                                ...el,
                                status: "Finished",
                                timeEnd: new Date().toISOString(),
                                countGet: action.data.getValue,
                                message: action.data.message,
                            };
                        }
                        return el;
                    }),
                ],
                storage: [
                    ...state.storage.map((el) => {
                        debugger;
                        if (el.idStorageHouse === action.data.idStorageHouse) {
                            return { ...el, count: el.count + action.data.getValue };
                        }
                        return el;
                    }),
                ],
            });

        case actionTypes.STORAGE_WORGER_DELETE_PRODUCT:
            return updateObject(state, {
                delLoading: true,
            });
        case actionTypes.STORAGE_WORGER_DELETE_PRODUCT_FAIL:
            return updateObject(state, {
                delErr: true,
                delLoading: false,
                delErrMess: action.errMess,
            });
        case actionTypes.STORAGE_WORGER_DELETE_PRODUCT_SUCCESS:
            return updateObject(state, {
                delLoading: false,
                delErr: false,
                storage: [...state.storage.filter((el) => el._id !== action.id)],
            });
        case actionTypes.STORAGE_WORGER_CLEAR:
            return updateObject(state, {
                aplications: [],
                storage: [],
                error: "",
                agreeLoading: false,
                agreeErr: false,
                agreeErrMess: "",
            });

        default:
            return state;
    }
};

export default storageW;

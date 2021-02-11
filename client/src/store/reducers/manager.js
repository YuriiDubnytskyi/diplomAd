import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    fullProducts: [],
    initErr: false,
    initErrMess: "",
    addMainLoading: false,
    addMainErr: false,
    addMainErrMess: "",
    addSubLoading: false,
    addSubErr: false,
    addSubErrMess: "",
    addProductErr: false,
    addProductErrMess: "",
    addProductLoading: false,
    addCountErr: false,
    addCountErrMess: "",
    addCountLoading: false,
    changeProductErr: false,
    changeProductErrMess: "",
    changeProductLoading: false,

    deleteMainLoading: false,
    deleteMainErr: false,
    deleteMainErrMess: "",
    deleteSubLoading: false,
    deleteSubErr: false,
    deleteSubErrMess: "",
    deleteProductErr: false,
    deleteProductErrMess: "",
    deleteProductLoading: false,
};

const setMain = (item, arr) => {
    return arr.lenght !== 0 ? [...arr, { ...item, subTitle: [] }] : [{ ...item, subTitle: [] }];
};
const setSub = (id, item, arr) => {
    return arr.map((el) => {
        if (el._id === id) {
            el.subTitle =
                el.subTitle.lenght !== 0 ? [...el.subTitle, { ...item, product: [] }] : [{ ...item, product: [] }];
        }
        return el;
    });
};

const setProduct = (id, data, arr) => {
    return arr.map((el) => {
        el.subTitle.map((el) => {
            if (el._id === id) {
                el.product.push({
                    ...data.list,
                    productDetail: [{ ...data.product }],
                    productStorageHouse: data.storage,
                });
            }
            return el;
        });
        return el;
    });
};

const setProductChange = (id, data, arr) => {
    return arr.map((el) => {
        el.subTitle.map((el1) => {
            el1.product.map((el2, i) => {
                if (el2._id === id) {
                    el1.product[i] = {
                        ...data.list,
                        productDetail: [{ ...data.product }],
                        productStorageHouse: el2.productStorageHouse,
                    };
                }
                return el2;
            });
            return el1;
        });
        return el;
    });
};

const setCount = (id, count, arr) => {
    let xxx = arr.map((el) => {
        el.subTitle.map((el1) => {
            el1.product.map((el2) => {
                if (el2._id === id) {
                    el2.productStorageHouse[0].count = count;
                }
                return el2;
            });
            return el1;
        });
        return el;
    });
    console.log(xxx);
    return xxx;
};

const deleteMain = (id, arr) => {
    return arr.filter((el) => el._id != id);
};

const deleteSubMain = (id, arr) => {
    return arr.map((el) => {
        el.subTitle = el.subTitle.filter((el1) => el1._id != id);
        return el;
    });
};

const deleteProduct = (id, arr) => {
    return arr.map((el) => {
        el.subTitle.map((el1) => {
            el1.product = el1.product.filter((el2) => el2._id != id);
            return el1;
        });
        return el;
    });
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
        case actionTypes.ADD_CATEGORY:
            return updateObject(state, {
                addMainLoading: true,
            });
        case actionTypes.ADD_CATEGORY_FAIL:
            return updateObject(state, {
                addMainLoading: false,
                addMainErrMess: action.mess,
                addMainErr: true,
            });
        case actionTypes.ADD_CATEGORY_SUCCESS:
            return updateObject(state, {
                addMainErr: false,
                addMainLoading: false,
                fullProducts: setMain(action.category, state.fullProducts),
            });

        case actionTypes.ADD_SUB_CATEGORY:
            return updateObject(state, {
                addSubLoading: true,
            });
        case actionTypes.ADD_SUB_CATEGORY_FAIL:
            return updateObject(state, {
                addSubLoading: false,
                addSubErrMess: action.mess,
                addSubErr: true,
            });
        case actionTypes.ADD_SUB_CATEGORY_SUCCESS:
            return updateObject(state, {
                addSubErr: false,
                addSubLoading: false,
                fullProducts: setSub(action.id, action.subcategory, state.fullProducts),
            });
        case actionTypes.ADD_PRODUCT:
            return updateObject(state, {
                addProductLoading: true,
            });
        case actionTypes.ADD_PRODUCT_FAIL:
            return updateObject(state, {
                addProductLoading: false,
                addProductErrMess: action.mess,
                addProductErr: true,
            });
        case actionTypes.ADD_PRODUCT_SUCCESS:
            return updateObject(state, {
                addProductErr: false,
                addProductLoading: false,
                fullProducts: setProduct(action.id, action.data, state.fullProducts),
            });

        case actionTypes.ADD_COUNT:
            return updateObject(state, {
                addCountLoading: true,
            });
        case actionTypes.ADD_COUNT_FAIL:
            return updateObject(state, {
                addCountLoading: false,
                addCountErrMess: action.mess,
                addCountErr: true,
            });
        case actionTypes.ADD_COUNT_SUCCESS:
            return updateObject(state, {
                addCountErr: false,
                addCountLoading: false,
                fullProducts: setCount(action.id, action.count, state.fullProducts),
            });

        case actionTypes.CHANGE_PRODUCT:
            return updateObject(state, {
                changeProductLoading: true,
            });
        case actionTypes.CHANGE_PRODUCT_FAIL:
            return updateObject(state, {
                changeProductLoading: false,
                changeProductErrMess: action.mess,
                changeProductErr: true,
            });
        case actionTypes.CHANGE_PRODUCT_SUCCESS:
            return updateObject(state, {
                changeProductErr: false,
                changeProductLoading: false,
                fullProducts: setProductChange(action.id, action.data, state.fullProducts),
            });

        case actionTypes.DELETE_CATEGORY:
            return updateObject(state, {
                deleteMainLoading: true,
            });
        case actionTypes.DELETE_CATEGORY_FAIL:
            return updateObject(state, {
                deleteMainLoading: false,
                deleteMainErrMess: action.mess,
                deleteMainErr: true,
            });
        case actionTypes.DELETE_CATEGORY_SUCCESS:
            return updateObject(state, {
                deleteMainErr: false,
                deleteMainLoading: false,
                fullProducts: deleteMain(action.id, state.fullProducts),
            });

        case actionTypes.DELETE_SUB_CATEGORY:
            return updateObject(state, {
                deleteSubLoading: true,
            });
        case actionTypes.DELETE_SUB_CATEGORY_FAIL:
            return updateObject(state, {
                deleteSubLoading: false,
                deleteSubErrMess: action.mess,
                deleteSubErr: true,
            });
        case actionTypes.DELETE_SUB_CATEGORY_SUCCESS:
            return updateObject(state, {
                deleteSubErr: false,
                deleteSubLoading: false,
                fullProducts: deleteSubMain(action.id, state.fullProducts),
            });

        case actionTypes.DELETE_PRODUCT:
            return updateObject(state, {
                deleteProductLoading: true,
            });
        case actionTypes.DELETE_PRODUCT_FAIL:
            return updateObject(state, {
                deleteProductLoading: false,
                deleteProductErrMess: action.mess,
                deleteProductErr: true,
            });
        case actionTypes.DELETE_PRODUCT_SUCCESS:
            return updateObject(state, {
                deleteProductErr: false,
                deleteProductLoading: false,
                fullProducts: deleteProduct(action.id, state.fullProducts),
            });

        default:
            return state;
    }
};

export default manager;

const productTitleSchema = require("../models/productMain");
const productSubTitleSchema = require("../models/productSubMain");
const productListSchema = require("../models/productList");
const wereHouseSchema = require("../models/wereHouse");
const productInfoSchema = require("../models/productInfo");
const userSchema = require("../models/users");
const newsSchema = require("../models/news");
const buyListSellSchema = require("../models/buyList");
const userAdminSchema = require("../models/userAdmin");

const getInit = async () => {
    try {
        const Main = productTitleSchema;
        let products = Main.aggregate([
            {
                $lookup: {
                    from: "productSubTitle",
                    let: { idSub: "$_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$idProductTitle", "$$idSub"] } } },
                        {
                            $lookup: {
                                from: "productList",
                                let: { listId: "$_id" },
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$idSubProduct", "$$listId"] } } },
                                    {
                                        $lookup: {
                                            from: "productInfo",
                                            let: { productInfoId: "$_id" },
                                            pipeline: [
                                                { $match: { $expr: { $eq: ["$idProduct", "$$productInfoId"] } } },
                                            ],
                                            as: "productDetail",
                                        },
                                    },

                                    {
                                        $lookup: {
                                            from: "storageHouse",
                                            let: { productInfoId: "$_id" },
                                            pipeline: [
                                                { $match: { $expr: { $eq: ["$idStorageHouse", "$$productInfoId"] } } },
                                            ],
                                            as: "productStorageHouse",
                                        },
                                    },
                                ],
                                as: "product",
                            },
                        },
                    ],
                    as: "subTitle",
                },
            },
        ]);
        return { err: false, data: products };
    } catch (error) {
        return { err: true, errMess: error };
    }
};

const createProductMain = async (data) => {
    try {
        const Main = new productTitleSchema(data);
        let product = Main.save();
        return { err: false, data: product };
    } catch (error) {
        return { err: true, errMess: error };
    }
};

const createProductSubMain = async (data) => {
    try {
        const SubMain = new productSubTitleSchema(data);
        let product = SubMain.save();
        return { err: false, data: product };
    } catch (error) {
        return { err: true, errMess: error };
    }
};

const createProductList = async (productList, productInfo, storageInfo) => {
    try {
        const List = new productListSchema(productList);
        let list = await List.save();

        storageInfo.idStorageHouse = list._id;
        const wereHouse = new wereHouseSchema(storageInfo);
        let storage = await wereHouse.save();

        productInfo.idProduct = list._id;
        const productI = new productInfoSchema(productInfo);
        let product = await productI.save();

        return { err: false, list, storage, product };
    } catch (error) {
        return { err: true, errMess: error };
    }
};

const addCount = async (id, count) => {
    try {
        const wereHouse = wereHouseSchema;
        let storage = await wereHouse.findOneAndUpdate(
            { _id: id },
            { count: count },
            { new: true, useFindAndModify: false }
        );

        return { err: false, storage };
    } catch (error) {
        return { err: true, errMess: error };
    }
};

module.exports = {
    getInit,
    createProductMain,
    createProductSubMain,
    createProductList,
    addCount,
};

const productTitleSchema = require("../models/productMain");
const productSubTitleSchema = require("../models/productSubMain");
const productListSchema = require("../models/productList");
const wereHouseSchema = require("../models/wereHouse");
const productInfoSchema = require("../models/productInfo");
const userSchema = require("../models/users");
const newsSchema = require("../models/news");
const buyListSellSchema = require("../models/buyList");
const userAdminSchema = require("../models/userAdmin");

const getUsers = async () => {
    try {
        const Users = userSchema;
        const data1 = await Users.find({ emailVerify: true }).countDocuments();
        const data2 = await Users.find({ emailVerify: false }).countDocuments();
        return { err: false, data: { verify: data1, notVerify: data2 } };
    } catch (error) {
        return { err: true, errMess: error };
    }
};

const getStorage = async () => {
    try {
        const Storage = wereHouseSchema;
        const data1 = await Storage.aggregate([
            {
                $lookup: {
                    from: "productList",
                    let: { idList: "$idStorageHouse" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$idList"] } } },
                        { $project: { _id: 1, idSubProduct: 1, name: 1 } },
                        {
                            $lookup: {
                                from: "productSubTitle",
                                let: { listId: "$idSubProduct" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: { $eq: ["$_id", "$$listId"] },
                                        },
                                    },
                                    { $project: { productSubTitle: 1, idProductTitle: 1 } },
                                ],
                                as: "productSub",
                            },
                        },

                        { $unwind: "$productSub" },

                        {
                            $group: {
                                _id: "$productSub.productSubTitle",
                            },
                        },
                    ],
                    as: "list",
                },
            },
        ]);
        const Main = productTitleSchema;
        const data2 = await Main.aggregate([
            { $project: { productTitle: 1 } },
            {
                $lookup: {
                    from: "productSubTitle",
                    let: { idSub: "$_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$idProductTitle", "$$idSub"] } } },
                        { $project: { productSubTitle: 1, idProductTitle: 1 } },
                        {
                            $lookup: {
                                from: "productList",
                                let: { listId: "$_id" },
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$idSubProduct", "$$listId"] } } },
                                    { $project: { _id: 1 } },

                                    {
                                        $lookup: {
                                            from: "storageHouse",
                                            let: { productInfoId: "$_id" },
                                            pipeline: [
                                                { $match: { $expr: { $eq: ["$idStorageHouse", "$$productInfoId"] } } },
                                                { $project: { count: 1 } },
                                            ],
                                            as: "productStorageHouse",
                                        },
                                    },
                                    { $unwind: "$productStorageHouse" },
                                    {
                                        $group: {
                                            _id: null,
                                            count: { $sum: "$productStorageHouse.count" },
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

        return { err: false, data: { all: data2, byTitle: data1 } };
    } catch (error) {
        return { err: true, errMess: error };
    }
};

const getProductsStatus = async () => {
    try {
        const Buy = buyListSellSchema;
        const data1 = await Buy.find({ status: "Success" }).countDocuments();
        const data2 = await Buy.find({ status: "Pending" }).countDocuments();
        return { err: false, data: { success: data1, pending: data2 } };
    } catch (error) {
        return { err: true, errMess: error };
    }
};

const getProductsBought = async (start, end) => {
    try {
        const Storage = buyListSellSchema;
        let startDate = new Date(start);
        let endDate = new Date(end);
        const data = await Storage.aggregate([
            {
                $match: { time: { $gte: startDate, $lt: endDate }, status: "Success" },
            },
            { $project: { _id: 1, time: 1, product: 1 } },
            { $unwind: "$product" },
            {
                $group: {
                    _id: { date: "$time", make: "$product.name" },
                    count: { $sum: "$product.count" },
                    price: { $sum: "$product.price" },
                },
            },
            {
                $group: {
                    _id: "$_id.date",
                    total: { $sum: "$count" },
                    totalSaleAmount: { $sum: { $multiply: ["$price", "$count"] } },
                    byBrand: { $push: { k: "$_id.make", v: { $sum: "$count" } } },
                },
            },
            { $sort: { _id: 1 } },
            {
                $project: {
                    _id: 0,
                    saleDate: "$_id",
                    totalSold: "$total",
                    totalSaleAmount: "$totalSaleAmount",
                    byBrand: { $arrayToObject: { $filter: { input: "$byBrand", cond: "$$this.v" } } },
                },
            },
        ]);
        console.log(data);
        return { err: false, data };
    } catch (error) {
        return { err: true, errMess: error };
    }
};

module.exports = { getStorage, getUsers, getProductsStatus, getProductsBought };

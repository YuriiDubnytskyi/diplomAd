const productTitleSchema = require("../models/productMain");
const productSubTitleSchema = require("../models/productSubMain");
const productListSchema = require("../models/productList");
const wereHouseSchema = require("../models/wereHouse");
const productInfoSchema = require("../models/productInfo");
const userSchema = require("../models/users");
const newsSchema = require("../models/news");
const buyListSellSchema = require("../models/buyList");
const userAdminSchema = require("../models/userAdmin");

const getRoles = async () => {
    try {
        const Roles = userAdminSchema;
        const rolesList = await Roles.find({});
        return { err: false, data: rolesList };
    } catch (error) {
        return { err: true, errMess: error };
    }
};

const getUsers = async () => {
    try {
        const Users = userSchema;
        const usersList = await Users.aggregate([
            {
                $lookup: {
                    from: "buyListSell",
                    let: { userId: "$_id" },
                    pipeline: [{ $match: { $expr: { $eq: ["$userId", "$$userId"] } } }],
                    as: "buyProduct",
                },
            },
        ]);
        return { err: false, data: usersList };
    } catch (error) {
        return { err: true, errMess: error };
    }
};

const getProducts = async () => {
    try {
        const Main = productTitleSchema;
        let products = await Main.aggregate([
            { $project: { productTitle: 1 } },
            {
                $lookup: {
                    from: "productSubTitle",
                    let: { idSub: "$_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$idProductTitle", "$$idSub"] } } },
                        { $project: { productSubTitle: 1 } },
                        {
                            $lookup: {
                                from: "productList",
                                let: { listId: "$_id" },
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$idSubProduct", "$$listId"] } } },
                                    { $project: { name: 1 } },
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

const deleteRole = async (id) => {
    try {
        const Roles = userAdminSchema;
        const rolesList = await Roles.deleteOne({ _id: id });
        return { err: false, data: rolesList };
    } catch (error) {
        return { err: true, errMess: error };
    }
};

module.exports = {
    getRoles,
    getUsers,
    getProducts,
    deleteRole,
};

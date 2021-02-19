const buyListSellSchema = require("../models/buyList");

const getInit = async () => {
    try {
        const List = buyListSellSchema;
        let data = await List.aggregate([
            {
                $lookup: {
                    from: "userData",
                    let: { userId: "$userId" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
                        { $project: { name: 1, email: 1 } },
                    ],
                    as: "user",
                },
            },
        ]);
        return { err: false, data };
    } catch (error) {
        return { err: true, errMess: error };
    }
};

const switchProduct = async (id) => {
    try {
        const List = buyListSellSchema;
        let data = await List.findOneAndUpdate(
            { _id: id },
            { isOld: true, status: "Success" },
            { new: true, useFindAndModify: false }
        );
        return { err: false, data };
    } catch (error) {
        return { err: true, errMess: error };
    }
};

module.exports = {
    getInit,
    switchProduct,
};

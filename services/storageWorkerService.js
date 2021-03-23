const storageWorkerSchema = require("../models/storageWorker");
const wereHouseSchema = require("../models/wereHouse");

const getInit = async () => {
    try {
        const storageWorker = storageWorkerSchema;
        let data1 = await storageWorker.find({});

        const wereHouse = wereHouseSchema;
        let data2 = await wereHouse.aggregate([
            {
                $lookup: {
                    from: "productList",
                    let: { idList: "$idStorageHouse" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$idList"] } } },
                        { $project: { _id: 1, name: 1, isP: { $ifNull: ["$name", true] } } },
                    ],
                    as: "list",
                },
            },
        ]);
        return { err: false, data: { aplications: data1, storage: data2 } };
    } catch (error) {
        return { err: true, errMess: error };
    }
};

const addCount = async (id, idStorageHouse, message, getValue, countExist) => {
    try {
        const storageWorker = storageWorkerSchema;
        let data = await storageWorker.findOneAndUpdate(
            { _id: id },
            { countGet: getValue, status: "Finished", message, timeEnd: new Date().toISOString() },
            { new: true, useFindAndModify: false }
        );
        const wereHouse = wereHouseSchema;
        let data2 = await wereHouse.findOneAndUpdate(
            { idStorageHouse },
            { count: countExist + getValue },
            { new: true, useFindAndModify: false }
        );
        return { err: false, success: true };
    } catch (error) {
        return { err: true, errMess: error };
    }
};

const delProduct = async (id) => {
    try {
        const wereHouse = wereHouseSchema;
        let data2 = await wereHouse.deleteOne({ _id: id });
        return { err: false, success: true };
    } catch (error) {
        return { err: true, errMess: error };
    }
};

module.exports = {
    getInit,
    addCount,
    delProduct,
};

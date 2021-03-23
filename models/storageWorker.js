const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storageWorkerSchema = new Schema(
    {
        status: String,
        idProduct: Schema.ObjectId,
        productName: String,
        needCount: Number,
        timeStart: Date,
        timeEnd: Date,
        message: String,
        countGet: Number,
    },
    {
        collection: "storageWorkerSchema",
    }
);

module.exports = mongoose.model("storageWorker", storageWorkerSchema);

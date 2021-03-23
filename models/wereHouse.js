const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storageSchema = new Schema(
    {
        name: String,
        idStorageHouse: Schema.ObjectId,
        count: Number,
        isSelling: Boolean,
    },
    {
        collection: "storageHouse",
    }
);

module.exports = mongoose.model("storageHouse", storageSchema);

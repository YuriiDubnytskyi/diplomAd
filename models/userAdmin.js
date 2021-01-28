const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userAdminSchema = new Schema(
    {
        password: String,
        login: String,
        role: String,
        message: String,
    },
    {
        collection: "userAdminData",
    }
);

module.exports = mongoose.model("UserAdmin", userAdminSchema);

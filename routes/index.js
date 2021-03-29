const analiticRoutes = require("./analiticRoute");
const managerRoutes = require("./managerRouter");
const adminRoutes = require("./adminRoute");
const passportRoutes = require("./passportRouter");
const sellingRoutes = require("./sellingRouter");
const copyWriterRoutes = require("./copyWriterRoute");
const storageWorkerRoutes = require("./storageWorkerRoute");

module.exports = (app, passport) => {
    app.use("/api/storageworker", storageWorkerRoutes);
    app.use("/api/admin", adminRoutes);
    app.use("/api/manager", managerRoutes);
    app.use("/api/sellingmanager", sellingRoutes);
    app.use("/api/copywrite", copyWriterRoutes);
    app.use("/api/analitic", analiticRoutes);
    app.use("/api/auth", passportRoutes(passport));
};
